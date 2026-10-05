import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blog';
import { usePageMeta } from '../hooks/usePageMeta';
import { SITE_URL } from '../data/seo';
import { Header } from '../components/Header';
import { Footer } from '../sections/Footer';

const BLOG_SEO = {
  title: 'India Visa Guides & Updates | Visa India Expert',
  description:
    'Practical India visa guides: processing times by category, rejection causes and fixes, E-1 vs B-1 differences, and tourist visa requirements — written by practitioners.',
  h1: 'India Visa Guides',
} as const;

/** Blog index — list of posts with dates, excerpts and reading time. */
export const BlogPage: React.FC = () => {
  usePageMeta(BLOG_SEO, '/blog');

  return (
    <>
      <Header />
      <main>
        {/* JSON-LD: Blog + ItemList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'Visa India Expert Blog',
              url: `${SITE_URL}/blog`,
              description: BLOG_SEO.description,
              publisher: { '@type': 'Organization', name: 'Visa India Expert', url: SITE_URL },
              blogPost: BLOG_POSTS.map((p) => ({
                '@type': 'BlogPosting',
                headline: p.title,
                description: p.description,
                datePublished: p.date,
                url: `${SITE_URL}/blog/${p.slug}`,
              })),
            }),
          }}
        />

        <section className="bg-navy-500 text-white">
          <div className="container-custom section">
            <div className="max-w-3xl mx-auto">
              <nav aria-label="Breadcrumb" className="text-warmgray-300 text-sm mb-6">
                <Link to="/" className="hover:text-saffron-400">Home</Link>
                <span className="mx-2">/</span>
                <span>Blog</span>
              </nav>
              <h1 className="section-title text-white mb-4">{BLOG_SEO.h1}</h1>
              <p className="text-warmgray-200 text-lg leading-relaxed">
                Practical guides on Indian visas — processing times, rejection causes, category choices and requirements.
                Written by the consultants who process these applications every week.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-ivory">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {BLOG_POSTS.map((post) => (
                <article key={post.slug} className="bg-white rounded-xl border border-navy-100 p-6 hover:border-saffron-400 transition-colors flex flex-col">
                  <time dateTime={post.date} className="text-xs font-bold text-saffron-600 uppercase tracking-wide">
                    {new Date(post.date + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readTime}
                  </time>
                  <h2 className="text-lg font-bold text-navy-500 mt-3 leading-snug">
                    <Link to={`/blog/${post.slug}`} className="hover:text-saffron-600">{post.title}</Link>
                  </h2>
                  <p className="text-warmgray-600 text-sm mt-3 leading-relaxed flex-1">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="text-sm font-bold text-navy-500 hover:text-saffron-600 mt-4">
                    Read the guide →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
