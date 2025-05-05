import { AppCategory, AppConfig } from './geofence';
import { UserRole } from './prompts';

export interface MLFeatures {
  userRole: UserRole;
  appCategory: AppCategory;
  timeOfDay: number; // 24-hour format
  dayOfWeek: number; // 0-6, Sunday = 0
  isServiceTime: boolean;
  previousOverrides: number;
  usageFrequency: number;
  lastUsageDuration: number;
  emotionalState?: string;
}

export interface MLPrediction {
  appId: string;
  probability: number;
  confidence: number;
  features: MLFeatures;
  explanation: string[];
  timestamp: Date;
}

export interface TrainingData {
  features: MLFeatures;
  label: boolean; // true = allowed, false = blocked
  weight: number;
  timestamp: Date;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: number[][];
  lastTrainingDate: Date;
  samplesCount: number;
}

export interface MLConfig {
  enabled: boolean;
  modelType: string;
  featureImportance: Map<string, number>;
  thresholds: {
    probability: number;
    confidence: number;
  };
  retrainingSchedule: {
    frequency: number; // days
    minSamples: number;
    lastRetraining?: Date;
  };
}

export interface PredictionRequest {
  userId: string;
  appConfig: AppConfig;
  context: MLFeatures;
}

export interface PredictionResponse {
  prediction: MLPrediction;
  override?: {
    allowed: boolean;
    reason: string;
  };
}

export interface TrainingJob {
  jobId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  metrics?: ModelMetrics;
  error?: string;
}