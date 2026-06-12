import Database from 'better-sqlite3';

export function saveFeedback(
  db: Database.Database,
  userId: number | null,
  text: string | null,
  photo: string | null
): void {
  db.prepare(
    'INSERT INTO feedback (user_id, text, photo, status) VALUES (?, ?, ?, ?)'
  ).run(userId, text, photo, 'new');
}

export function getFeedbackCount(db: Database.Database): number {
  const row = db.prepare('SELECT COUNT(*) as count FROM feedback').get() as { count: number };
  return row.count;
}
