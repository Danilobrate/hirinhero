import {getTranslations, getLocale} from 'next-intl/server';
import {getTestimonials} from '@/lib/sanity';
import TestimonialsCarousel from './TestimonialsCarousel';

export default async function Testimonials() {
  const t = await getTranslations();
  const locale = await getLocale();
  const items = await getTestimonials(locale);
  const data = items ?? [4, 3, 2, 12, 7, 9, 6, 5, 8, 1, 11, 10].map(i => ({
    quote: t(`t${i}_q`), name: t(`t${i}_n`), role: t(`t${i}_r`)
  }));
  return <TestimonialsCarousel items={data} />;
}
