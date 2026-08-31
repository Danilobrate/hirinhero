import {createClient, type SanityClient} from '@sanity/client';

/* Sanity CMS klijent — radi samo ako je NEXT_PUBLIC_SANITY_PROJECT_ID postavljen.
   Bez njega sajt koristi ugradjeni (fallback) sadrzaj, tako da build i rad nikad ne zavise od CMS-a. */
let client: SanityClient | null = null;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (projectId) {
  client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2025-01-01',
    useCdn: true
  });
}

export type Testimonial = {quote: string; name: string; role: string};
export type ClientLogo = {name: string; logoUrl?: string};
export type Post = {title: string; slug: string; date: string; body: string};

export async function getTestimonials(locale: string): Promise<Testimonial[] | null> {
  if (!client) return null;
  try {
    const q = `*[_type=="testimonial"]|order(order asc){ "quote": select($l=="en" => coalesce(quote_en, quote_me), quote_me), name, "role": role + ", " + company }`;
    const r = await client.fetch(q, {l: locale});
    return r?.length ? r : null;
  } catch { return null; }
}

export async function getClientLogos(): Promise<ClientLogo[] | null> {
  if (!client) return null;
  try {
    const r = await client.fetch(`*[_type=="clientLogo"]|order(order asc){name, "logoUrl": logo.asset->url}`);
    return r?.length ? r : null;
  } catch { return null; }
}

export async function getPosts(locale: string): Promise<Post[]> {
  if (!client) return [];
  try {
    const q = `*[_type=="post" && published==true]|order(date desc){
      "title": select($l=="en" => coalesce(title_en, title_me), title_me),
      "slug": slug.current, date,
      "body": select($l=="en" => coalesce(body_en, body_me), body_me)
    }`;
    return await client.fetch(q, {l: locale});
  } catch { return []; }
}

/* Fallback lista klijenata (dok se ne unesu u CMS) */
export const FALLBACK_CLIENTS = [
  'Air Montenegro', 'Alliance', 'Alter Modus', 'Biro All', 'Coinis',
  'Creditreform.de', 'Emmeti', 'ETG Grupa', 'Euromix Beton', 'GRAWE',
  'Meba - Kärcher centar', 'Metron', 'Orcos Beauty', 'POS4ME', 'PR Consultancy Hub',
  'QBIK', 'RBK Cosmetics', 'Ruža vjetrova by Radisson', "Sotheby's Montenegro", 'Structos Construction',
  'Techno Gym', 'Tehnocolor', 'Urion', 'Veltex Group', 'Vertigo Montenegro',
  'VG eFiskal', 'Zheng-He'
];
