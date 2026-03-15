import { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 1522;
const FRAME_URL = (i) =>
  `https://raw.githubusercontent.com/FedorPortnoi/expe/master/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`;

export default function CherryBlossomCanvas() {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES).fill(null));
  const loadedRef = useRef(new Set());
  const frameIndexRef = useRef(0);
  const rafRef = useRef(0);

  const drawFrame = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Background: cover + blur
    const coverScale = Math.max(cw / iw, ch / ih);
    const bw = iw * coverScale;
    const bh = ih * coverScale;
    const bx = (cw - bw) / 2;
    const by = (ch - bh) / 2;
    const pad = 40; // extra padding to hide blur edges
    ctx.save();
    ctx.filter = 'blur(20px)';
    ctx.drawImage(img, bx - pad, by - pad, bw + pad * 2, bh + pad * 2);
    ctx.restore();

    // Foreground: contain, centered, sharp
    const containScale = Math.min(cw / iw, ch / ih);
    const fw = iw * containScale;
    const fh = ih * containScale;
    const fx = (cw - fw) / 2;
    const fy = (ch - fh) / 2;
    ctx.drawImage(img, fx, fy, fw, fh);
  }, []);

  const renderCurrentFrame = useCallback(() => {
    const idx = frameIndexRef.current;
    let img = imagesRef.current[idx];
    if (img && img.complete && img.naturalWidth > 0) {
      drawFrame(img);
      return;
    }
    // Find nearest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const below = idx - offset;
      const above = idx + offset;
      if (below >= 0) {
        const b = imagesRef.current[below];
        if (b && b.complete && b.naturalWidth > 0) { drawFrame(b); return; }
      }
      if (above < TOTAL_FRAMES) {
        const a = imagesRef.current[above];
        if (a && a.complete && a.naturalWidth > 0) { drawFrame(a); return; }
      }
    }
  }, [drawFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load a single frame image
    const loadImage = (i) => {
      if (imagesRef.current[i]) return imagesRef.current[i];
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = FRAME_URL(i);
      imagesRef.current[i] = img;
      return img;
    };

    // Load first batch (frames 0–59) immediately
    const FIRST_BATCH = 60;
    for (let i = 0; i < FIRST_BATCH; i++) {
      const img = loadImage(i);
      if (i === 0) {
        img.onload = () => {
          loadedRef.current.add(0);
          renderCurrentFrame();
        };
      } else {
        img.onload = () => loadedRef.current.add(i);
      }
    }

    // Load remaining frames progressively in background
    let bgIndex = FIRST_BATCH;
    const BATCH_SIZE = 20;
    const loadNextBatch = () => {
      if (bgIndex >= TOTAL_FRAMES) return;
      const end = Math.min(bgIndex + BATCH_SIZE, TOTAL_FRAMES);
      for (let i = bgIndex; i < end; i++) {
        const img = loadImage(i);
        img.onload = () => loadedRef.current.add(i);
      }
      bgIndex = end;
      setTimeout(loadNextBatch, 100);
    };
    const bgTimer = setTimeout(loadNextBatch, 200);

    // Scroll handler
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      frameIndexRef.current = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(renderCurrentFrame);
    };

    // Resize handler
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderCurrentFrame();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(bgTimer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [renderCurrentFrame]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
