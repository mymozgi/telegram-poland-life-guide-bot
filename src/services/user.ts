import { DatabaseSync } from 'node:sqlite';
import { User, Language, DEFAULT_LANGUAGE } from '../types';

export function getOrCreateUser(db: DatabaseSync, telegramId: number, username: string | null): User {
  const existing = db.prepare('SELECT * FROM users WHERE telegram_id = ?').get(telegramId) as unknown as User | undefined;
  if (existing) return existing;

  db.prepare(
    'INSERT INTO users (telegram_id, username, language) VALUES (?, ?, ?)'
  ).run(telegramId, username, DEFAULT_LANGUAGE);

  return db.prepare('SELECT * FROM users WHERE telegram_id = ?').get(telegramId) as unknown as User;
}

export function setUserLanguage(db: DatabaseSync, telegramId: number, language: Language): void {
  db.prepare(
    'UPDATE users SET language = ?, updated_at = CURRENT_TIMESTAMP WHERE telegram_id = ?'
  ).run(language, telegramId);
}

export function getUserLanguage(db: DatabaseSync, telegramId: number): Language {
  const user = db.prepare('SELECT language FROM users WHERE telegram_id = ?').get(telegramId) as unknown as { language: string } | undefined;
  return (user?.language as Language) ?? DEFAULT_LANGUAGE;
}

export function getUserCount(db: DatabaseSync): number {
  const row = db.prepare('SELECT COUNT(*) as count FROM users').get() as unknown as { count: number };
  return row.count;
}
