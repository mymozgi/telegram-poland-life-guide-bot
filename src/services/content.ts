import fs from 'fs';
import path from 'path';
import { Article, Language, LANGUAGES, CATEGORIES, Category } from '../types';
import { config } from '../config';

const articleCache: Map<string, Article[]> = new Map();

export function loadAllArticles(): void {
  articleCache.clear();
  for (const lang of LANGUAGES) {
    const articles = loadArticlesForLanguage(lang);
    articleCache.set(lang, articles);
  }
}

function loadArticlesForLanguage(lang: Language): Article[] {
  const dir = path.join(config.CONTENT_DIR, lang);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const articles: Article[] = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const article: Article = JSON.parse(raw);
      if (article.status === 'published') {
        articles.push(article);
      }
    } catch {
      console.warn(`Failed to load article: ${lang}/${file}`);
    }
  }

  return articles;
}

export function getArticlesByLanguage(lang: Language): Article[] {
  return articleCache.get(lang) ?? [];
}

export function getArticlesByCategory(lang: Language, category: Category): Article[] {
  return getArticlesByLanguage(lang).filter(a => a.category === category);
}

export function getArticleBySlug(lang: Language, slug: string): Article | undefined {
  return getArticlesByLanguage(lang).find(a => a.slug === slug);
}

export function getFinesArticles(lang: Language): Article[] {
  return getArticlesByCategory(lang, 'fines');
}

export function getCategoryList(): Category[] {
  return [...CATEGORIES];
}
