import { AuthState } from './auth';
import { GeofenceState } from './geofence';
import { MLConfig, ModelMetrics } from './ml';
import { JournalSettings, SpiritualInsight } from './journal';
import { PromptContext } from './prompts';

export interface AppState {
  auth: AuthState;
  geofence: GeofenceState;
  ml: MLState;
  journal: JournalState;
  ui: UIState;
  system: SystemState;
}

export interface MLState {
  config: MLConfig;
  metrics: ModelMetrics;
  predictions: Map<string, number>;
  isTraining: boolean;
  lastError?: string;
}

export interface JournalState {
  settings: JournalSettings;
  insights: SpiritualInsight;
  unsavedChanges: boolean;
  currentEntry?: string;
  searchResults: string[];
}

export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  currentPrompt?: PromptContext;
  notifications: Notification[];
  modal: ModalState | null;
  loading: boolean;
}

export interface SystemState {
  version: string;
  isOnline: boolean;
  lastSync: Date;
  pendingUpdates: boolean;
  errors: SystemError[];
  diagnostics: SystemDiagnostics;
}

export interface Notification {
  id: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    handler: string;
  };
}

export interface ModalState {
  type: string;
  title: string;
  content: any;
  actions: ModalAction[];
}

export interface ModalAction {
  label: string;
  handler: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface SystemError {
  code: string;
  message: string;
  timestamp: Date;
  context?: any;
  handled: boolean;
}

export interface SystemDiagnostics {
  memory: {
    total: number;
    used: number;
    free: number;
  };
  storage: {
    total: number;
    used: number;
    free: number;
  };
  network: {
    connected: boolean;
    type?: string;
    strength?: number;
  };
  performance: {
    cpu: number;
    memory: number;
    battery?: number;
  };
}