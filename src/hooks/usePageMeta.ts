import { useEffect } from 'react';
import { PageSeo, SITE_URL, OG_IMAGE } from '../data/seo';

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets document title, meta description, canonical, Open Graph and
 * Twitter card tags for the current page (SPA-safe — updates on every
 * route change, no server render needed).
 */
export function usePageMeta(seo: PageSeo, path: string): void {
  useEffect(() => {
    document.title = seo.title;

    setMeta('name', 'description', seo.description);

    // Open Graph
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', SITE_URL + path);
    setMeta('property', 'og:site_name', 'Visa India Expert');
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', OG_IMAGE);

    // Canonical
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = SITE_URL + path;
  }, [seo, path]);
}
