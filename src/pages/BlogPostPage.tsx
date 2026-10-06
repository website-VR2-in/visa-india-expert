import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blog';
import { usePageMeta } from '../hooks/usePageMeta';
import { SITE_URL, PageSeo } from '../data/seo';
import { Header } from '../components/Header';
import { Footer } from '../sections/Footer';

const FALLBACK_SEO: PageSeo = {
  title: 'India Visa Guide | Visa India Expert',
  description: 'Practical India visa guides written by practitioners.',
};

/** Single blog post with Article JSON-LD and a CTA to the related visa page. */
export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  // Called unconditionally (Rules of Hooks), before the early return.
  usePageMeta(post ? { title: post.title, description: post.description } : FALLBACK_SEO, `/blog/${slug ?? ''}`);

  if (!post) return <Navigate to="/blog" replace />;

  const published = new Date(post.date + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <Header />
      <main>
        {/* JSON-LD: Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              dateModified: post.date,
              author: { '@type': 'Organization', name: 'Visa India Expert', url: SITE_URL },
              publisher: { '@type': 'Organization', name: 'Visa India Expert', logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` } },
              mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
              image: `${SITE_URL}/og-image.png`,
            }),
          }}
        />

        <article className="section bg-ivory">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <nav aria-label="Breadcrumb" className="text-warmgray-600 text-sm mb-6">
                <Link to="/" className="hover:text-saffron-600">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/blog" className="hover:text-saffron-600">Blog</Link>
                <span className="mx-2">/</span>
                <span>{post.title}</span>
              </nav>

              <time dateTime={post.date} className="text-xs font-bold text-saffron-700 uppercase tracking-wide">
                {published} · {post.readTime}
              </time>
              <h1 className="text-2xl md:text-3xl font-bold text-navy-500 leading-tight mt-3">{post.title}</h1>
              <p className="text-warmgray-600 text-lg mt-4 leading-relaxed border-l-4 border-saffron-500 pl-4 italic">{post.excerpt}</p>

              <div className="mt-8 space-y-8">
                {post.sections.map((section, i) => (
                  <section key={i}>
                    {section.heading && <h2 className="text-xl font-bold text-navy-500 mb-3">{section.heading}</h2>}
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-warmgray-700 leading-relaxed mb-4">{p}</p>
                    ))}
                  </section>
                ))}
              </div>

              {/* CTA to the related visa page (internal linking) */}
              <div className="mt-10 bg-navy-500 rounded-xl p-6 md:p-8 text-white">
                <h2 className="text-xl font-bold mb-2">Ready to apply for your {post.relatedVisaLabel}?</h2>
                <p className="text-warmgray-200 text-sm mb-5">
                  Get a free 15-minute case review and a complete document checklist before you spend anything.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to={`/apply/${post.relatedVisaId}`} className="btn btn-primary btn-sm">
                    Start your {post.relatedVisaLabel} application
                  </Link>
                  <Link
                    to={`/visa/${post.relatedVisaId}`}
                    className="btn btn-sm border-2 border-white/60 text-white hover:bg-white/10 focus:ring-white/40"
                  >
                    See {post.relatedVisaLabel} details & pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};
