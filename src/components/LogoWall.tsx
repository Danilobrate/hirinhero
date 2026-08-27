import {getClientLogos, FALLBACK_CLIENTS} from '@/lib/sanity';

export default async function LogoWall({start = false, limit}: {start?: boolean; limit?: number}) {
  const logos = await getClientLogos();
  const items = logos ?? FALLBACK_CLIENTS.map(name => ({name} as {name: string; logoUrl?: string}));
  const list = limit ? items.slice(0, limit) : items;
  return (
    <div className="logos reveal" style={start ? {justifyContent: 'flex-start'} : undefined}>
      {list.map(l => l.logoUrl
        // eslint-disable-next-line @next/next/no-img-element
        ? <img key={l.name} src={l.logoUrl} alt={l.name} style={{height: 34, filter: 'grayscale(1)', opacity: .8}} />
        : <span key={l.name} className="lg">{l.name}</span>
      )}
    </div>
  );
}
