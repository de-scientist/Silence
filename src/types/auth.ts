import { UserRole } from './prompts';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
  churchId?: string;
  lastLogin?: Date;
  preferences?: UserPreferences;
  metadata?: UserMetadata;
}

export interface UserPreferences {
  darkMode: boolean;
  notificationsEnabled: boolean;
  autoLockEnabled: boolean;
  journalReminders: boolean;
  bibleTranslation: string;
}

export interface UserMetadata {
  registrationDate: Date;
  lastGeofenceEntry?: Date;
  lastGeofenceExit?: Date;
  totalServiceTime?: number;
  blockedAppsHistory?: BlockedAppRecord[];
  journalEntryCount?: number;
}

export interface BlockedAppRecord {
  appName: string;
  timestamp: Date;
  duration: number;
  overrideRequested: boolean;
  overrideGranted?: boolean;
  reason?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
  churchId?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}