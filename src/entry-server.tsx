import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { RoutesTree } from './RoutesTree';
import {
  HOME_SEO,
  VISAS_SEO,
  ABOUT_SEO,
  PRESS_SEO,
  BLOG_INDEX_SEO,
  PRIVACY_SEO,
  TERMS_SEO,
  REFUND_SEO,
  DISCLAIMER_SEO,
} from './data/seo';
import { BLOG_POSTS } from './data/blog';

/**
 * SSR entry for static generation (Step 10: no-JS crawlers must see full HTML).
 *
 * `scripts/prerender.mjs` imports this bundle from Node, stubs localStorage,
 * calls render(path) for every public route and injects the markup into the
 * built dist/index.html template (head is patched per-route by the script).
 */
export const render = (url: string): string =>
  renderToString(
    <StaticRouter location={url}>
      <RoutesTree />
    </StaticRouter>
  );

export interface PrerenderRoute {
  /** Route path, e.g. "/" or "/visa/tourist". */
  path: string;
  /** Output file relative to dist/, e.g. "index.html" or "visa/tourist/index.html". */
  file: string;
  /** <title> for the route. */
  title: string;
  /** meta description for the route. */
  description: string;
  /** Optional canonical override (defaults to SITE_URL + path). */
  canonical?: string;
}

/** Every public, indexable route — the exact set that gets a static HTML file. */
export const getRoutes = (): PrerenderRoute[] => {
  const routes: PrerenderRoute[] = [
    { path: '/', file: 'index.html', title: HOME_SEO.title, description: HOME_SEO.description, canonical: 'https://visaindiaexpert.com/' },
  ];
  for (const [id, seo] of Object.entries(VISAS_SEO)) {
    routes.push({ path: `/visa/${id}`, file: `visa/${id}/index.html`, title: seo.title, description: seo.description });
  }
  routes.push(
    { path: '/about', file: 'about/index.html', title: ABOUT_SEO.title, description: ABOUT_SEO.description },
    { path: '/press', file: 'press/index.html', title: PRESS_SEO.title, description: PRESS_SEO.description },
    { path: '/blog', file: 'blog/index.html', title: BLOG_INDEX_SEO.title, description: BLOG_INDEX_SEO.description },
  );
  for (const post of BLOG_POSTS) {
    routes.push({ path: `/blog/${post.slug}`, file: `blog/${post.slug}/index.html`, title: post.metaTitle, description: post.description });
  }
  routes.push(
    { path: '/privacy', file: 'privacy/index.html', title: PRIVACY_SEO.title, description: PRIVACY_SEO.description },
    { path: '/terms', file: 'terms/index.html', title: TERMS_SEO.title, description: TERMS_SEO.description },
    { path: '/refund', file: 'refund/index.html', title: REFUND_SEO.title, description: REFUND_SEO.description },
    { path: '/disclaimer', file: 'disclaimer/index.html', title: DISCLAIMER_SEO.title, description: DISCLAIMER_SEO.description },
  );
  return routes;
};
