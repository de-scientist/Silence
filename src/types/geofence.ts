import { User } from './auth';

export interface GeofenceConfig {
  wifiSSID: string[];
  radius: number; // in meters
  churchName: string;
  allowedApps: AppConfig[];
  blockMobileData: boolean;
  quietHours?: QuietHours;
}

export interface AppConfig {
  appId: string;
  appName: string;
  packageName?: string;
  isAllowed: boolean;
  category: AppCategory;
  overrideLevel: OverrideLevel;
  mlEnabled: boolean;
  customRules?: AppRule[];
}

export interface QuietHours {
  enabled: boolean;
  startTime: string; // HH:mm format
  endTime: string;
  days: DayOfWeek[];
}

export enum DayOfWeek {
  Sunday = 'SUNDAY',
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY'
}

export enum AppCategory {
  Social = 'SOCIAL',
  Messaging = 'MESSAGING',
  Entertainment = 'ENTERTAINMENT',
  Productivity = 'PRODUCTIVITY',
  Bible = 'BIBLE',
  Notes = 'NOTES',
  System = 'SYSTEM',
  Other = 'OTHER'
}

export enum OverrideLevel {
  Never = 'NEVER',
  AdminOnly = 'ADMIN_ONLY',
  RoleSpecific = 'ROLE_SPECIFIC',
  Emergency = 'EMERGENCY',
  Always = 'ALWAYS'
}

export interface AppRule {
  condition: RuleCondition;
  action: RuleAction;
  priority: number;
}

export interface RuleCondition {
  type: 'TIME' | 'ROLE' | 'LOCATION' | 'ML_SCORE';
  value: any;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'IN' | 'NOT_IN';
}

export interface RuleAction {
  type: 'ALLOW' | 'DENY' | 'NOTIFY' | 'LOG';
  message?: string;
  duration?: number; // in minutes
}

export interface GeofenceState {
  isActive: boolean;
  currentSSID?: string;
  enteredAt?: Date;
  activeApps: AppState[];
  overrides: OverrideState[];
}

export interface AppState {
  appConfig: AppConfig;
  isBlocked: boolean;
  lastAccess?: Date;
  overrideExpiry?: Date;
  mlScore?: number;
}

export interface OverrideState {
  app: AppConfig;
  user: User;
  grantedAt: Date;
  expiresAt: Date;
  reason?: string;
}