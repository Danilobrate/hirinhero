'use client';
import {useEffect, useRef, useState} from 'react';

type Item = {quote: string; name: string; role: string};

export default function TestimonialsCarousel({items}: {items: Item[]}) {
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width:920px)');
    const update = () => setPerPage(mq.matches ? 2 : 3);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));

  useEffect(() => {
    if (page > totalPages - 1) setPage(0);
  }, [totalPages, page]);

  const go = (dir: 1 | -1) => setPage(p => (p + dir + totalPages) % totalPages);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx < -40) go(1);
    else if (dx > 40) go(-1);
    startX.current = null;
  };

  const visible = items.slice(page * perPage, page * perPage + perPage);

  return (
    <>
      <div className="tcards" key={page} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {visible.map((x, i) => (
          <div className="tcard" key={i}>
            <div className="q">{x.quote}</div>
            <div className="who">
              <div><b>{x.name}</b><span>{x.role}</span></div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="tnav">
          <button type="button" className="tarrow" aria-label="Previous" onClick={() => go(-1)}>‹</button>
          <div className="tdots">
            {Array.from({length: totalPages}).map((_, i) => (
              <button
                type="button"
                key={i}
                className={`tdot${i === page ? ' on' : ''}`}
                aria-label={`Page ${i + 1}`}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
          <button type="button" className="tarrow" aria-label="Next" onClick={() => go(1)}>›</button>
        </div>
      )}
    </>
  );
}
