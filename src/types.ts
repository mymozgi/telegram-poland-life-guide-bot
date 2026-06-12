import { Context } from 'telegraf';

export const LANGUAGES = ['en', 'pl', 'ua', 'ru'] as const;
export type Language = typeof LANGUAGES[number];
export const DEFAULT_LANGUAGE: Language = 'en';

export const CATEGORIES = [
  'housing',
  'transport',
  'work',
  'shopping',
  'nature',
  'children',
  'banks',
  'mail',
  'fines',
  'pets',
] as const;
export type Category = typeof CATEGORIES[number];

export interface ArticleImage {
  file: string;
  caption: string;
}

export interface LegalBasis {
  country: string;
  act: string;
  article: string;
}

export interface Source {
  title: string;
  url: string;
}

export interface Article {
  id: string;
  slug: string;
  language: string;
  category: string;
  title: string;
  keywords: string[];
  question: string;
  short_answer: string;
  images: ArticleImage[];
  conditions: string[];
  exceptions: string[];
  penalties: string[];
  legal_basis: LegalBasis[];
  sources: Source[];
  updated_at: string;
  status: 'draft' | 'review' | 'published' | 'archived';
}

export interface User {
  id: number;
  telegram_id: number;
  username: string | null;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: number;
  user_id: number;
  article_slug: string;
  article_lang: string;
  created_at: string;
}

export interface FeedbackRecord {
  id: number;
  user_id: number | null;
  text: string | null;
  photo: string | null;
  status: string;
  created_at: string;
}

export interface SessionData {
  state?: 'awaiting_search' | 'awaiting_feedback_text' | 'awaiting_feedback_photo';
  feedbackText?: string;
  lastCategory?: string;
}

export interface BotContext extends Context {
  session: SessionData;
  userLanguage: Language;
  dbUserId: number;
}
