import { BasePrompt, PromptCategory } from '../types/prompts';

export const onboardingPrompts: BasePrompt[] = [
  {
    id: 'welcome',
    text: 'Welcome to Sanctify — a space of sacred silence. Here, your soul speaks louder than your screen. Ready to enter distraction-free mode?',
    category: PromptCategory.Onboarding
  },
  {
    id: 'role_selection',
    text: 'Before we begin, tell us your role today: Worshipper, Pastor, Admin, Choir, Youth Member, Visitor.',
    category: PromptCategory.Onboarding
  },
  {
    id: 'location_permission',
    text: 'Sanctify needs your permission to sense where you are — so it can unlock calm when you step into sacred ground.',
    category: PromptCategory.Onboarding
  },
  {
    id: 'app_silence',
    text: 'Within these grounds, some apps will gently fall silent — and the Word will rise in their place.',
    category: PromptCategory.Onboarding
  },
  {
    id: 'journal_option',
    text: 'Would you like to keep a digital spiritual journal? We\'ll never share this. It\'s between you and God.',
    category: PromptCategory.Onboarding
  }
];

export const geofencePrompts: BasePrompt[] = [
  {
    id: 'enter_sacred',
    text: 'You\'ve entered holy ground. Digital noise now fades. The Bible and Notepad await.',
    category: PromptCategory.Geofence
  },
  {
    id: 'exit_sacred',
    text: 'You\'ve stepped outside the sanctuary zone. Your full digital world is now restored.',
    category: PromptCategory.Geofence
  },
  {
    id: 'learning_rhythm',
    text: 'Sanctify is learning your rhythm. It will adapt your access over time — with grace and intention.',
    category: PromptCategory.Geofence,
    requiresML: true
  }
];

export const aiDecisionPrompts: BasePrompt[] = [
  {
    id: 'app_silenced',
    text: 'Instagram has been gently silenced. May this moment be filled with presence.',
    category: PromptCategory.AIDecision,
    requiresML: true
  },
  {
    id: 'call_allowed',
    text: 'Call allowed — your presence is needed. Speak with purpose.',
    category: PromptCategory.AIDecision,
    requiresML: true
  },
  {
    id: 'access_limited',
    text: 'Your access is limited now, but Sanctify is always learning. Thank you for your patience.',
    category: PromptCategory.AIDecision,
    requiresML: true
  },
  {
    id: 'access_denied',
    text: 'This app was denied based on your profile, past usage, and sacred time. Want to request temporary access?',
    category: PromptCategory.AIDecision,
    requiresML: true
  }
];

export const journalingPrompts: BasePrompt[] = [
  {
    id: 'heart_stir',
    text: 'What stirred your heart today?',
    category: PromptCategory.Journaling
  },
  {
    id: 'sermon_reflection',
    text: 'Is there a word or phrase from the sermon you want to hold on to?',
    category: PromptCategory.Journaling
  },
  {
    id: 'feeling_process',
    text: 'Need help processing a feeling? Type a few thoughts — I\'ll suggest a verse.',
    category: PromptCategory.Journaling,
    requiresML: true
  },
  {
    id: 'previous_reflection',
    text: 'Would you like to reflect on yesterday\'s entry?',
    category: PromptCategory.Journaling,
    requiresML: true
  }
];

export const bibleAppPrompts: BasePrompt[] = [
  {
    id: 'mood_suggestion',
    text: 'Your current mood suggests peace-seeking. Would you like to read Psalms or John?',
    category: PromptCategory.BibleApp,
    requiresML: true
  },
  {
    id: 'search_topics',
    text: 'Looking for something specific? Try \'forgiveness\', \'purpose\', or \'fear\'.',
    category: PromptCategory.BibleApp
  },
  {
    id: 'daily_proverb',
    text: 'You often read Proverbs. Would you like a daily proverb notification at 7AM?',
    category: PromptCategory.BibleApp,
    requiresML: true
  }
];

export const adminPrompts: BasePrompt[] = [
  {
    id: 'app_silence_settings',
    text: 'Select which apps should be silenced by default within the sanctuary.',
    category: PromptCategory.AdminPanel
  },
  {
    id: 'ai_retrain',
    text: 'Would you like to retrain the AI based on recent user feedback?',
    category: PromptCategory.AdminPanel,
    requiresML: true
  },
  {
    id: 'override_request',
    text: 'This user requested override access. Review and approve or deny.',
    category: PromptCategory.AdminPanel
  },
  {
    id: 'usage_report',
    text: 'Weekly usage report ready. View how often distractions were blocked or bypassed.',
    category: PromptCategory.AdminPanel,
    requiresML: true
  }
];

export const emergencyPrompts: BasePrompt[] = [
  {
    id: 'override_confirm',
    text: 'Override requested. Tap again to confirm access for 15 minutes.',
    category: PromptCategory.EmergencyOverride
  },
  {
    id: 'override_active',
    text: 'Override active. This app will relock automatically at 14:35.',
    category: PromptCategory.EmergencyOverride
  },
  {
    id: 'emergency_access',
    text: 'Need to reach someone fast? Emergency access enabled for Phone + SMS.',
    category: PromptCategory.EmergencyOverride
  }
];

export const spiritualUXPrompts: BasePrompt[] = [
  {
    id: 'ar_mode',
    text: 'Raise your phone to the pulpit — enter AR scripture mode.',
    category: PromptCategory.SpiritualUX
  },
  {
    id: 'emotional_support',
    text: 'You seem down today. Here\'s Isaiah 41:10 — \'Do not fear, for I am with you.\'',
    category: PromptCategory.SpiritualUX,
    requiresML: true
  },
  {
    id: 'voice_prayer',
    text: 'Would you like to record a voice prayer entry?',
    category: PromptCategory.SpiritualUX
  },
  {
    id: 'anxiety_support',
    text: 'Your voice sounds anxious. Would you like to play a calming hymn or verse?',
    category: PromptCategory.SpiritualUX,
    requiresML: true
  }
];

export const modelTrainingPrompts: BasePrompt[] = [
  {
    id: 'block_feedback',
    text: 'Was this block helpful in staying focused?',
    category: PromptCategory.ModelTraining,
    requiresML: true
  },
  {
    id: 'app_permission',
    text: 'Should Sanctify allow this app next time you visit the church?',
    category: PromptCategory.ModelTraining,
    requiresML: true
  },
  {
    id: 'usage_pattern',
    text: 'You opened this app multiple times during service. Should we flag it for retraining?',
    category: PromptCategory.ModelTraining,
    requiresML: true
  }
];