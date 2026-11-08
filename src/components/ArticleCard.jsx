import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export default function ArticleCard({ article, onOpenArticle }) {
  return (
    <article className="article-card">
      <div className="article-media-container">
        <img
          src={article.image}
          alt={article.alt}
          className="article-img"
          loading="lazy"
        />
        <span className="article-tag">{article.category}</span>
      </div>

      <div className="article-card-body">
        <h3 className="article-card-title">{article.title}</h3>
        <p className="article-card-intro">{article.intro}</p>

        <div className="article-card-footer">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
            <Clock size={13} />
            {article.readTime}
          </span>

          <button
            type="button"
            className="article-read-btn"
            onClick={() => onOpenArticle(article)}
            aria-label={`Read full article: ${article.title}`}
          >
            <span>Read More</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

