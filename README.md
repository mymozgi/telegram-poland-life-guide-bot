# Poland Life Guide Bot

Telegram bot that helps people understand everyday life rules in Poland — what is allowed, prohibited, fines, conditions, and official sources. Supports 🇬🇧 English, 🇵🇱 Polski, 🇺🇦 Українська, 🇷🇺 Русский.

## Quick Start

### 1. Create a Telegram Bot

Get a token from [@BotFather](https://t.me/BotFather).

### 2. Configure

```bash
cp .env.example .env
# Edit .env and set BOT_TOKEN=your_token_here
```

### 3. Run locally

```bash
npm install
npm run dev
```

### 4. Run with Docker

```bash
docker compose up
```

## Project Structure

```
src/
  bot/          Telegraf bot setup and middleware
  handlers/     Message and callback handlers
  services/     Business logic (users, favorites, feedback, content)
  db/           SQLite database schema and connection
  search/       Full-text search engine
  analytics/    Event tracking

content/
  en/           English articles (JSON)
  pl/           Polish articles (JSON)
  ua/           Ukrainian articles (JSON)
  ru/           Russian articles (JSON)

assets/
  images/       Article images (WebP, 1:1 ratio, max 500 KB)

data/           SQLite database (auto-created, volume-mounted in Docker)
```

## Features

- **Language selection** — English, Polski, Українська, Русский
- **10 categories** — Housing, Transport, Work, Shopping, Nature, Children, Banks, Mail, Fines, Pets
- **20 seed articles** in all 4 languages (80 total)
- **Full-text search** — searches title, keywords, question, answer
- **Favorites** — save and revisit articles
- **Feedback** — users can send text and photos
- **Analytics** — local event tracking, `/stats` HTTP endpoint

## Stats Endpoint

When running, visit `http://localhost:3000/stats` for analytics:

```json
{
  "users": 12,
  "top_categories": [...],
  "top_searches": [...],
  "unanswered_queries": [...]
}
```

## Adding Content

Add a JSON file to `content/{lang}/{slug}.json` following the schema in [CONTENT_SPEC.md](CONTENT_SPEC.md). Set `"status": "published"` to make it visible. Restart the bot to reload content.

## Tech Stack

- **Node.js** v22+ with built-in SQLite (`node:sqlite`)
- **TypeScript**
- **Telegraf** v4 (Telegram bot framework)
- **Docker**

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `BOT_TOKEN` | required | Telegram bot token |
| `DATABASE_PATH` | `./data/bot.db` | SQLite database path |
| `CONTENT_DIR` | `./content` | Content directory |
| `ASSETS_DIR` | `./assets` | Assets directory |
| `STATS_PORT` | `3000` | HTTP stats server port |
