import type {MetadataRoute} from 'next';

const routes = ['', '/o-nama', '/usluge', '/reference', '/za-poslodavce', '/za-kandidate', '/kontakt', '/objave', '/privatnost', '/uslovi'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirinhero.me';
  return routes.flatMap(r => ([
    {url: `${base}${r || '/'}`, changeFrequency: 'monthly' as const, priority: r === '' ? 1 : 0.7},
    {url: `${base}/en${r}`, changeFrequency: 'monthly' as const, priority: 0.5}
  ]));
}
