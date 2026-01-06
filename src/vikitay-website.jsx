import React, { useState, useEffect, useRef } from 'react';

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isInView];
};

const Counter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, isInView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
    }}>{children}</div>
  );
};

const CherryBranch = ({ style, flip = false, light = false }) => (
  <svg viewBox="0 0 300 400" style={{ ...style, transform: flip ? 'scaleX(-1)' : 'none', opacity: light ? 0.3 : 0.5 }}>
    <g fill="none" stroke={light ? "#a78bfa" : "#c4b5fd"} strokeWidth="2">
      <path d="M150 400 Q140 300 100 250 Q60 200 80 150 Q100 100 70 50" />
      <path d="M100 250 Q130 230 120 200" />
      <path d="M80 150 Q110 140 100 110" />
      <path d="M80 150 Q50 130 60 100" />
      <path d="M70 50 Q90 40 80 10" />
      <path d="M70 50 Q50 60 40 40" />
    </g>
    <g fill={light ? "#a78bfa" : "#c4b5fd"}>
      <circle cx="120" cy="200" r="8" opacity="0.7" />
      <circle cx="100" cy="110" r="6" opacity="0.6" />
      <circle cx="60" cy="100" r="7" opacity="0.7" />
      <circle cx="80" cy="10" r="5" opacity="0.5" />
      <circle cx="40" cy="40" r="6" opacity="0.6" />
    </g>
  </svg>
);

const FloatingOrb = ({ size, x, y, delay, duration, color }) => (
  <div style={{
    position: 'absolute', width: size, height: size, left: `${x}%`, top: `${y}%`,
    background: color, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.5,
    animation: `floatOrb ${duration}s ease-in-out infinite`, animationDelay: `${delay}s`, pointerEvents: 'none'
  }} />
);

