import { User } from './auth';

export interface JournalEntry {
  id: string;
  userId: string;
  title?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  mood?: string;
  tags: string[];
  scripture?: ScriptureReference[];
  isPrivate: boolean;
  attachments?: Attachment[];
  analytics?: EntryAnalytics;
}

export interface ScriptureReference {
  book: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  translation: string;
  text: string;
  context?: string;
}

export interface Attachment {
  id: string;
  type: 'AUDIO' | 'IMAGE' | 'DOCUMENT';
  url: string;
  name: string;
  size: number;
  createdAt: Date;
}

export interface EntryAnalytics {
  wordCount: number;
  topicsSentiment: Map<string, number>;
  emotionalTrend: string;
  scriptureConnections: number;
  prayerCount: number;
}

export interface JournalSettings {
  defaultPrivacy: boolean;
  enableReminders: boolean;
  reminderTime?: string;
  autoSaveInterval: number;
  preferredBibleTranslation: string;
  templateEnabled: boolean;
  template?: string;
}

export interface SpiritualInsight {
  userId: string;
  period: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  metrics: {
    journalStreak: number;
    totalEntries: number;
    averageWordCount: number;
    topEmotions: string[];
    frequentScriptures: ScriptureReference[];
    prayerTime: number;
    growthAreas: string[];
  };
  recommendations: {
    scriptures: ScriptureReference[];
    topics: string[];
    actions: string[];
  };
}

export interface JournalTemplate {
  id: string;
  name: string;
  description: string;
  prompts: string[];
  structure: string;
  category: 'PRAYER' | 'REFLECTION' | 'SERMON' | 'STUDY' | 'CUSTOM';
  isDefault: boolean;
}

export interface SearchQuery {
  userId: string;
  keywords?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  scripture?: ScriptureReference;
  mood?: string;
  limit?: number;
  offset?: number;
}