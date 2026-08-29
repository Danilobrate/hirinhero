// Standardni Hirin' Hero "mark" (mala kvadratna ikonica) — H, zlatni apostrof, H
// na tegetnoj pozadini. Isti standard kao favicon (src/app/icon.svg) i email
// potpisi. Vidi BRAND.md — ovo je jedini mjesto koje treba mijenjati ako se
// mark ikad redizajnira.
export default function Mark({size=34, radius}:{size?: number; radius?: number}){
  const r = radius ?? Math.round(size*0.27);
  const fontSize = Math.round(size*0.43);
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: r,
        background: 'var(--navy)',
        color: '#fff',
        fontFamily: "'Inter',-apple-system,'Segoe UI',Roboto,Arial,sans-serif",
        fontWeight: 800,
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        flex: '0 0 auto'
      }}
    >
      H<span style={{color: 'var(--accent)'}}>’</span>H
    </span>
  );
}
