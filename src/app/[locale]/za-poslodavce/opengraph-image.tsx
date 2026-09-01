import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';
import {ogImageElement, ogFonts, ogSize, ogContentType, truncate} from '@/lib/ogImage';

export const runtime = 'nodejs';
export const alt = 'Hirin’ Hero — za poslodavce';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const title = t('em_h1').split('\n').join(' ');

  return new ImageResponse(
    ogImageElement({
      badge: t('em_eyebrow'),
      title,
      subtitle: truncate(t('em_lead'), 115)
    }),
    {...ogSize, fonts: await ogFonts()}
  );
}
