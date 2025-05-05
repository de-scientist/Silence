import { GeofenceConfig, GeofenceState, AppConfig, AppState, OverrideState, AppCategory, OverrideLevel } from '../types/geofence';
import { User } from '../types/auth';
import { MLState } from '../types/state';

export class GeofenceService {
  private currentState: GeofenceState;
  private config: GeofenceConfig;
  private mlState: MLState;

  constructor(config: GeofenceConfig, mlState: MLState) {
    this.config = config;
    this.mlState = mlState;
    this.currentState = {
      isActive: false,
      activeApps: [],
      overrides: []
    };
  }

  public async checkWifiSSID(ssid: string): Promise<boolean> {
    const isInSacredSpace = this.config.wifiSSID.includes(ssid);
    if (isInSacredSpace && !this.currentState.isActive) {
      await this.activateGeofence(ssid);
    } else if (!isInSacredSpace && this.currentState.isActive) {
      await this.deactivateGeofence();
    }
    return isInSacredSpace;
  }

  private async activateGeofence(ssid: string): Promise<void> {
    this.currentState = {
      isActive: true,
      currentSSID: ssid,
      enteredAt: new Date(),
      activeApps: this.config.allowedApps.map(app => ({
        appConfig: app,
        isBlocked: !app.isAllowed,
        mlScore: this.mlState.predictions.get(app.appId)
      })),
      overrides: []
    };

    // Initialize app states and apply ML predictions
    await this.updateAppStates();
  }

  private async deactivateGeofence(): Promise<void> {
    this.currentState = {
      isActive: false,
      activeApps: [],
      overrides: []
    };
  }

  public async requestOverride(app: AppConfig, user: User, reason?: string): Promise<boolean> {
    if (!this.currentState.isActive) return true;

    const canOverride = this.evaluateOverridePermission(app, user);
    if (!canOverride) return false;

    const override: OverrideState = {
      app,
      user,
      grantedAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes default
      reason
    };

    this.currentState.overrides.push(override);
    await this.updateAppStates();
    return true;
  }

  private evaluateOverridePermission(app: AppConfig, user: User): boolean {
    switch (app.overrideLevel) {
      case OverrideLevel.Never:
        return false;
      case OverrideLevel.AdminOnly:
        return user.role === 'ADMIN';
      case OverrideLevel.RoleSpecific:
        return ['ADMIN', 'PASTOR', 'LEADER'].includes(user.role);
      case OverrideLevel.Emergency:
        return true;
      case OverrideLevel.Always:
        return true;
      default:
        return false;
    }
  }

  private async updateAppStates(): Promise<void> {
    this.currentState.activeApps = this.currentState.activeApps.map(appState => {
      const override = this.currentState.overrides.find(
        o => o.app.appId === appState.appConfig.appId && o.expiresAt > new Date()
      );

      return {
        ...appState,
        isBlocked: !override && !appState.appConfig.isAllowed,
        overrideExpiry: override?.expiresAt
      };
    });
  }

  public getActiveState(): GeofenceState {
    return this.currentState;
  }

  public isAppBlocked(appId: string): boolean {
    if (!this.currentState.isActive) return false;
    const appState = this.currentState.activeApps.find(a => a.appConfig.appId === appId);
    return appState ? appState.isBlocked : true;
  }
}