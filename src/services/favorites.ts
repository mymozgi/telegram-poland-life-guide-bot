import Database from 'better-sqlite3';
import { Favorite } from '../types';

export function addFavorite(db: Database.Database, userId: number, slug: string, lang: string): void {
  db.prepare(
    'INSERT OR IGNORE INTO favorites (user_id, article_slug, article_lang) VALUES (?, ?, ?)'
  ).run(userId, slug, lang);
}

export function removeFavorite(db: Database.Database, userId: number, slug: string, lang: string): void {
  db.prepare(
    'DELETE FROM favorites WHERE user_id = ? AND article_slug = ? AND article_lang = ?'
  ).run(userId, slug, lang);
}

export function isFavorite(db: Database.Database, userId: number, slug: string, lang: string): boolean {
  const row = db.prepare(
    'SELECT 1 FROM favorites WHERE user_id = ? AND article_slug = ? AND article_lang = ?'
  ).get(userId, slug, lang);
  return !!row;
}

export function getUserFavorites(db: Database.Database, userId: number): Favorite[] {
  return db.prepare(
    'SELECT * FROM favorites WHERE user_id = ? ORDER BY created_at DESC'
  ).all(userId) as Favorite[];
}
