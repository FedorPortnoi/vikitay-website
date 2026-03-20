import { useEffect, useRef } from 'react';

export default function CherryBlossomCanvas() {
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const docHeightRef = useRef(0);
  const winHeightRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const recalc = () => {
      docHeightRef.current = document.documentElement.scrollHeight;
      winHeightRef.current = window.innerHeight;
    };
    recalc();

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!video.duration) return;
        const maxScroll = docHeightRef.current - winHeightRef.current;
        if (maxScroll <= 0) return;
        const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
        video.currentTime = progress * video.duration;
      });
    };

    const onResize = () => {
      recalc();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="/images/sakura-scroll.mp4"
      preload="auto"
      muted
      playsInline
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
