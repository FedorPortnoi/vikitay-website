import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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

const FloatingOrb = ({ size, x, y, delay, duration, color }) => (
  <div style={{
    position: 'absolute', width: size, height: size, left: `${x}%`, top: `${y}%`,
    background: color, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.5,
    animation: `floatOrb ${duration}s ease-in-out infinite`, animationDelay: `${delay}s`, pointerEvents: 'none'
  }} />
);

export default function ServicePage({ service }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToContact = () => {
    navigate('/#contact');
  };

  return (
    <div className="vikitay-service">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .vikitay-service { font-family: 'Jost', sans-serif; font-weight: 300; background: #0d0d0f; color: #fff; overflow-x: hidden; min-height: 100vh; }
        @keyframes floatOrb { 0%, 100% { transform: translate(0, 0) scale(1); } 25% { transform: translate(30px, -30px) scale(1.1); } 50% { transform: translate(-20px, 20px) scale(0.9); } 75% { transform: translate(20px, 30px) scale(1.05); } }

        .bg-graphite { position: relative; background: linear-gradient(180deg, #0a0a0c 0%, #121215 50%, #0a0a0c 100%); }
        .bg-purple { position: relative; background: linear-gradient(180deg, #1a0a2e 0%, #2d1452 20%, #3d1a6d 50%, #2d1452 80%, #1a0a2e 100%); }

        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 24px 0; transition: all 0.4s ease; }
        .nav.scrolled { background: rgba(10, 10, 12, 0.95); backdrop-filter: blur(20px); padding: 16px 0; border-bottom: 1px solid rgba(139, 92, 246, 0.1); }
        .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .logo-icon { width: 42px; height: 42px; background: linear-gradient(135deg, #7c3aed, #a855f7); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 400; font-size: 18px; color: #fff; }
        .logo-text { font-size: 20px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; background: linear-gradient(135deg, #c4b5fd, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .nav-links { display: flex; align-items: center; gap: 44px; }
        .nav-link { font-size: 13px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: rgba(255, 255, 255, 0.6); text-decoration: none; transition: all 0.3s; }
        .nav-link:hover { color: #c4b5fd; }
        .nav-btn { font-size: 12px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; padding: 12px 28px; background: linear-gradient(135deg, #7c3aed, #9333ea); border: none; border-radius: 100px; color: #fff; cursor: pointer; transition: all 0.3s; text-decoration: none; }
        .nav-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px -8px rgba(139, 92, 246, 0.5); }

        .service-hero { min-height: 60vh; display: flex; align-items: flex-end; padding: 0 0 80px 0; position: relative; overflow: hidden; }
        .service-hero-bg { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
        .service-hero-bg img { width: 100%; height: 100%; object-fit: cover; }
        .service-hero-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(26, 10, 46, 0.1) 0%, rgba(13, 13, 15, 0.4) 50%, rgba(13, 13, 15, 1) 100%); }
        .service-hero-content { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; padding: 0 48px; width: 100%; }
        .service-hero-title { font-size: clamp(32px, 5vw, 56px); font-weight: 200; line-height: 1.2; margin-bottom: 16px; letter-spacing: -0.5px; color: #fff; }
        .service-hero-title span { background: linear-gradient(135deg, #c4b5fd, #a78bfa, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .section { padding: 100px 48px; position: relative; }
        .section-inner { max-width: 1000px; margin: 0 auto; position: relative; z-index: 2; }
        .section-label { font-size: 11px; font-weight: 400; letter-spacing: 5px; text-transform: uppercase; color: #a78bfa; margin-bottom: 24px; }
        .section-title { font-size: clamp(28px, 4vw, 40px); font-weight: 200; line-height: 1.3; margin-bottom: 20px; letter-spacing: -0.5px; color: #fff; }
        .section-title span { background: linear-gradient(135deg, #c4b5fd, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .section-desc { font-size: 17px; font-weight: 300; line-height: 1.9; color: rgba(255, 255, 255, 0.65); letter-spacing: 0.3px; }

        .service-desc-block { background: linear-gradient(145deg, rgba(139, 92, 246, 0.08), rgba(167, 139, 250, 0.02)); border: 1px solid rgba(139, 92, 246, 0.12); border-radius: 20px; padding: 44px; backdrop-filter: blur(10px); }
        .service-desc-text { font-size: 18px; font-weight: 300; line-height: 1.9; color: rgba(255, 255, 255, 0.75); letter-spacing: 0.3px; }

        .list-block { margin-top: 60px; }
        .list-title { font-size: 22px; font-weight: 300; margin-bottom: 28px; color: #c4b5fd; letter-spacing: 0.3px; }
        .list-items { display: flex; flex-direction: column; gap: 16px; }
        .list-item { display: flex; align-items: flex-start; gap: 16px; font-size: 16px; font-weight: 300; line-height: 1.7; color: rgba(255, 255, 255, 0.7); letter-spacing: 0.2px; }
        .list-dot { width: 8px; height: 8px; min-width: 8px; background: linear-gradient(135deg, #7c3aed, #a855f7); border-radius: 50%; margin-top: 8px; }

        .algorithm-block { margin-top: 80px; }
        .algorithm-steps { display: flex; flex-direction: column; gap: 24px; margin-top: 36px; }
        .algorithm-step { display: flex; gap: 24px; background: linear-gradient(145deg, rgba(139, 92, 246, 0.06), rgba(167, 139, 250, 0.02)); border: 1px solid rgba(139, 92, 246, 0.1); border-radius: 16px; padding: 28px; transition: all 0.3s; }
        .algorithm-step:hover { background: linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.04)); border-color: rgba(139, 92, 246, 0.2); }
        .algorithm-num { width: 48px; height: 48px; min-width: 48px; background: linear-gradient(135deg, #7c3aed, #9333ea); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 400; color: #fff; box-shadow: 0 8px 20px -8px rgba(139, 92, 246, 0.5); }
        .algorithm-text { font-size: 16px; font-weight: 300; line-height: 1.7; color: rgba(255, 255, 255, 0.7); padding-top: 10px; letter-spacing: 0.2px; }

        .cta-block { margin-top: 80px; text-align: center; background: linear-gradient(145deg, rgba(139, 92, 246, 0.12), rgba(167, 139, 250, 0.04)); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 24px; padding: 56px 44px; }
        .cta-title { font-size: 28px; font-weight: 200; margin-bottom: 16px; color: #fff; }
        .cta-subtitle { font-size: 16px; font-weight: 300; color: rgba(255, 255, 255, 0.6); margin-bottom: 32px; }
        .cta-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { font-size: 13px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; padding: 16px 40px; background: linear-gradient(135deg, #7c3aed, #9333ea); border: none; border-radius: 100px; color: #fff; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none; display: inline-block; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 40px -10px rgba(139, 92, 246, 0.5); }
        .btn-secondary { font-size: 13px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; padding: 16px 40px; background: transparent; border: 1px solid rgba(167, 139, 250, 0.3); border-radius: 100px; color: #c4b5fd; cursor: pointer; transition: all 0.4s; text-decoration: none; display: inline-block; }
        .btn-secondary:hover { background: rgba(167, 139, 250, 0.1); border-color: rgba(167, 139, 250, 0.5); }

        .footer { padding: 70px 48px; border-top: 1px solid rgba(139, 92, 246, 0.1); }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; position: relative; z-index: 2; }
        .footer-about p { font-size: 14px; font-weight: 300; line-height: 1.8; color: rgba(255, 255, 255, 0.4); margin-top: 20px; max-width: 300px; letter-spacing: 0.2px; }
        .footer-title { font-size: 11px; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; color: #a78bfa; margin-bottom: 24px; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 12px; }
        .footer-links a { font-size: 14px; font-weight: 300; color: rgba(255, 255, 255, 0.5); text-decoration: none; transition: color 0.3s; letter-spacing: 0.2px; display: flex; align-items: center; gap: 8px; }
        .footer-links a:hover { color: #c4b5fd; }
        .footer-bottom { max-width: 1200px; margin: 50px auto 0; padding: 0 48px; padding-top: 30px; border-top: 1px solid rgba(139, 92, 246, 0.08); display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 300; color: rgba(255, 255, 255, 0.35); letter-spacing: 0.3px; position: relative; z-index: 2; }
        .footer-legal { display: flex; gap: 28px; }
        .footer-legal a { color: rgba(255, 255, 255, 0.35); text-decoration: none; transition: color 0.3s; }
        .footer-legal a:hover { color: #c4b5fd; }
        .social-icon { width: 20px; height: 20px; fill: currentColor; }

        .mobile-menu-btn { display: none; background: none; border: none; color: #c4b5fd; cursor: pointer; }
        .mobile-menu { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(10, 10, 12, 0.98); z-index: 99; padding: 120px 48px; }
        .mobile-menu.open { display: flex; flex-direction: column; gap: 24px; }
        .mobile-menu a { font-size: 18px; font-weight: 300; color: rgba(255, 255, 255, 0.8); text-decoration: none; letter-spacing: 1px; }

        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .mobile-menu-btn { display: block; }
          .footer-inner { grid-template-columns: 1fr; gap: 36px; }
        }
        @media (max-width: 640px) {
          .section { padding: 60px 24px; }
          .service-hero { min-height: 50vh; padding-bottom: 60px; }
          .service-hero-content { padding: 0 24px; }
          .service-desc-block { padding: 28px; }
          .algorithm-step { flex-direction: column; gap: 16px; }
          .cta-block { padding: 36px 24px; }
          .cta-buttons { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; text-align: center; }
          .nav-inner { padding: 0 24px; }
          .footer { padding: 50px 24px; }
          .footer-bottom { padding: 30px 24px 0; flex-direction: column; gap: 16px; text-align: center; }
        }
      `}</style>

      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="logo">
            <div className="logo-icon">V</div>
            <span className="logo-text">VIKITAY</span>
          </Link>
          <div className="nav-links">
            <Link to="/#about" className="nav-link">О нас</Link>
            <Link to="/#services" className="nav-link">Услуги</Link>
            <Link to="/#cases" className="nav-link">Кейсы</Link>
            <Link to="/#contact" className="nav-link">Контакты</Link>
            <Link to="/#contact" className="nav-btn">Консультация</Link>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" /> : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
        <Link to="/#about" onClick={() => setMenuOpen(false)}>О нас</Link>
        <Link to="/#services" onClick={() => setMenuOpen(false)}>Услуги</Link>
        <Link to="/#cases" onClick={() => setMenuOpen(false)}>Кейсы</Link>
        <Link to="/#contact" onClick={() => setMenuOpen(false)}>Контакты</Link>
      </div>

      <section className="service-hero">
        <div className="service-hero-bg">
          <img src={service.image} alt={service.title} loading="lazy" />
        </div>
        <div className="service-hero-overlay" />
        <FloatingOrb size={350} x={15} y={25} delay={0} duration={25} color="rgba(139, 92, 246, 0.15)" />
        <FloatingOrb size={250} x={80} y={60} delay={5} duration={20} color="rgba(167, 139, 250, 0.1)" />
        <div className="service-hero-content">
          <Reveal>
            <h1 className="service-hero-title">{service.title}</h1>
          </Reveal>
        </div>
      </section>

      <section className="section bg-graphite">
        <FloatingOrb size={300} x={75} y={30} delay={0} duration={26} color="rgba(139, 92, 246, 0.1)" />
        <div className="section-inner">
          <Reveal>
            <div className="service-desc-block">
              <p className="service-desc-text">{service.shortDesc}</p>
            </div>
          </Reveal>

          <div className="list-block">
            <Reveal>
              <h2 className="list-title">Для кого</h2>
            </Reveal>
            <div className="list-items">
              {service.forWhom.map((item, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="list-item">
                    <span className="list-dot" />
                    <span>{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="list-block">
            <Reveal>
              <h2 className="list-title">Что будет в результате</h2>
            </Reveal>
            <div className="list-items">
              {service.results.map((item, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="list-item">
                    <span className="list-dot" />
                    <span>{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="algorithm-block">
            <Reveal>
              <h2 className="section-title">Алгоритм: <span>как будет проходить</span></h2>
            </Reveal>
            <div className="algorithm-steps">
              {service.algorithm.map((step, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="algorithm-step">
                    <div className="algorithm-num">{i + 1}</div>
                    <p className="algorithm-text">{step}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="cta-block">
              <h3 className="cta-title">Готовы начать?</h3>
              <p className="cta-subtitle">Оставьте заявку — обсудим ваш проект и подберём оптимальное решение</p>
              <div className="cta-buttons">
                <Link to="/#contact" className="btn-primary">Оставить заявку</Link>
                <Link to="/#services" className="btn-secondary">Назад к услугам</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="footer bg-graphite">
        <div className="footer-inner">
          <div className="footer-about">
            <Link to="/" className="logo">
              <div className="logo-icon">V</div>
              <span className="logo-text">VIKITAY GROUP</span>
            </Link>
            <p>Стратегический партнёр по бизнесу с Китаем. Мы управляем сложным, чтобы вы спокойно росли.</p>
          </div>
          <div>
            <h4 className="footer-title">Услуги</h4>
            <ul className="footer-links">
              <li><Link to="/services/consultation">Консультация</Link></li>
              <li><Link to="/services/strategy">Стратегическая сессия</Link></li>
              <li><Link to="/services/stm">СТМ под ключ</Link></li>
              <li><Link to="/services/procurement">Закуп и поставка</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Контакты</h4>
            <ul className="footer-links">
              <li>
                <a href="tel:+79180859298">
                  +7 (918) 085-92-98
                </a>
              </li>
              <li>
                <a href="https://vk.ru/club235149585" target="_blank" rel="noopener noreferrer">
                  <svg className="social-icon" viewBox="0 0 24 24"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.684 4 8.245c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.27 4.675 2.862 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>
                  ВКонтакте
                </a>
              </li>
              <li>
                <a href="https://t.me/vikitaygroup" target="_blank" rel="noopener noreferrer">
                  <svg className="social-icon" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 VIKITAY GROUP. Все права защищены.</span>
          <div className="footer-legal">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
