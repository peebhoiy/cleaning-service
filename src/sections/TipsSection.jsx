import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import ArticleCard from '../components/ArticleCard';
import ArticleDialog from '../components/ArticleDialog';
import { articles } from '../data/articles';

export default function TipsSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="tips" className="tips-section" aria-label="Cleaning Tips and Insights">
      <div className="container">
        <SectionHeading
          eyebrow="CLEANING TIPS AND INSIGHTS"
          title="Tips for a Cleaner, Healthier Life"
          subtitle="Expert advice, daily routines, and professional secrets to keep your residential sanctuaries and workspaces fresh, orderly, and hygienic."
          align="center"
        />

        <div className="tips-grid">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpenArticle={(item) => setSelectedArticle(item)}
            />
          ))}
        </div>

        {/* Accessible Article Dialog */}
        <ArticleDialog
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      </div>
    </section>
  );
}

