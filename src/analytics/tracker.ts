import Database from 'better-sqlite3';

export type EventType =
  | 'language_selected'
  | 'category_opened'
  | 'search'
  | 'article_opened'
  | 'feedback_sent';

export function trackEvent(
  db: Database.Database,
  userId: number | null,
  eventType: EventType,
  payload?: Record<string, unknown>
): void {
  db.prepare(
    'INSERT INTO analytics_events (user_id, event_type, payload) VALUES (?, ?, ?)'
  ).run(userId, eventType, payload ? JSON.stringify(payload) : null);
}

export interface StatsData {
  users: number;
  top_categories: Array<{ category: string; count: number }>;
  top_searches: Array<{ query: string; count: number }>;
  unanswered_queries: Array<{ query: string; count: number }>;
}

export function getStats(db: Database.Database): StatsData {
  const userCount = (db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }).count;

  const topCategories = db.prepare(`
    SELECT json_extract(payload, '$.category') as category, COUNT(*) as count
    FROM analytics_events
    WHERE event_type = 'category_opened'
      AND json_extract(payload, '$.category') IS NOT NULL
    GROUP BY category
    ORDER BY count DESC
    LIMIT 10
  `).all() as Array<{ category: string; count: number }>;

  const topSearches = db.prepare(`
    SELECT json_extract(payload, '$.query') as query, COUNT(*) as count
    FROM analytics_events
    WHERE event_type = 'search'
      AND json_extract(payload, '$.query') IS NOT NULL
    GROUP BY query
    ORDER BY count DESC
    LIMIT 10
  `).all() as Array<{ query: string; count: number }>;

  const unansweredQueries = db.prepare(`
    SELECT json_extract(payload, '$.query') as query, COUNT(*) as count
    FROM analytics_events
    WHERE event_type = 'search'
      AND json_extract(payload, '$.results_count') = 0
      AND json_extract(payload, '$.query') IS NOT NULL
    GROUP BY query
    ORDER BY count DESC
    LIMIT 10
  `).all() as Array<{ query: string; count: number }>;

  return { users: userCount, top_categories: topCategories, top_searches: topSearches, unanswered_queries: unansweredQueries };
}
