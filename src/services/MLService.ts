import { MLConfig, ModelMetrics, MLFeatures, MLPrediction, TrainingData, PredictionRequest, PredictionResponse, TrainingJob } from '../types/ml';
import { AppConfig, AppCategory } from '../types/geofence';
import { UserRole } from '../types/prompts';

export class MLService {
  private config: MLConfig;
  private metrics: ModelMetrics;
  private trainingData: TrainingData[];
  private predictions: Map<string, number>;

  constructor(config: MLConfig) {
    this.config = config;
    this.predictions = new Map();
    this.trainingData = [];
    this.metrics = {
      accuracy: 0,
      precision: 0,
      recall: 0,
      f1Score: 0,
      confusionMatrix: [[0, 0], [0, 0]],
      lastTrainingDate: new Date(),
      samplesCount: 0
    };
  }

  public async predict(request: PredictionRequest): Promise<PredictionResponse> {
    if (!this.config.enabled) {
      return this.getDefaultPrediction(request);
    }

    const features = this.preprocessFeatures(request.context);
    const probability = await this.calculateProbability(features, request.appConfig);
    const confidence = this.calculateConfidence(features);

    const prediction: MLPrediction = {
      appId: request.appConfig.appId,
      probability,
      confidence,
      features,
      explanation: this.generateExplanation(probability, features),
      timestamp: new Date()
    };

    this.predictions.set(request.appConfig.appId, probability);

    return {
      prediction,
      override: this.determineOverride(prediction, request.appConfig)
    };
  }

  public async addTrainingData(data: TrainingData): Promise<void> {
    this.trainingData.push(data);

    if (this.shouldRetrain()) {
      await this.retrain();
    }
  }

  private async calculateProbability(features: MLFeatures, appConfig: AppConfig): Promise<number> {
    // Simplified probability calculation based on features
    let probability = 0.5; // Base probability

    // Adjust based on user role
    if (features.userRole === 'ADMIN') probability += 0.3;
    else if (features.userRole === 'PASTOR') probability += 0.2;
    else if (features.userRole === 'LEADER') probability += 0.1;

    // Adjust based on app category
    if (appConfig.category === AppCategory.Bible) probability += 0.2;
    else if (appConfig.category === AppCategory.Notes) probability += 0.1;
    else if (appConfig.category === AppCategory.Social) probability -= 0.2;
    else if (appConfig.category === AppCategory.Entertainment) probability -= 0.3;

    // Adjust based on service time
    if (features.isServiceTime) probability -= 0.2;

    // Adjust based on usage history
    probability += (features.previousOverrides - features.usageFrequency) * 0.05;

    // Ensure probability is between 0 and 1
    return Math.max(0, Math.min(1, probability));
  }

  private calculateConfidence(features: MLFeatures): number {
    // Simplified confidence calculation
    return 0.7 + (features.previousOverrides * 0.05);
  }

  private generateExplanation(probability: number, features: MLFeatures): string[] {
    const explanations: string[] = [];

    if (probability >= 0.8) {
      explanations.push('High trust based on user role and app category');
    } else if (probability <= 0.2) {
      explanations.push('Restricted due to service time or app category');
    }

    if (features.isServiceTime) {
      explanations.push('Current time is during service hours');
    }

    if (features.previousOverrides > 3) {
      explanations.push('Multiple previous overrides recorded');
    }

    return explanations;
  }

  private determineOverride(prediction: MLPrediction, appConfig: AppConfig): { allowed: boolean; reason: string } {
    const allowed = prediction.probability >= this.config.thresholds.probability &&
                   prediction.confidence >= this.config.thresholds.confidence;

    return {
      allowed,
      reason: allowed ? 'ML model suggests allowing access' : 'Access restricted based on ML prediction'
    };
  }

  private getDefaultPrediction(request: PredictionRequest): PredictionResponse {
    return {
      prediction: {
        appId: request.appConfig.appId,
        probability: 0.5,
        confidence: 1.0,
        features: request.context,
        explanation: ['ML predictions are disabled'],
        timestamp: new Date()
      },
      override: {
        allowed: false,
        reason: 'ML system is disabled'
      }
    };
  }

  private preprocessFeatures(features: MLFeatures): MLFeatures {
    return {
      ...features,
      timeOfDay: features.timeOfDay % 24,
      dayOfWeek: features.dayOfWeek % 7,
      previousOverrides: Math.min(features.previousOverrides, 10),
      usageFrequency: Math.min(features.usageFrequency, 100)
    };
  }

  private shouldRetrain(): boolean {
    if (!this.config.retrainingSchedule.lastRetraining) return true;

    const daysSinceLastTraining = (Date.now() - this.config.retrainingSchedule.lastRetraining.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceLastTraining >= this.config.retrainingSchedule.frequency &&
           this.trainingData.length >= this.config.retrainingSchedule.minSamples;
  }

  private async retrain(): Promise<void> {
    const job: TrainingJob = {
      jobId: Math.random().toString(36).substr(2, 9),
      status: 'running',
      startTime: new Date()
    };

    try {
      // Simplified training process
      this.updateMetrics();
      this.config.retrainingSchedule.lastRetraining = new Date();

      job.status = 'completed';
      job.endTime = new Date();
      job.metrics = this.metrics;
    } catch (error) {
      job.status = 'failed';
      job.endTime = new Date();
      job.error = error.message;
    }
  }

  private updateMetrics(): void {
    // Simplified metrics update
    this.metrics = {
      accuracy: 0.85,
      precision: 0.82,
      recall: 0.88,
      f1Score: 0.85,
      confusionMatrix: [[85, 15], [12, 88]],
      lastTrainingDate: new Date(),
      samplesCount: this.trainingData.length
    };
  }

  public getMetrics(): ModelMetrics {
    return this.metrics;
  }

  public getPredictions(): Map<string, number> {
    return this.predictions;
  }
}