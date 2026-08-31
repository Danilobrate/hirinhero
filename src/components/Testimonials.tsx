import {getTranslations, getLocale} from 'next-intl/server';
import {getTestimonials} from '@/lib/sanity';

export default async function Testimonials() {
  const t = await getTranslations();
  const locale = await getLocale();
  const items = await getTestimonials(locale);
  const data = items ?? [4, 3, 2, 6, 5, 1].map(i => ({
    quote: t(`t${i}_q`), name: t(`t${i}_n`), role: t(`t${i}_r`)
  }));
  return (
    <>
      <div className="tcards">
        {data.map((x, i) => (
          <div className="tcard reveal" key={i}>
            <div className="q">{x.quote}</div>
            <div className="who">
              <div><b>{x.name}</b><span>{x.role}</span></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