export default function VikitayWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onMouseMove = (e) => setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouseMove);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMouseMove); };
  }, []);

  const services = [
    { title: 'Бизнес из Китая под ключ', desc: 'Полный цикл: от идеи до первой прибыли. Стратегия, продукт, бренд, поставки.' },
    { title: 'Консультация', desc: 'Разбор вашей ситуации с экспертом. Ясность за 60 минут.' },
    { title: 'Стратегическая сессия', desc: 'Глубокая проработка бизнес-модели и плана действий.' },
    { title: 'Разработка СТМ', desc: 'Создаём ваш бренд: от концепции до готового продукта.' },
    { title: 'Услуга байера', desc: 'Найдём фабрики, договоримся о ценах, проверим качество.' },
    { title: 'Закуп и поставка', desc: 'Белая логистика, контроль качества, документы.' }
  ];

  const niches = ['Кожгалантерея', 'Ювелирные украшения', 'Интерьерные решения', 'Строительные материалы', 'Каркасные дома', 'Медицинская техника', 'Умные гаджеты', 'Солнечные батареи'];

  const steps = [
    { n: '01', title: 'Идея', text: 'Анализируем рынок и находим вашу нишу' },
    { n: '02', title: 'Стратегия', text: 'Строим бизнес-модель и план действий' },
    { n: '03', title: 'Фабрики', text: 'Находим производителей, получаем образцы' },
    { n: '04', title: 'Бренд', text: 'Создаём упаковку и фирменный стиль' },
    { n: '05', title: 'Производство', text: 'Контролируем качество на каждом этапе' },
    { n: '06', title: 'Запуск', text: 'Доставляем и запускаем продажи' }
  ];

  return (
    <div className="vikitay">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .vikitay { font-family: 'Jost', sans-serif; font-weight: 300; background: #0d0d0f; color: #fff; overflow-x: hidden; min-height: 100vh; }
        @keyframes floatOrb { 0%, 100% { transform: translate(0, 0) scale(1); } 25% { transform: translate(30px, -30px) scale(1.1); } 50% { transform: translate(-20px, 20px) scale(0.9); } 75% { transform: translate(20px, 30px) scale(1.05); } }

        .bg-graphite { position: relative; background: linear-gradient(180deg, #0a0a0c 0%, #121215 50%, #0a0a0c 100%); }

        .bg-purple { position: relative; background: linear-gradient(180deg, #1a0a2e 0%, #2d1452 20%, #3d1a6d 50%, #2d1452 80%, #1a0a2e 100%); box-shadow: inset 0 50px 100px -50px rgba(139, 92, 246, 0.15), inset 0 -50px 100px -50px rgba(139, 92, 246, 0.1); }

        .mouse-glow { position: fixed; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%); pointer-events: none; z-index: 1; transition: left 0.3s ease-out, top 0.3s ease-out; transform: translate(-50%, -50%); }

        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 24px 0; transition: all 0.4s ease; }
        .nav.scrolled { background: rgba(10, 10, 12, 0.95); backdrop-filter: blur(20px); padding: 16px 0; border-bottom: 1px solid rgba(139, 92, 246, 0.1); }
        .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo-icon { width: 42px; height: 42px; background: linear-gradient(135deg, #7c3aed, #a855f7); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 400; font-size: 18px; color: #fff; }
        .logo-text { font-size: 20px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; background: linear-gradient(135deg, #c4b5fd, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .nav-links { display: flex; align-items: center; gap: 44px; }
        .nav-link { font-size: 13px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: rgba(255, 255, 255, 0.6); text-decoration: none; transition: all 0.3s; }
        .nav-link:hover { color: #c4b5fd; }
        .nav-btn { font-size: 12px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; padding: 12px 28px; background: linear-gradient(135deg, #7c3aed, #9333ea); border: none; border-radius: 100px; color: #fff; cursor: pointer; transition: all 0.3s; }
        .nav-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px -8px rgba(139, 92, 246, 0.5); }

        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 140px 48px; position: relative; overflow: hidden; }
        .hero-content { position: relative; z-index: 2; max-width: 850px; }
        .hero-label { font-size: 12px; font-weight: 400; letter-spacing: 5px; text-transform: uppercase; color: #a78bfa; margin-bottom: 32px; }
        .hero-title { font-size: clamp(42px, 6vw, 72px); font-weight: 200; line-height: 1.15; margin-bottom: 32px; letter-spacing: -1px; color: #fff; }
        .hero-title span { background: linear-gradient(135deg, #c4b5fd, #a78bfa, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 17px; font-weight: 300; line-height: 1.9; color: rgba(255, 255, 255, 0.55); max-width: 560px; margin: 0 auto 48px; letter-spacing: 0.3px; }
        .hero-btns { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { font-size: 13px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; padding: 16px 40px; background: linear-gradient(135deg, #7c3aed, #9333ea); border: none; border-radius: 100px; color: #fff; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 40px -10px rgba(139, 92, 246, 0.5); }
        .btn-secondary { font-size: 13px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; padding: 16px 40px; background: transparent; border: 1px solid rgba(167, 139, 250, 0.3); border-radius: 100px; color: #c4b5fd; cursor: pointer; transition: all 0.4s; }
        .btn-secondary:hover { background: rgba(167, 139, 250, 0.1); border-color: rgba(167, 139, 250, 0.5); }

        .section { padding: 120px 48px; position: relative; }
        .section-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
        .section-center { text-align: center; max-width: 750px; margin: 0 auto; }
        .section-label { font-size: 11px; font-weight: 400; letter-spacing: 5px; text-transform: uppercase; color: #a78bfa; margin-bottom: 24px; }
        .section-title { font-size: clamp(32px, 4.5vw, 48px); font-weight: 200; line-height: 1.25; margin-bottom: 20px; letter-spacing: -0.5px; color: #fff; }
        .section-title span { background: linear-gradient(135deg, #c4b5fd, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .section-desc { font-size: 16px; font-weight: 300; line-height: 1.9; color: rgba(255, 255, 255, 0.5); letter-spacing: 0.3px; }

        .stats { padding: 100px 48px; }
        .stats-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; text-align: center; position: relative; z-index: 2; }
        .stat-value { font-size: 48px; font-weight: 200; margin-bottom: 8px; letter-spacing: -1px; background: linear-gradient(135deg, #e9d5ff, #c4b5fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stat-label { font-size: 11px; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; color: rgba(255, 255, 255, 0.45); }

        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-text p { font-size: 16px; font-weight: 300; line-height: 2; color: rgba(255, 255, 255, 0.6); margin-bottom: 20px; letter-spacing: 0.3px; }
        .about-text .highlight { color: #c4b5fd; font-weight: 400; }
        .pillars { background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.03)); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 20px; padding: 44px; backdrop-filter: blur(10px); }
        .pillars-title { font-size: 20px; font-weight: 300; margin-bottom: 36px; background: linear-gradient(135deg, #c4b5fd, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 0.5px; }
        .pillar { display: flex; gap: 20px; margin-bottom: 28px; }
        .pillar:last-child { margin-bottom: 0; }
        .pillar-num { width: 44px; height: 44px; background: linear-gradient(135deg, #7c3aed, #9333ea); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 400; color: #fff; flex-shrink: 0; box-shadow: 0 8px 20px -8px rgba(139, 92, 246, 0.5); }
        .pillar-text { font-size: 15px; font-weight: 300; line-height: 1.7; color: rgba(255, 255, 255, 0.7); padding-top: 10px; letter-spacing: 0.3px; }

        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 70px; }
        .service-card { background: linear-gradient(145deg, rgba(139, 92, 246, 0.08), rgba(167, 139, 250, 0.02)); border: 1px solid rgba(139, 92, 246, 0.12); border-radius: 16px; padding: 36px 28px; text-align: center; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); backdrop-filter: blur(10px); }
        .service-card:hover { transform: translateY(-6px); background: linear-gradient(145deg, rgba(139, 92, 246, 0.15), rgba(167, 139, 250, 0.05)); border-color: rgba(139, 92, 246, 0.25); box-shadow: 0 25px 50px -15px rgba(139, 92, 246, 0.25); }
        .service-icon { width: 56px; height: 56px; margin: 0 auto 20px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(167, 139, 250, 0.1)); border: 1px solid rgba(167, 139, 250, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .service-icon span { font-size: 20px; color: #c4b5fd; }
        .service-title { font-size: 17px; font-weight: 400; margin-bottom: 12px; letter-spacing: 0.3px; color: #fff; }
        .service-desc { font-size: 14px; font-weight: 300; line-height: 1.7; color: rgba(255, 255, 255, 0.5); letter-spacing: 0.2px; }

        .niches-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 70px; }
        .niche-card { background: rgba(139, 92, 246, 0.06); border: 1px solid rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 28px 20px; text-align: center; transition: all 0.4s; }
        .niche-card:hover { background: rgba(139, 92, 246, 0.12); border-color: rgba(139, 92, 246, 0.2); transform: translateY(-4px); box-shadow: 0 12px 30px -10px rgba(139, 92, 246, 0.2); }
        .niche-name { font-size: 14px; font-weight: 300; color: rgba(255, 255, 255, 0.8); letter-spacing: 0.3px; }

        .process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 70px; }
        .process-card { background: linear-gradient(145deg, rgba(139, 92, 246, 0.06), rgba(167, 139, 250, 0.02)); border: 1px solid rgba(139, 92, 246, 0.1); border-radius: 16px; padding: 36px; position: relative; transition: all 0.4s; backdrop-filter: blur(10px); }
        .process-card:hover { background: linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.04)); border-color: rgba(139, 92, 246, 0.2); transform: translateY(-4px); }
        .process-num { font-size: 52px; font-weight: 200; background: linear-gradient(135deg, rgba(196, 181, 253, 0.15), rgba(167, 139, 250, 0.05)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; margin-bottom: 12px; }
        .process-title { font-size: 18px; font-weight: 400; margin-bottom: 10px; color: #c4b5fd; letter-spacing: 0.3px; }
        .process-text { font-size: 14px; font-weight: 300; line-height: 1.7; color: rgba(255, 255, 255, 0.5); letter-spacing: 0.2px; }

        .bloggers-card { background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(167, 139, 250, 0.02)); border: 1px solid rgba(139, 92, 246, 0.12); border-radius: 24px; padding: 70px; display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center; backdrop-filter: blur(10px); }
        .bloggers-list { background: rgba(10, 10, 12, 0.6); border: 1px solid rgba(139, 92, 246, 0.1); border-radius: 16px; padding: 36px; }
        .bloggers-list-title { font-size: 16px; font-weight: 400; margin-bottom: 28px; color: #c4b5fd; letter-spacing: 0.3px; }
        .bloggers-list-item { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; font-size: 15px; font-weight: 300; color: rgba(255, 255, 255, 0.65); letter-spacing: 0.2px; }
        .bloggers-list-item:last-child { margin-bottom: 0; }
        .bloggers-list-dot { width: 6px; height: 6px; background: #a78bfa; border-radius: 50%; }

        .cta-section { text-align: center; padding: 140px 48px; }
        .cta-form { max-width: 580px; margin: 56px auto 0; background: linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.03)); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 20px; padding: 44px; text-align: left; backdrop-filter: blur(10px); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 11px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; color: rgba(255, 255, 255, 0.4); margin-bottom: 10px; }
        .form-input { width: 100%; padding: 14px 18px; background: rgba(139, 92, 246, 0.06); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 10px; color: #fff; font-family: 'Jost', sans-serif; font-size: 15px; font-weight: 300; letter-spacing: 0.3px; transition: all 0.3s; }
        .form-input:focus { outline: none; border-color: rgba(167, 139, 250, 0.4); background: rgba(139, 92, 246, 0.1); }
        .form-input::placeholder { color: rgba(255, 255, 255, 0.25); }
        .form-textarea { min-height: 100px; resize: none; }
        .form-radio-group { display: flex; gap: 24px; }
        .form-radio { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; font-weight: 300; color: rgba(255, 255, 255, 0.6); }
        .form-radio input { accent-color: #a78bfa; width: 16px; height: 16px; }
        .form-submit { width: 100%; padding: 16px; background: linear-gradient(135deg, #7c3aed, #9333ea); border: none; border-radius: 10px; color: #fff; font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.4s; margin-top: 8px; }
        .form-submit:hover { transform: translateY(-2px); box-shadow: 0 12px 30px -8px rgba(139, 92, 246, 0.5); }

        .footer { padding: 70px 48px; border-top: 1px solid rgba(139, 92, 246, 0.1); }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; position: relative; z-index: 2; }
        .footer-about p { font-size: 14px; font-weight: 300; line-height: 1.8; color: rgba(255, 255, 255, 0.4); margin-top: 20px; max-width: 300px; letter-spacing: 0.2px; }
        .footer-title { font-size: 11px; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; color: #a78bfa; margin-bottom: 24px; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 12px; }
        .footer-links a { font-size: 14px; font-weight: 300; color: rgba(255, 255, 255, 0.5); text-decoration: none; transition: color 0.3s; letter-spacing: 0.2px; }
        .footer-links a:hover { color: #c4b5fd; }
        .footer-bottom { max-width: 1200px; margin: 50px auto 0; padding-top: 30px; border-top: 1px solid rgba(139, 92, 246, 0.08); display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 300; color: rgba(255, 255, 255, 0.35); letter-spacing: 0.3px; position: relative; z-index: 2; }
        .footer-legal { display: flex; gap: 28px; }
        .footer-legal a { color: rgba(255, 255, 255, 0.35); text-decoration: none; transition: color 0.3s; }
        .footer-legal a:hover { color: #c4b5fd; }

        .mobile-menu-btn { display: none; background: none; border: none; color: #c4b5fd; cursor: pointer; }
        .mobile-menu { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(10, 10, 12, 0.98); z-index: 99; padding: 120px 48px; }
        .mobile-menu.open { display: flex; flex-direction: column; gap: 24px; }
        .mobile-menu a { font-size: 18px; font-weight: 300; color: rgba(255, 255, 255, 0.8); text-decoration: none; letter-spacing: 1px; }

        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .mobile-menu-btn { display: block; }
          .about-grid { grid-template-columns: 1fr; gap: 50px; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .niches-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .bloggers-card { grid-template-columns: 1fr; padding: 44px; }
          .footer-inner { grid-template-columns: 1fr; gap: 36px; }
        }
        @media (max-width: 640px) {
          .section { padding: 80px 24px; }
          .stats { padding: 70px 24px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
          .services-grid { grid-template-columns: 1fr; }
          .niches-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .process-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .hero { padding: 120px 24px; }
          .hero-btns { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; text-align: center; }
          .nav-inner { padding: 0 24px; }
          .footer { padding: 50px 24px; }
          .cta-section { padding: 80px 24px; }
          .cta-form { padding: 32px; }
          .bloggers-card { padding: 32px; gap: 36px; }
        }
      `}</style>

      <div className="mouse-glow" style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }} />

      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="logo">
            <div className="logo-icon">V</div>
            <span className="logo-text">VIKITAY</span>
          </div>
          <div className="nav-links">
            <a href="#about" className="nav-link">О нас</a>
            <a href="#services" className="nav-link">Услуги</a>
            <a href="#process" className="nav-link">Процесс</a>
            <a href="#contact" className="nav-link">Контакты</a>
            <button className="nav-btn">Консультация</button>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" /> : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#about" onClick={() => setMenuOpen(false)}>О нас</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Услуги</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>Процесс</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Контакты</a>
      </div>

      <section className="hero bg-graphite">
        <CherryBranch style={{ position: 'absolute', right: '5%', top: '10%', width: '180px' }} light />
        <CherryBranch style={{ position: 'absolute', left: '3%', bottom: '15%', width: '150px' }} flip light />
        <FloatingOrb size={350} x={15} y={25} delay={0} duration={25} color="rgba(139, 92, 246, 0.15)" />
        <FloatingOrb size={250} x={80} y={60} delay={5} duration={20} color="rgba(167, 139, 250, 0.1)" />
        <div className="hero-content">
          <Reveal><p className="hero-label">Стратегический партнёр по бизнесу с Китаем</p></Reveal>
          <Reveal delay={0.1}><h1 className="hero-title">Китай — не лотерея.<br /><span>Это система.</span></h1></Reveal>
          <Reveal delay={0.2}><p className="hero-subtitle">Мы строим её для вас. От идеи и СТМ до первой поставки и системы продаж. Для тех, кто хочет продавать дороже и спать спокойнее.</p></Reveal>
          <Reveal delay={0.3}><div className="hero-btns"><button className="btn-primary">Запросить консультацию</button><button className="btn-secondary">Получить структуру работы</button></div></Reveal>
        </div>
      </section>

      <section className="stats bg-purple">
        <CherryBranch style={{ position: 'absolute', right: '2%', top: '0', width: '160px' }} />
        <FloatingOrb size={400} x={10} y={40} delay={2} duration={28} color="rgba(196, 181, 253, 0.1)" />
        <div className="stats-grid">
          <Reveal delay={0}><div className="stat-value"><Counter end={20} suffix="+" /></div><div className="stat-label">Лет опыта</div></Reveal>
          <Reveal delay={0.1}><div className="stat-value"><Counter end={500} suffix="+" /></div><div className="stat-label">Успешных проектов</div></Reveal>
          <Reveal delay={0.2}><div className="stat-value"><Counter end={15} /></div><div className="stat-label">Ниш экспертизы</div></Reveal>
          <Reveal delay={0.3}><div className="stat-value"><Counter end={98} suffix="%" /></div><div className="stat-label">Довольных клиентов</div></Reveal>
        </div>
      </section>

      <section id="about" className="section bg-graphite">
        <CherryBranch style={{ position: 'absolute', left: '2%', top: '10%', width: '140px' }} flip light />
        <FloatingOrb size={300} x={75} y={30} delay={0} duration={26} color="rgba(139, 92, 246, 0.1)" />
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-text">
              <Reveal><p className="section-label">О компании</p></Reveal>
              <Reveal delay={0.1}><h2 className="section-title">Мы те, кто любит<br /><span>порядок в цифрах</span><br />и красоту в смыслах.</h2></Reveal>
              <Reveal delay={0.2}><p>«Викитай Групп» — это имя, в котором соединились Виктория и Китай. <span className="highlight">Виктория</span> — символ победы, лидерства и умения принимать решения. <span className="highlight">Китай</span> — территория возможностей, но и сложных правил.</p></Reveal>
              <Reveal delay={0.3}><p>Мы не продаём «поставки из Китая». Мы строим для клиента управляемый бизнес с Китаем под ключ.</p></Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="pillars">
                <h3 className="pillars-title">Три столба-опоры:</h3>
                <div className="pillar"><div className="pillar-num">1</div><p className="pillar-text">Мы думаем, как собственники, а не как экспедиторы.</p></div>
                <div className="pillar"><div className="pillar-num">2</div><p className="pillar-text">Мы собираем вам команду там, где у вас её нет.</p></div>
                <div className="pillar"><div className="pillar-num">3</div><p className="pillar-text">Мы играем в долгую.</p></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="services" className="section bg-purple">
        <CherryBranch style={{ position: 'absolute', right: '3%', bottom: '10%', width: '170px' }} />
        <FloatingOrb size={350} x={20} y={50} delay={3} duration={24} color="rgba(196, 181, 253, 0.08)" />
        <div className="section-inner">
          <div className="section-center">
            <Reveal><p className="section-label">Услуги</p></Reveal>
            <Reveal delay={0.1}><h2 className="section-title">Не разовые услуги.<br /><span>Системное партнёрство.</span></h2></Reveal>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="service-card">
                  <div className="service-icon"><span>✦</span></div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-graphite">
        <CherryBranch style={{ position: 'absolute', right: '5%', top: '5%', width: '150px' }} light />
        <FloatingOrb size={280} x={15} y={40} delay={4} duration={22} color="rgba(139, 92, 246, 0.08)" />
        <div className="section-inner">
          <div className="section-center">
            <Reveal><p className="section-label">Товарная специализация</p></Reveal>
            <Reveal delay={0.1}><h2 className="section-title">Не берём всё подряд.<br /><span>Берём то, в чём сильны.</span></h2></Reveal>
          </div>
          <div className="niches-grid">
            {niches.map((n, i) => (<Reveal key={i} delay={i * 0.05}><div className="niche-card"><span className="niche-name">{n}</span></div></Reveal>))}
          </div>
        </div>
      </section>

      <section id="process" className="section bg-purple">
        <CherryBranch style={{ position: 'absolute', left: '2%', top: '8%', width: '160px' }} flip />
        <FloatingOrb size={320} x={80} y={35} delay={2} duration={26} color="rgba(196, 181, 253, 0.07)" />
        <div className="section-inner">
          <div className="section-center">
            <Reveal><p className="section-label">Как мы работаем</p></Reveal>
            <Reveal delay={0.1}><h2 className="section-title">От идеи до<br /><span>первой прибыли</span></h2></Reveal>
          </div>
          <div className="process-grid">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="process-card">
                  <div className="process-num">{s.n}</div>
                  <h3 className="process-title">{s.title}</h3>
                  <p className="process-text">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-graphite">
        <CherryBranch style={{ position: 'absolute', right: '3%', bottom: '10%', width: '140px' }} light />
        <FloatingOrb size={280} x={85} y={50} delay={1} duration={24} color="rgba(139, 92, 246, 0.1)" />
        <div className="section-inner">
          <Reveal>
            <div className="bloggers-card">
              <div>
                <p className="section-label">Для блогеров и личных брендов</p>
                <h2 className="section-title" style={{ marginTop: '20px' }}>Ваши сторис уже продают.<br /><span>Пора, чтобы продавали ваш продукт.</span></h2>
                <p className="section-desc" style={{ marginTop: '20px', marginBottom: '36px' }}>Коллекции, лимитированные дропы, премиальный мерч — создаём продукт под вашу аудиторию. От идеи до готового товара и запуска.</p>
                <button className="btn-primary">Обсудить проект</button>
              </div>
              <div className="bloggers-list">
                <h4 className="bloggers-list-title">Что снимаем с вас:</h4>
                {['Поиск и работа с фабриками', 'Контроль качества', 'Брендирование и упаковка', 'Логистика и растаможка', 'Документация'].map((item, i) => (
                  <div key={i} className="bloggers-list-item"><span className="bloggers-list-dot" /><span>{item}</span></div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="cta-section bg-purple">
        <CherryBranch style={{ position: 'absolute', right: '5%', top: '10%', width: '180px' }} />
        <CherryBranch style={{ position: 'absolute', left: '3%', bottom: '15%', width: '150px' }} flip />
        <FloatingOrb size={400} x={50} y={40} delay={0} duration={28} color="rgba(196, 181, 253, 0.08)" />
        <div className="section-inner">
          <Reveal><h2 className="section-title">Хотите бизнес с Китаем,<br /><span>который не стыдно показывать?</span></h2></Reveal>
          <Reveal delay={0.1}><p className="section-desc">Оставьте заявку — обсудим ваш проект и найдём лучшее решение.</p></Reveal>
          <Reveal delay={0.2}>
            <form className="cta-form">
              <div className="form-row">
                <div><label className="form-label">Имя</label><input type="text" className="form-input" placeholder="Как вас зовут?" /></div>
                <div><label className="form-label">Телефон</label><input type="tel" className="form-input" placeholder="+7 (___) ___-__-__" /></div>
              </div>
              <div className="form-group">
                <label className="form-label">Мессенджер</label>
                <div className="form-radio-group">
                  <label className="form-radio"><input type="radio" name="messenger" defaultChecked /><span>WhatsApp</span></label>
                  <label className="form-radio"><input type="radio" name="messenger" /><span>Telegram</span></label>
                </div>
              </div>
              <div className="form-group"><label className="form-label">Расскажите о задаче</label><textarea className="form-input form-textarea" placeholder="Что хотите создать или импортировать из Китая?" /></div>
              <button type="submit" className="form-submit">Записаться на консультацию</button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="footer bg-graphite">
        <div className="footer-inner">
          <div className="footer-about">
            <div className="logo"><div className="logo-icon">V</div><span className="logo-text">VIKITAY GROUP</span></div>
            <p>Стратегический партнёр по бизнесу с Китаем. Мы управляем сложным, чтобы вы спокойно росли.</p>
          </div>
          <div>
            <h4 className="footer-title">Услуги</h4>
            <ul className="footer-links">
              <li><a href="#">Бизнес под ключ</a></li>
              <li><a href="#">Консультации</a></li>
              <li><a href="#">СТМ</a></li>
              <li><a href="#">Логистика</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Контакты</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@vikitay.ru">info@vikitay.ru</a></li>
              <li><a href="#">+7 (XXX) XXX-XX-XX</a></li>
              <li><a href="#">WhatsApp / Telegram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 VIKITAY GROUP. Все права защищены.</span>
          <div className="footer-legal"><a href="#">Политика конфиденциальности</a><a href="#">Оферта</a></div>
        </div>
      </footer>
    </div>
  );
}
