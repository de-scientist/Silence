export interface BasePrompt {
  id: string;
  text: string;
  category: PromptCategory;
  requiresML?: boolean;
}

export enum PromptCategory {
  Onboarding = 'onboarding',
  Geofence = 'geofence',
  AIDecision = 'ai_decision',
  Journaling = 'journaling',
  BibleApp = 'bible_app',
  AdminPanel = 'admin_panel',
  ModelTraining = 'model_training',
  EmergencyOverride = 'emergency_override',
  SpiritualUX = 'spiritual_ux'
}

export enum UserRole {
  Worshipper = 'worshipper',
  Pastor = 'pastor',
  Admin = 'admin',
  Choir = 'choir',
  YouthMember = 'youth_member',
  Visitor = 'visitor'
}

export interface PromptContext {
  userRole: UserRole;
  location?: GeofenceLocation;
  emotionalState?: string;
  timeOfDay?: Date;
}

export interface GeofenceLocation {
  isInSacredGround: boolean;
  locationName?: string;
  entryTime?: Date;
}