import {getTranslations, setRequestLocale} from 'next-intl/server';
import {getPosts} from '@/lib/sanity';

export default async function Posts({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const posts = await getPosts(locale);
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <div className="eyebrow">{t('nav_posts')}</div>
          <h1>{t('posts_title')}</h1>
        </div>
      </section>
      <section style={{paddingTop: 30}}>
        <div className="wrap">
          {posts.length === 0 && <p className="lead">{t('posts_empty')}</p>}
          <div style={{display: 'grid', gap: 24, maxWidth: 820}}>
            {posts.map(p => (
              <article className="panel" key={p.slug}>
                <div className="tag">{new Date(p.date).toLocaleDateString(locale === 'me' ? 'sr-ME' : 'en-GB')}</div>
                <h3>{p.title}</h3>
                <p style={{whiteSpace: 'pre-wrap'}}>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
