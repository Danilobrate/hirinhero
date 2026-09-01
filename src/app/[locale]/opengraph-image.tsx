import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';
import {ogImageElement, ogFonts, ogSize, ogContentType, truncate} from '@/lib/ogImage';

export const runtime = 'nodejs';
export const alt = 'Hirin’ Hero';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const [, tagline] = t('meta_title').split(' - ');

  return new ImageResponse(
    ogImageElement({
      title: (tagline || t('meta_title')).trim(),
      subtitle: truncate(t('meta_desc'), 110),
      footerNote: locale === 'me' ? '60+ posredovanja · 700+ intervjua' : '60+ placements · 700+ interviews'
    }),
    {...ogSize, fonts: await ogFonts()}
  );
}
