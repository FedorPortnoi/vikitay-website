import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const casesData = {
  broshi: {
    title: 'Броши Tiger & Pearl Adorn',
    images: [
      '/images/case-broshi-1.jpg',
      '/images/case-broshi-2.jpg',
    ],
  },
  zhemchug: {
    title: 'Born of the Sea — The Poetry of Pearl',
    images: [
      '/images/case-zhemchug-1.jpg',
      '/images/case-zhemchug-2.jpg',
      '/images/case-zhemchug-3.jpg',
      '/images/case-zhemchug-4.jpg',
      '/images/case-zhemchug-5.jpg',
      '/images/case-zhemchug-6.jpg',
      '/images/case-zhemchug-7.jpg',
      '/images/case-zhemchug-8.jpg',
      '/images/case-zhemchug-9.jpg',
    ],
  },
  klassika: {
    title: 'Buckle Suede / Ремни & Замша',
    images: [
      '/images/case-klassika-1.jpg',
      '/images/case-klassika-2.jpg',
      '/images/case-klassika-3.jpg',
      '/images/case-klassika-4.jpg',
      '/images/case-klassika-5.jpg',
    ],
  },
  stil: {
    title: 'Furry Chic — Коллекция уютных сумок',
    images: [
      '/images/case-stil-1.jpg',
      '/images/case-stil-2.jpg',
      '/images/case-stil-3.jpg',
      '/images/case-stil-4.jpg',
      '/images/case-stil-5.jpg',
      '/images/case-stil-6.jpg',
      '/images/case-stil-7.jpg',
      '/images/case-stil-8.jpg',
      '/images/case-stil-9.jpg',
    ],
  },
  retail: {
    title: 'Elevate Collection — Ритейл кейс',
    images: [
      '/images/case-retail-1.jpg',
      '/images/case-retail-2.jpg',
      '/images/case-retail-3.jpg',
      '/images/case-retail-4.jpg',
      '/images/case-retail-5.jpg',
    ],
  },
};

export default function CasePage({ caseId }) {
  const data = casesData[caseId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return <div style={{ color: '#fff', padding: '100px', textAlign: 'center' }}>Кейс не найден</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        .case-page-nav { display: flex; align-items: center; justify-content: space-between; padding: 24px 48px; position: relative; z-index: 10; }
        .case-page-nav a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.3s; }
        .case-page-nav a:hover { color: #c4b5fd; }
        .case-page-header { text-align: center; padding: 40px 48px 60px; }
        .case-page-title { font-size: clamp(28px, 4vw, 48px); font-weight: 700; letter-spacing: -1px; margin: 0; }
        .case-page-title span { color: #a78bfa; }
        .case-gallery { max-width: 900px; margin: 0 auto; padding: 0 24px 80px; display: flex; flex-direction: column; gap: 24px; }
        .case-gallery img { width: 100%; height: auto; border-radius: 16px; display: block; box-shadow: 0 8px 30px rgba(0,0,0,0.3); }
      `}</style>

      <nav className="case-page-nav">
        <Link to="/">
          <img src="/images/logo.png" alt="VIKITAY" style={{ height: '48px' }} />
        </Link>
        <Link to="/#cases">← Назад к кейсам</Link>
      </nav>

      <header className="case-page-header">
        <h1 className="case-page-title">{data.title}</h1>
      </header>

      <div className="case-gallery">
        {data.images.map((img, i) => (
          <img key={i} src={img} alt={`${data.title} — ${i + 1}`} loading="lazy" />
        ))}
      </div>
    </div>
  );
}