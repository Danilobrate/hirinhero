// Zajednička "cigla" za sve opengraph-image.tsx fajlove (next/og -> ImageResponse).
// Satori (motor iza ImageResponse) razumije samo flexbox + inline stilove, bez CSS fajlova,
// zato je sve ovdje "ručno" i namjerno jednostavno.

import {INTER_EXTRABOLD_WOFF_BASE64} from './ogFontData';

export const ogSize = {width: 1200, height: 630};
export const ogContentType = 'image/png' as const;

const NAVY = '#0f2440';
const NAVY_2 = '#1f3a5f';
const ACCENT = '#c9a24b';
const INK_LIGHT = '#c9d3e0';
const FONT_WEIGHT = 800 as const; // jedina ugrađena debljina - vidi ogFontData.ts

type OgFont = {name: string; data: Buffer; weight: typeof FONT_WEIGHT; style: 'normal'};
let cachedFonts: OgFont[] | null = null;

// Font je ugrađen kao base64 (ogFontData.ts) umjesto kao poseban binarni fajl u repou -
// next/og radi u serverless funkciji, pa nema potrebe za fetch-om ka Google Fonts u
// runtime-u niti za binarnim asset fajlom u git istoriji.
export async function ogFonts(): Promise<OgFont[]> {
  if (cachedFonts) return cachedFonts;
  cachedFonts = [
    {name: 'Inter', data: Buffer.from(INTER_EXTRABOLD_WOFF_BASE64, 'base64'), weight: FONT_WEIGHT, style: 'normal'}
  ];
  return cachedFonts;
}

export function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut) + '…';
}

export function ogImageElement({
  badge,
  title,
  subtitle,
  footerNote
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  footerNote?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 80px',
        backgroundColor: NAVY,
        backgroundImage: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_2} 55%, ${NAVY} 100%)`,
        fontFamily: 'Inter'
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'baseline', fontSize: 34, fontWeight: FONT_WEIGHT, color: '#ffffff'}}>
          <span>Hirin</span>
          <span style={{color: ACCENT}}>’</span>
          <span>Hero</span>
        </div>
        <div style={{display: 'flex', fontSize: 20, fontWeight: FONT_WEIGHT, letterSpacing: '1px', color: INK_LIGHT, opacity: 0.75}}>
          hirinhero.me
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', maxWidth: 1000}}>
        {badge ? (
          <div
            style={{
              display: 'flex',
              fontSize: 21,
              fontWeight: FONT_WEIGHT,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: ACCENT,
              marginBottom: 20
            }}
          >
            {badge}
          </div>
        ) : null}
        <div style={{display: 'flex', fontSize: 58, fontWeight: FONT_WEIGHT, color: '#ffffff', lineHeight: 1.18}}>
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              fontWeight: FONT_WEIGHT,
              color: INK_LIGHT,
              opacity: 0.85,
              lineHeight: 1.45,
              marginTop: 22
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', width: 64, height: 5, borderRadius: 3, backgroundColor: ACCENT}} />
        {footerNote ? (
          <div style={{display: 'flex', fontSize: 19, fontWeight: FONT_WEIGHT, color: INK_LIGHT, opacity: 0.75}}>
            {footerNote}
          </div>
        ) : null}
      </div>
    </div>
  );
}
