# Hirin' Hero — Sanity Studio (CMS panel)

Panel kroz koji Danilo samostalno uređuje: testimoniale, logotipe klijenata i objave.

## Postavljanje (Mirko, jednokratno)
1. Nalog + projekat: https://www.sanity.io → Create project (plan: Free). Zapisati **Project ID**.
2. U ovom folderu: `npm install`, pa u `sanity.config.ts` unijeti Project ID (ili env `SANITY_STUDIO_PROJECT_ID`).
3. `npx sanity login` pa `npx sanity deploy` → izabrati hostname, npr. `hirinhero` → panel živi na https://hirinhero.sanity.studio
4. U Sanity manage konzoli: API > CORS origins → dodati https://hirinhero.me (bez credentials).
5. U Vercel env sajta: `NEXT_PUBLIC_SANITY_PROJECT_ID` = Project ID, `NEXT_PUBLIC_SANITY_DATASET` = production.
6. Danilu dodati kao člana projekta (Members) da se loguje na panel.

Sajt bez CMS-a koristi ugrađeni sadržaj — ništa ne puca ako CMS nije povezan.
