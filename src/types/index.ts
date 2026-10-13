// Domain types for LinguaHub

export type LanguageCode = 'en' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'zh';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string; // emoji
  speechLang: string; // BCP-47 for SpeechSynthesis
}

export type ProficiencyLevel = 'Beginner' | 'Elementary' | 'Intermediate' | 'Upper-Intermediate' | 'Advanced';

export type ModuleType = 'vocabulary' | 'grammar' | 'shadowing' | 'listening';

export interface VocabCard {
  term: string;
  translation: string;
  example: string;
  exampleTranslation: string;
}

export interface GrammarQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ListeningQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LessonModule {
  type: ModuleType;
  title: string;
  // vocabulary
  cards?: VocabCard[];
  // grammar
  questions?: GrammarQuestion[];
  // shadowing
  phrases?: string[];
  // listening
  passage?: string;
  comprehension?: ListeningQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  modules: LessonModule[];
}

export interface Course {
  id: string;
  language: LanguageCode;
  level: ProficiencyLevel;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  avatarColor: string;
  isGuest?: boolean;
}

export interface ModuleResult {
  type: ModuleType;
  correct: number;
  total: number;
  completedAt: string;
}

export interface LessonProgress {
  completed: boolean;
  completedAt?: string;
  moduleResults: ModuleResult[];
}

export interface LanguageProgress {
  level: ProficiencyLevel;
  completedLessons: string[];
  moduleAccuracy: Record<ModuleType, { correct: number; total: number }>;
}

export interface UserProgress {
  userId: string;
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalStudyMinutes: number;
  languageProgress: Record<LanguageCode, LanguageProgress>;
  lessonProgress: Record<string, LessonProgress>; // key: lessonId
  unlockedAchievements: string[];
  completedLessons: string[];
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  body: string;
  languageTag: LanguageCode | 'general';
  likes: string[]; // userIds who liked
  comments: Comment[];
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  xp: number;
  check: (progress: UserProgress) => boolean;
}

export type Page =
  | 'dashboard'
  | 'courses'
  | 'lesson'
  | 'community'
  | 'achievements'
  | 'profile';
