// Hirin' Hero wordmark — live text u Inter fontu (usklađeno sa ostatkom sajta),
// zlatni apostrof je stalni brend akcenat (vidi BRAND.md).
export default function Logo({height=22,className}:{height?:number;className?:string}){
  const fontSize = Math.round(height*0.86);
  return (
    <span
      className={className}
      aria-label="Hirin’ Hero"
      style={{
        fontFamily: "'Inter',-apple-system,'Segoe UI',Roboto,Arial,sans-serif",
        fontWeight: 800,
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color: 'inherit',
        whiteSpace: 'nowrap',
        display: 'inline-block'
      }}
    >
      Hirin<span style={{color: 'var(--accent)'}}>’</span>Hero
    </span>
  );
}
