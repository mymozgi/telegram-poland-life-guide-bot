# AGENT.md

# Agent Operating Instructions

You are the implementation agent.

Goal:

Build and maintain MVP Telegram bot.

Do not overengineer.

---

# Architecture Rules

Use:

Node.js

TypeScript

Telegraf

SQLite

Docker

Do NOT introduce:

Redis

Microservices

AI

External databases

Queues

Cloud providers

Authentication

Admin panels

Payments

---

# Product Rules

Always prioritize:

1. User value
2. Simplicity
3. Content quality
4. Performance

Do not build features not explicitly requested.

---

# Content Rules

Content is independent from code.

Load all content from files.

Never hardcode articles.

Support multilingual content.

Images are square.

Prefer WebP.

---

# Search Rules

Search by:

title

keywords

question

full text

---

# Analytics Rules

Always record:

language_selected

category_opened

search

article_opened

feedback_sent

Store locally.

---

# Code Rules

Keep files small.

Avoid abstractions.

Document public functions.

No unnecessary packages.

No magic values.

Prefer explicit configuration.

---

# Infrastructure Rules

Project must run:

locally

inside Docker

with zero monthly cost

---

# Success Metrics

Bot starts

Search works

Articles open

Analytics collected

Feedback stored

First 50 users supported
