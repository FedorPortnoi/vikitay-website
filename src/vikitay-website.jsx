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

// Horizontal scroll section hook
export default function VikitayWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [formData, setFormData] = useState({ name: '', phone: '', messenger: 'whatsapp', message: '' });
  const [consent, setConsent] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackData, setCallbackData] = useState({ name: '', phone: '' });
  const [callbackSent, setCallbackSent] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [questionData, setQuestionData] = useState({ name: '', phone: '', question: '' });
  const [questionSent, setQuestionSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onMouseMove = (e) => setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouseMove);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMouseMove); };
  }, []);   

  const handleSubmit = (e) => {
    e.preventDefault();
    window.emailjs.send('service_4jkn3fn', 'template_neucvsp', {
      name: formData.name,
      phone: formData.phone,
      messenger: formData.messenger,
      message: formData.message
    }, 'hqNSYN-AUE3HIaBI6').then(() => {
      setFormSent(true);
      setFormData({ name: '', phone: '', messenger: 'whatsapp', message: '' });
      setConsent(false);
      setTimeout(() => setFormSent(false), 3000);
    }).catch(() => alert('Ошибка, попробуйте ещё раз'));
  };

  const handleCallback = (e) => {
    e.preventDefault();
    window.emailjs.send('service_4jkn3fn', 'template_neucvsp', {
      name: callbackData.name,
      phone: callbackData.phone,
      messenger: 'Обратный звонок',
      message: 'Запрос обратного звонка'
    }, 'hqNSYN-AUE3HIaBI6').then(() => {
      setCallbackSent(true);
      setTimeout(() => { setCallbackOpen(false); setCallbackSent(false); setCallbackData({ name: '', phone: '' }); }, 2000);
    }).catch(() => alert('Ошибка, попробуйте ещё раз'));
  };

  const handleQuestion = (e) => {
    e.preventDefault();
    window.emailjs.send('service_4jkn3fn', 'template_neucvsp', {
      name: questionData.name,
      phone: questionData.phone,
      messenger: 'Задать вопрос',
      message: questionData.question
    }, 'hqNSYN-AUE3HIaBI6').then(() => {
      setQuestionSent(true);
      setTimeout(() => { setQuestionOpen(false); setQuestionSent(false); setQuestionData({ name: '', phone: '', question: '' }); }, 2000);
    }).catch(() => alert('Ошибка, попробуйте ещё раз'));
  };

  const services = [
    {
      title: 'Консультация «Лёгкий старт с Китаем»',
      desc: 'Точечная консультация 60–90 минут, где мы разбираем вашу ситуацию с Китаем и собираем понятную картинку: что запускать, с какими бюджетами и рисками.',
      image: '/images/service-consult.png',
      link: '/services/consultation'
    },
    {
      title: 'Стратегическая сессия',
      desc: 'Глубокая 3–4-часовая работа, где мы разбираем ваш бизнес, продукт и цифры, чтобы понять, какую роль должен играть Китай.',
      image: '/images/service-strategy.png',
      link: '/services/strategy'
    },
    {
      title: 'Разработка и упаковка СТМ под ключ',
      desc: 'Создание собственной торговой марки, которая не выглядит как «ещё один ноунейм из Китая». От идеи до готового ТЗ для фабрик.',
      image: '/images/service-stm.png',
      link: '/services/stm'
    },
    {
      title: 'Разработка продуктовой линейки',
      desc: 'Превращаем «хочется всего по чуть-чуть» в осмысленную продуктовую линейку и ассортиментную матрицу.',
      image: '/images/service-lineyika.png',
      link: '/services/product-line'
    },
    {
      title: 'Услуга байера',
      desc: 'Ваши глаза и мозг в Китае. Ищем фабрики, ведём переговоры, сравниваем предложения и отбираем реальных партнёров.',
      image: '/images/service-bayer.png',
      link: '/services/buyer'
    },
    {
      title: 'Закуп и поставка товара',
      desc: 'Полный цикл: выкуп, консолидация, проверка, брендирование и доставка товара из Китая с документами.',
      image: '/images/service-zakup.png',
      link: '/services/procurement'
    },
    {
      title: 'Бизнес-тур в Китай',
      desc: 'Организованная поездка в Гуанчжоу на 5 дней: фабрики, шоу-румы, образцы, обучение и сопровождение.',
      image: '/images/service-tour.png',
      link: '/services/business-tour'
    }
  ];

  const niches = [
    { name: 'Кожгалантерея и сумки', image: '/images/niche-leather.png' },
    { name: 'Ювелирные украшения', image: '/images/niche-jewelry.png' },
    { name: 'Интерьерные решения', image: '/images/niche-interior.png' },
    { name: 'Строительные материалы', image: '/images/niche-construction.png' }
  ];

  const steps = [
    { n: '01', title: 'Идея', text: 'Анализируем рынок и находим вашу нишу' },
    { n: '02', title: 'Стратегия', text: 'Строим бизнес-модель и план действий' },
    { n: '03', title: 'Фабрики', text: 'Находим производителей, получаем образцы' },
    { n: '04', title: 'Бренд', text: 'Создаём упаковку и фирменный стиль' },
    { n: '05', title: 'Производство', text: 'Контролируем качество на каждом этапе' },
    { n: '06', title: 'Запуск', text: 'Доставляем и запускаем продажи' }
  ];

  const whyUsReasons = [
    {
      num: '01',
      title: 'Эксперты, а не «смотрели вебинар про Китай»',
      text: 'Мы не учились Китаю по YouTube. Годы живой работы с фабриками, логистами, СТМ и запуском брендов — вот наш «диплом». Поэтому говорим с вами не мантрами про «дешёвый Китай», а языком маржи, рисков и сроков.'
    },
    {
      num: '02',
      title: 'Бесшовный сервис от А до Я',
      text: 'Обычно путь в Китай — это квест: один про стратегию, другой про дизайн, третий про поставку, четвёртый «у меня свой китаец». У VIKITAY всё просто: одна команда отвечает за маршрут целиком — от идеи и бренда до товара на складе.'
    },
    {
      num: '03',
      title: 'Относимся к вашему бизнесу как к своему',
      text: 'Мы не «оказали услугу и исчезли». Разбираемся в модели, считаем цифры, задаём неудобные вопросы и предлагаем рабочие решения. Если что-то пошло не так — мы не ищем крайних, мы ищем, как спасти партию.'
    },
    {
      num: '04',
      title: 'Честность и прозрачность на каждом шаге',
      text: 'Понятные условия, открытая калькуляция, реальные сроки и риски без приукрашивания. Мы не обещаем невозможного, но всегда чётко объясняем, как именно и за счёт чего вы заработаете.'
    },
    {
      num: '05',
      title: 'Нестандартные задачи — наша нормальная среда',
      text: 'Сложный товар, премиальная упаковка, нетипичный бренд, сжатые сроки или прошлый «обжиг» на Китае — это не повод паниковать, это типичный входящий для VIKITAY. Мы умеем решать сложные кейсы.'
    }
  ];

  const cases = [
    { id: 1, title: 'Скоро', desc: 'Здесь появится кейс' },
    { id: 2, title: 'Скоро', desc: 'Здесь появится кейс' },
    { id: 3, title: 'Скоро', desc: 'Здесь появится кейс' }
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
        .logo { display: flex; align-items: center; gap: 0; text-decoration: none; }
        .logo img { height: 64px; width: auto; display: block; }
        .nav-links { display: flex; align-items: center; gap: 44px; }
        .nav-link { font-size: 13px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: rgba(255, 255, 255, 0.6); text-decoration: none; transition: all 0.3s; }
        .nav-link:hover { color: #c4b5fd; }
        .nav-dropdown { position: relative; }
        .nav-dropdown-trigger { font-size: 13px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: rgba(255, 255, 255, 0.6); cursor: pointer; transition: all 0.3s; background: none; border: none; font-family: 'Jost', sans-serif; display: flex; align-items: center; gap: 6px; }
        .nav-dropdown-trigger:hover { color: #c4b5fd; }
        .nav-dropdown-menu { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); min-width: 280px; background: rgba(13, 13, 15, 0.97); backdrop-filter: blur(20px); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 12px; padding: 12px 0; margin-top: 16px; opacity: 0; visibility: hidden; transition: all 0.3s ease; pointer-events: none; z-index: 200; }
        .nav-dropdown:hover .nav-dropdown-menu { opacity: 1; visibility: visible; pointer-events: auto; }
        .nav-dropdown-menu::before { content: ''; position: absolute; top: -16px; left: 0; right: 0; height: 16px; }
        .nav-dropdown-menu a { display: block; padding: 10px 24px; font-size: 14px; font-weight: 400; color: rgba(255, 255, 255, 0.6); text-decoration: none; transition: all 0.2s; letter-spacing: 0.3px; }
        .nav-dropdown-menu a:hover { color: #c4b5fd; background: rgba(139, 92, 246, 0.08); }
        .nav-btn { font-size: 12px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; padding: 12px 28px; background: linear-gradient(135deg, #7c3aed, #9333ea); border: none; border-radius: 100px; color: #fff; cursor: pointer; transition: all 0.3s; text-decoration: none; }
        .nav-phone { display: flex; align-items: center; gap: 12px; text-decoration: none; transition: all 0.3s; }
        .nav-phone:hover { opacity: 0.8; }
        .nav-phone-info { display: flex; flex-direction: column; align-items: flex-end; }
        .nav-phone-status { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.4); display: flex; align-items: center; gap: 6px; }
        .nav-phone-dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; display: inline-block; }
        .nav-phone-number { font-size: 14px; font-weight: 500; color: #fff; letter-spacing: 0.5px; }
        .nav-phone-icon { width: 36px; height: 36px; background: linear-gradient(135deg, #7c3aed, #9333ea); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; }

        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 140px 48px; position: relative; overflow: hidden; margin: 0 40px 20px; border-radius: 24px; }
        .hero-bg { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 0; overflow: hidden; }
        .hero-bg video { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(13, 13, 15, 0.7) 0%, rgba(13, 13, 15, 0.65) 50%, rgba(13, 13, 15, 0.9) 90%, rgba(13, 13, 15, 1) 100%); z-index: 1; }
        .hero-content { position: relative; z-index: 2; max-width: 850px; }
        .hero-label { font-size: 12px; font-weight: 400; letter-spacing: 5px; text-transform: uppercase; color: #a78bfa; margin-bottom: 32px; }
        .hero-title { font-size: clamp(40px, 5.5vw, 72px); font-weight: 700; line-height: 1.15; margin-bottom: 28px; letter-spacing: -1.5px; color: #fff; }
        .hero-title span { color: #fff; -webkit-text-fill-color: #fff; background: none; }
        .hero-subtitle { font-size: 17px; font-weight: 300; line-height: 1.7; color: #fff; max-width: 600px; margin: 0 auto 48px; letter-spacing: 0.2px; }
        .hero-btns { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { font-size: 13px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; padding: 18px 44px; background: linear-gradient(135deg, #7c3aed, #9333ea); border: none; border-radius: 100px; color: #fff; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none; display: inline-block; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 40px -10px rgba(139, 92, 246, 0.5); }
        .btn-secondary { font-size: 13px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; padding: 18px 44px; background: transparent; border: 1px solid rgba(167, 139, 250, 0.3); border-radius: 100px; color: #c4b5fd; cursor: pointer; transition: all 0.4s; text-decoration: none; display: inline-block; }
        .btn-secondary:hover { background: rgba(167, 139, 250, 0.1); border-color: rgba(167, 139, 250, 0.5); }

        .section { padding: 140px 48px; position: relative; margin: 0 40px 20px; border-radius: 24px; overflow: hidden; }
        .section-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
        .section-center { text-align: center; max-width: 750px; margin: 0 auto; }
        .section-label { font-size: 14px; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; color: #a78bfa; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        .section-label::before { content: ''; width: 10px; height: 10px; background: #a78bfa; border-radius: 50%; display: inline-block; }
        .section-center .section-label { justify-content: center; }
        .section-title { font-size: clamp(36px, 4.5vw, 52px); font-weight: 700; line-height: 1.2; margin-bottom: 24px; letter-spacing: -1px; color: #fff; }
        .section-title span { background: linear-gradient(135deg, #c4b5fd, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; }
        .section-desc { font-size: 16px; font-weight: 300; line-height: 1.8; color: rgba(255, 255, 255, 0.55); letter-spacing: 0.2px; }

        .stats { padding: 120px 48px; margin: 0 40px 20px; border-radius: 24px; overflow: hidden; }
        .stats-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; text-align: left; position: relative; z-index: 2; }
        .stat-item { padding: 32px 28px; border-right: 1px solid rgba(139, 92, 246, 0.12); }
        .stat-item:last-child { border-right: none; }
        .stat-value { font-size: 64px; font-weight: 700; margin-bottom: 12px; letter-spacing: -2px; color: #fff; }
        .stat-label { font-size: 14px; font-weight: 400; letter-spacing: 0.3px; color: rgba(255, 255, 255, 0.45); line-height: 1.5; }

        /* Why Us Horizontal Scroll */
        /* Why Us — Vertical List Layout (nero-design style) */
        .why-us-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; margin-bottom: 60px; }
        .why-us-header-left { }
        .why-us-subtitle { font-size: 20px; font-weight: 400; line-height: 1.7; color: rgba(255, 255, 255, 0.75); padding-top: 44px; }
        .why-us-list { border-top: 1px solid rgba(139, 92, 246, 0.15); }
        .why-us-item { display: grid; grid-template-columns: auto 280px 1fr auto; gap: 32px; align-items: center; padding: 36px 0; border-bottom: 1px solid rgba(139, 92, 246, 0.15); transition: background 0.3s; }
        .why-us-item:hover { background: rgba(139, 92, 246, 0.03); margin: 0 -20px; padding-left: 20px; padding-right: 20px; }
        .why-us-icon { width: 48px; height: 48px; background: linear-gradient(135deg, #7c3aed, #a855f7); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .why-us-icon span { font-size: 18px; color: #fff; }
        .why-us-title { font-size: 15px; font-weight: 600; color: #fff; line-height: 1.5; }
        .why-us-text { font-size: 14px; font-weight: 400; line-height: 1.7; color: rgba(255, 255, 255, 0.5); }
        .why-us-num { font-size: 36px; font-weight: 500; color: rgba(167, 139, 250, 0.7); line-height: 1; min-width: 40px; text-align: right; }

        /* About Section with Founders */
        .about-intro { text-align: center; max-width: 800px; margin: 0 auto 70px; }
        .about-intro p { font-size: 16px; font-weight: 400; line-height: 1.8; color: rgba(255, 255, 255, 0.6); }
        .founders-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 50px; }
        .founder-card { background: rgba(255, 255, 255, 0.03); border-radius: 16px; overflow: hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .founder-card:hover { transform: translateY(-6px); box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.3); }
        .founder-photo { position: relative; aspect-ratio: 4/5; overflow: hidden; }
        .founder-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .founder-card:hover .founder-photo img { transform: scale(1.03); }
        .founder-tag { position: absolute; top: 16px; left: 16px; background: linear-gradient(135deg, #7c3aed, #9333ea); padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; letter-spacing: 0.5px; color: #fff; }
        .founder-info { padding: 28px; }
        .founder-name { font-size: 22px; font-weight: 600; margin-bottom: 10px; color: #fff; }
        .founder-desc { font-size: 14px; font-weight: 400; line-height: 1.7; color: rgba(255, 255, 255, 0.5); }
        .about-outro { text-align: center; max-width: 800px; margin: 0 auto; }
        .about-outro p { font-size: 16px; font-weight: 400; line-height: 1.8; color: rgba(255, 255, 255, 0.55); }

        /* Niches with Images */
        .niches-intro { text-align: center; max-width: 700px; margin: 0 auto 16px; }
        .niches-intro p { font-size: 16px; font-weight: 400; line-height: 1.7; color: rgba(255, 255, 255, 0.5); }
        .niches-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 50px; margin-bottom: 50px; }
        .niche-card { background: transparent; border: none; border-radius: 0; overflow: hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer; }
        .niche-card:hover { transform: translateY(-6px); }
        .niche-card:hover .niche-image img { transform: scale(1.06); }
        .niche-image { aspect-ratio: 1/1; overflow: hidden; border-radius: 12px; }
        .niche-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .niche-name { padding: 16px 4px 0; text-align: left; font-size: 17px; font-weight: 600; color: #fff; letter-spacing: 0.2px; }
        .niches-outro { text-align: center; max-width: 800px; margin: 0 auto; }
        .niches-outro p { font-size: 15px; font-weight: 400; line-height: 1.7; color: rgba(255, 255, 255, 0.45); }

        /* Services with Images */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 1fr; gap: 24px; margin-top: 70px; }
        .services-grid > div { height: 100%; }
        .service-card { height: 100%; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(139, 92, 246, 0.1); border-radius: 16px; overflow: hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; }
        .service-card:hover { transform: translateY(-6px); border-color: rgba(139, 92, 246, 0.2); box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.3); }
        .service-image { aspect-ratio: 16/10; overflow: hidden; }
        .service-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .service-card:hover .service-image img { transform: scale(1.05); }
        .service-content { padding: 28px; display: flex; flex-direction: column; flex: 1; }
        .service-title { font-size: 17px; font-weight: 600; margin-bottom: 12px; letter-spacing: 0.2px; color: #fff; }
        .service-desc { font-size: 14px; font-weight: 400; line-height: 1.7; color: rgba(255, 255, 255, 0.45); letter-spacing: 0.2px; flex: 1; margin-bottom: 20px; }
        .service-btn { font-size: 12px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; padding: 12px 24px; background: transparent; border: 1px solid rgba(167, 139, 250, 0.25); border-radius: 100px; color: #c4b5fd; cursor: pointer; transition: all 0.3s; text-decoration: none; display: inline-block; text-align: center; }
        .service-btn:hover { background: rgba(167, 139, 250, 0.1); border-color: rgba(167, 139, 250, 0.5); }

        /* Process Steps */
        .process-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0; }
        .process-card { padding: 48px 32px; border: 1px solid rgba(139, 92, 246, 0.12); border-right: none; transition: all 0.3s; }
        .process-card:last-child { border-right: 1px solid rgba(139, 92, 246, 0.12); }
        .process-card:hover { background: rgba(139, 92, 246, 0.04); }
        .process-num { font-size: 96px; font-weight: 300; background: linear-gradient(180deg, rgba(139, 92, 246, 0.5), rgba(139, 92, 246, 0.1)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; margin-bottom: 28px; }
        .process-title { font-size: 17px; font-weight: 600; margin-bottom: 12px; color: #fff; }
        .process-text { font-size: 15px; font-weight: 400; line-height: 1.7; color: rgba(255, 255, 255, 0.5); }

        .bloggers-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(139, 92, 246, 0.1); border-radius: 20px; padding: 70px; display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center; }
        .bloggers-list { background: rgba(10, 10, 12, 0.6); border: 1px solid rgba(139, 92, 246, 0.08); border-radius: 16px; padding: 36px; }
        .bloggers-list-title { font-size: 16px; font-weight: 600; margin-bottom: 28px; color: #c4b5fd; letter-spacing: 0.2px; }
        .bloggers-list-item { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; font-size: 15px; font-weight: 400; color: rgba(255, 255, 255, 0.55); letter-spacing: 0.2px; }
        .bloggers-list-item:last-child { margin-bottom: 0; }
        .bloggers-list-dot { width: 6px; height: 6px; background: #a78bfa; border-radius: 50%; }

        /* Cases Section */
        .cases-intro { text-align: center; max-width: 800px; margin: 0 auto 50px; }
        .cases-intro p { font-size: 16px; font-weight: 400; line-height: 1.7; color: rgba(255, 255, 255, 0.5); margin-bottom: 16px; }
        .cases-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .case-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(139, 92, 246, 0.08); border-radius: 16px; padding: 40px; text-align: center; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .case-title { font-size: 20px; font-weight: 500; color: rgba(255, 255, 255, 0.4); margin-bottom: 8px; }
        .case-desc { font-size: 14px; font-weight: 400; color: rgba(255, 255, 255, 0.3); }

        .cta-section { text-align: center; padding: 140px 48px; margin: 0 40px 20px; border-radius: 24px; overflow: hidden; }
        .cta-form { max-width: 580px; margin: 56px auto 0; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(139, 92, 246, 0.1); border-radius: 16px; padding: 44px; text-align: left; }
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

        .footer { padding: 80px 48px; border-top: 1px solid rgba(139, 92, 246, 0.08); margin: 0 40px 40px; border-radius: 24px; overflow: hidden; }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; position: relative; z-index: 2; }
        .footer-about p { font-size: 14px; font-weight: 400; line-height: 1.7; color: rgba(255, 255, 255, 0.4); margin-top: 20px; max-width: 300px; letter-spacing: 0.2px; }
        .footer-title { font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #a78bfa; margin-bottom: 24px; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 12px; }
        .footer-links a { font-size: 14px; font-weight: 400; color: rgba(255, 255, 255, 0.45); text-decoration: none; transition: color 0.3s; letter-spacing: 0.2px; display: flex; align-items: center; gap: 8px; }
        .footer-links a:hover { color: #c4b5fd; }
        .footer-bottom { max-width: 1200px; margin: 50px auto 0; padding-top: 30px; border-top: 1px solid rgba(139, 92, 246, 0.08); display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 300; color: rgba(255, 255, 255, 0.35); letter-spacing: 0.3px; position: relative; z-index: 2; }
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
          .founders-grid { grid-template-columns: 1fr; max-width: 450px; margin-left: auto; margin-right: auto; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .niches-grid { grid-template-columns: repeat(2, 1fr); }
          .cases-grid { grid-template-columns: 1fr; }
          .bloggers-card { grid-template-columns: 1fr; padding: 44px; }
          .footer-inner { grid-template-columns: 1fr; gap: 36px; }
          .why-us-header { grid-template-columns: 1fr; gap: 24px; }
          .why-us-item { grid-template-columns: auto 1fr auto; gap: 20px; }
          .why-us-title { grid-column: 1 / -1; padding-left: 72px; margin-top: -44px; }
          .process-grid { grid-template-columns: repeat(3, 1fr); }
          .process-card:nth-child(3) { border-right: 1px solid rgba(139, 92, 246, 0.15); }
          .process-card { padding: 40px 28px; }
          .process-num { font-size: 72px; }
        }
        @media (max-width: 640px) {
          .section { padding: 80px 24px; margin: 0 12px 12px; border-radius: 16px; }
          .stats { padding: 70px 24px; margin: 0 12px 12px; border-radius: 16px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-value { font-size: 48px; }
          .services-grid { grid-template-columns: 1fr; }
          .niches-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .form-row { grid-template-columns: 1fr; }
          .hero { padding: 120px 24px; margin: 0 12px 12px; border-radius: 16px; }
          .hero-btns { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; text-align: center; }
          .nav-inner { padding: 0 24px; }
          .footer { padding: 50px 24px; margin: 0 12px 12px; border-radius: 16px; }
          .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
          .cta-section { padding: 80px 24px; margin: 0 12px 12px; border-radius: 16px; }
          .cta-form { padding: 32px; }
          .bloggers-card { padding: 32px; gap: 36px; }
          .why-us-item { grid-template-columns: 1fr; gap: 16px; padding: 24px 0; }
          .why-us-icon { display: none; }
          .why-us-title { padding-left: 0; margin-top: 0; }
          .why-us-num { font-size: 48px; position: absolute; right: 0; top: 24px; }
          .why-us-item { position: relative; }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .process-card:nth-child(2n) { border-right: 1px solid rgba(139, 92, 246, 0.15); }
          .process-card { border-right: none; padding: 32px 24px; }
          .process-num { font-size: 56px; }
        }
          .cta-banner { display: flex; align-items: center; gap: 60px; max-width: 1100px; margin: 0 auto; padding: 60px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 24px; }
        .cta-banner-img { width: 320px; height: 400px; border-radius: 16px; object-fit: cover; flex-shrink: 0; }
        .cta-banner-content { flex: 1; }
        .cta-banner-title { font-size: clamp(32px, 4vw, 48px); font-weight: 700; color: #fff; margin-bottom: 16px; line-height: 1.15; }
        .cta-banner-text { font-size: 16px; color: rgba(255, 255, 255, 0.6); margin-bottom: 36px; line-height: 1.6; }
        .cta-banner-btns { display: flex; gap: 16px; flex-wrap: wrap; }
        .cta-banner-btn { padding: 14px 32px; border-radius: 10px; font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 400; letter-spacing: 1px; text-decoration: none; transition: all 0.3s; cursor: pointer; }
        .cta-banner-btn-primary { background: linear-gradient(135deg, #7c3aed, #9333ea); color: #fff; border: none; }
        .cta-banner-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px -8px rgba(139, 92, 246, 0.5); }
        .cta-banner-btn-secondary { background: transparent; color: #c4b5fd; border: 1px solid rgba(139, 92, 246, 0.3); }
        .cta-banner-btn-secondary:hover { border-color: #7c3aed; background: rgba(139, 92, 246, 0.1); }
        @media (max-width: 768px) {
          .cta-banner { flex-direction: column; padding: 32px; gap: 32px; text-align: center; }
          .cta-banner-img { width: 100%; max-width: 300px; height: 350px; }
          .cta-banner-btns { justify-content: center; }
        }
      .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s ease; }
        .modal-box { background: #1a1a2e; border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 20px; padding: 48px; max-width: 440px; width: 90%; position: relative; animation: fadeInUp 0.4s ease; }
        .modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: rgba(255,255,255,0.5); font-size: 24px; cursor: pointer; transition: color 0.3s; }
        .modal-close:hover { color: #fff; }
        .modal-title { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 8px; text-align: center; }
        .modal-subtitle { font-size: 14px; color: rgba(255,255,255,0.5); text-align: center; margin-bottom: 32px; }
        .modal-input { width: 100%; padding: 14px 18px; background: rgba(255,255,255,0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 10px; color: #fff; font-family: 'Jost', sans-serif; font-size: 15px; margin-bottom: 16px; outline: none; transition: border-color 0.3s; box-sizing: border-box; }
        .modal-input:focus { border-color: #7c3aed; }
        .modal-input::placeholder { color: rgba(255,255,255,0.3); }
        .modal-submit { width: 100%; padding: 16px; background: linear-gradient(135deg, #7c3aed, #9333ea); border: none; border-radius: 10px; color: #fff; font-family: 'Jost', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.3s; letter-spacing: 1px; }
        .modal-submit:hover { transform: translateY(-2px); box-shadow: 0 12px 30px -8px rgba(139, 92, 246, 0.5); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mouse-glow" style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }} />

      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="logo">
            <img src="/images/final2-1.png" alt="VIKITAY" />
          </Link>
          <div className="nav-links">
            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">О нас</button>
              <div className="nav-dropdown-menu">
                <a href="#about">Команда</a>
              </div>
            </div>
            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">Услуги</button>
              <div className="nav-dropdown-menu">
                <Link to="/services/consultation">Консультация «Лёгкий старт»</Link>
                <Link to="/services/strategy">Стратегическая сессия</Link>
                <Link to="/services/stm">Разработка и упаковка СТМ</Link>
                <Link to="/services/product-line">Продуктовая линейка</Link>
                <Link to="/services/buyer">Услуга байера</Link>
                <Link to="/services/procurement">Закуп и поставка товара</Link>
                <Link to="/services/business-tour">Бизнес-тур в Китай</Link>
              </div>
            </div>
            <a href="#cases" className="nav-link">Кейсы</a>
            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">Контакты</button>
              <div className="nav-dropdown-menu">
                <a href="https://wa.me/79180859298" target="_blank" rel="noopener noreferrer"><span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>WhatsApp / Телефон</span><br/>+7 (918) 085-92-98</a>
                <a href="mailto:vikitay.group@gmail.com">vikitay.group@gmail.com</a>
                <a href="https://t.me/vikitaygroup" target="_blank" rel="noopener noreferrer">Telegram</a>
                <a href="https://vk.ru/club235149585" target="_blank" rel="noopener noreferrer">ВКонтакте</a>
              </div>
            </div>
            <a href="#contact" className="nav-btn">Консультация</a>
            <a href="tel:+79180859298" className="nav-phone">
              <div className="nav-phone-info">
                <span className="nav-phone-status">мы онлайн <span className="nav-phone-dot" /></span>
                <span className="nav-phone-number">+7 918 085-92-98</span>
              </div>
              <span className="nav-phone-icon">📞</span>
            </a>
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
        <a href="#cases" onClick={() => setMenuOpen(false)}>Кейсы</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Контакты</a>
      </div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg">
          <video autoPlay muted loop playsInline src="/images/hero-video.mp4" />
        </div>
        <div className="hero-overlay" />
        <FloatingOrb size={250} x={80} y={60} delay={5} duration={20} color="rgba(167, 139, 250, 0.1)" />
        <div className="hero-content">
          <Reveal><h1 className="hero-title">Бизнес с Китаем «под ключ» —<br /><span>от идеи до регулярных поставок.</span></h1></Reveal>
          <Reveal delay={0.1}><p className="hero-subtitle">Vikitay Group – стратегический партнер по работе с Китаем</p></Reveal>
          <Reveal delay={0.2}><div className="hero-btns"><a href="#contact" className="btn-primary">Получить консультацию</a></div></Reveal>
        </div>
      </section>



      {/* WHY US SECTION */}
      <section className="section bg-graphite">
        <CherryBranch style={{ position: 'absolute', left: '2%', top: '10%', width: '140px' }} flip light />
        <FloatingOrb size={300} x={80} y={20} delay={0} duration={26} color="rgba(139, 92, 246, 0.1)" />
        <div className="section-inner">
          <div className="why-us-header">
            <div className="why-us-header-left">
              <Reveal><p className="section-label">Преимущества</p></Reveal>
              <Reveal delay={0.1}><h2 className="section-title">5 причин, почему<br /><span>с нами комфортнее</span></h2></Reveal>
            </div>
            <Reveal delay={0.2}><p className="why-us-subtitle">Наши преимущества — не просто слова. Это то, что гарантирует ваш комфорт, душевное спокойствие и отличный результат:</p></Reveal>
          </div>
          <div className="why-us-list">
            {whyUsReasons.map((reason, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="why-us-item">
                  <div className="why-us-icon"><span>✦</span></div>
                  <h3 className="why-us-title">{reason.title}</h3>
                  <p className="why-us-text">{reason.text}</p>
                  <div className="why-us-num">{reason.num}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section bg-purple">
        <CherryBranch style={{ position: 'absolute', right: '3%', top: '5%', width: '150px' }} />
        <FloatingOrb size={350} x={15} y={50} delay={1} duration={24} color="rgba(196, 181, 253, 0.08)" />
        <div className="section-inner">
          <div className="section-center">
            <Reveal><p className="section-label">О компании</p></Reveal>
            <Reveal delay={0.1}><h2 className="section-title">Мы строим для вас<br /><span>управляемый бизнес с Китаем</span></h2></Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="about-intro">
              <p>VIKITAY GROUP — это не стартап «на энтузиазме», а команда, собранная из многолетнего опыта по обе стороны границы. Мы не продаём «поставки из Китая». Мы строим для клиента управляемый бизнес с Китаем под ключ.</p>
            </div>
          </Reveal>
          <div className="founders-grid">
            <Reveal delay={0.3}>
              <div className="founder-card">
                <div className="founder-photo">
                  <span className="founder-tag">Основатель</span>
                  <img src="/images/founder-victoria.png" alt="Виктория Бондарева" loading="lazy" />
                </div>
                <div className="founder-info">
                  <h3 className="founder-name">Виктория Бондарева</h3>
                  <p className="founder-desc">Про Китай и операционку. За плечами несколько лет работы с фабриками, логистикой, бизнес-турами, выстраиванием производственных цепочек «от запроса до склада в России».</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="founder-card">
                <div className="founder-photo">
                  <span className="founder-tag">Основатель</span>
                  <img src="/images/mama.png" alt="Светлана Акстинас" loading="lazy" />
                </div>
                <div className="founder-info">
                  <h3 className="founder-name">Светлана Акстинас</h3>
                  <p className="founder-desc">Про стратегию, маркетинг и упаковку бизнеса. 25-ти летний опыт в брендинге, СТМ, запуске продуктов и построении отделов продаж помогает смотреть на Китай как на полноценный успешный бизнес.</p>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.5}>
            <div className="about-outro">
              <p>Вместе мы собрали VIKITAY GROUP как сервис, где собственник получает не набор разрозненных услуг, а системное решение под ключ — от идеи и стратегии до готового продукта и стабильных поставок.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES SECTION */}
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
                  <div className="service-image">
                    <img src={s.image} alt={s.title} loading="lazy" />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">{s.title}</h3>
                    <p className="service-desc">{s.desc}</p>
                    <Link to={s.link} className="service-btn">Подробнее</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section bg-graphite">
        <div className="section-inner">
          <Reveal>
            <div className="cta-banner">
              <img src="/images/founder-svetlana.png" alt="Светлана Аксинас" className="cta-banner-img" />
              <div className="cta-banner-content">
                <h2 className="cta-banner-title">Давайте<br/>знакомиться!</h2>
                <p className="cta-banner-text">Проконсультируем, ответим на вопросы, поможем начать бизнес с Китаем.</p>
                <div className="cta-banner-btns">
                  <button onClick={() => setCallbackOpen(true)} className="cta-banner-btn cta-banner-btn-primary">Обратный звонок ↗</button>
                  <button onClick={() => setQuestionOpen(true)} className="cta-banner-btn cta-banner-btn-secondary">Задать вопрос</button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NICHES SECTION */}
      <section className="section bg-graphite">
        <CherryBranch style={{ position: 'absolute', right: '5%', top: '5%', width: '150px' }} light />
        <FloatingOrb size={280} x={15} y={40} delay={4} duration={22} color="rgba(139, 92, 246, 0.08)" />
        <div className="section-inner">
          <div className="section-center">
            <Reveal><p className="section-label">Товарная специализация</p></Reveal>
            <Reveal delay={0.1}><h2 className="section-title">Мы работаем там, где важны<br /><span>качество, дизайн и маржа</span></h2></Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="niches-intro">
              <p>VIKITAY GROUP специализируется на проектах среднего и высокого ценового сегмента и глубоко разбирается в категориях:</p>
            </div>
          </Reveal>
          <div className="niches-grid">
            {niches.map((n, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="niche-card">
                  <div className="niche-image">
                    <img src={n.image} alt={n.name} loading="lazy" />
                  </div>
                  <div className="niche-name">{n.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div className="niches-outro">
              <p>Мы можем проработать всё — от фурнитуры и мелких деталей до оборудования и целых домов, но сознательно не работаем с FMCG-сегментом и «массовым ширпотребом». Наша зона ответственности — товары и проекты, где ценят вкус, долговечность и сильный продукт, а не просто минимальную цену.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="section bg-graphite">
        <CherryBranch style={{ position: 'absolute', left: '2%', top: '8%', width: '160px' }} flip light />
        <FloatingOrb size={320} x={80} y={35} delay={2} duration={26} color="rgba(139, 92, 246, 0.07)" />
        <div className="section-inner">
          <div className="section-center">
            <Reveal><p className="section-label">Как мы работаем</p></Reveal>
            <Reveal delay={0.1}><h2 className="section-title">От идеи до<br /><span>первой прибыли</span></h2></Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="process-grid">
              {steps.map((s, i) => (
                <div key={i} className="process-card">
                  <div className="process-num">{s.n}</div>
                  <h3 className="process-title">{s.title}</h3>
                  <p className="process-text">{s.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOGGERS SECTION */}
      <section className="section bg-purple">
        <CherryBranch style={{ position: 'absolute', right: '3%', bottom: '10%', width: '140px' }} />
        <FloatingOrb size={280} x={85} y={50} delay={1} duration={24} color="rgba(196, 181, 253, 0.1)" />
        <div className="section-inner">
          <Reveal>
            <div className="bloggers-card">
              <div>
                <p className="section-label">Для блогеров и личных брендов</p>
                <h2 className="section-title" style={{ marginTop: '20px' }}>Ваши сторис уже продают.<br /><span>Пора, чтобы продавали ваш продукт.</span></h2>
                <p className="section-desc" style={{ marginTop: '20px', marginBottom: '36px' }}>Коллекции, лимитированные дропы, премиальный мерч — создаём продукт под вашу аудиторию. От идеи до готового товара и запуска.</p>
                <a href="#contact" className="btn-primary">Обсудить проект</a>
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

      {/* CASES SECTION */}
      <section id="cases" className="section bg-graphite">
        <CherryBranch style={{ position: 'absolute', left: '3%', top: '10%', width: '140px' }} flip light />
        <FloatingOrb size={300} x={75} y={30} delay={0} duration={26} color="rgba(139, 92, 246, 0.1)" />
        <div className="section-inner">
          <div className="section-center">
            <Reveal><p className="section-label">Кейсы</p></Reveal>
            <Reveal delay={0.1}><h2 className="section-title">Наши <span>решения</span></h2></Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="cases-intro">
              <p>Здесь мы показываем лишь часть проектов VIKITAY GROUP: решения, запуски, упаковка брендов. С многими клиентами у нас подписан NDA, поэтому самые интересные и сложные истории остаются «за кадром» — но опыт от них зашит в каждую новую задачу.</p>
              <p>Смотрите наши решения и примеряйте на свой бизнес: что из этого может сработать у вас уже сейчас?</p>
            </div>
          </Reveal>
          <div className="cases-grid">
            {cases.map((c, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="case-card">
                  <h3 className="case-title">{c.title}</h3>
                  <p className="case-desc">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="cta-section bg-purple">
        <CherryBranch style={{ position: 'absolute', right: '5%', top: '10%', width: '180px' }} />
        <CherryBranch style={{ position: 'absolute', left: '3%', bottom: '15%', width: '150px' }} flip />
        <FloatingOrb size={400} x={50} y={40} delay={0} duration={28} color="rgba(196, 181, 253, 0.08)" />
        <div className="section-inner">
          <Reveal><h2 className="section-title">Хотите бизнес с Китаем,<br /><span>который не стыдно показывать?</span></h2></Reveal>
          <Reveal delay={0.1}><p className="section-desc">Оставьте заявку — обсудим ваш проект и найдём лучшее решение.</p></Reveal>
          <Reveal delay={0.2}>
            {formSent ? (
              <div className="cta-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', animation: 'fadeInUp 0.8s ease' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px', animation: 'fadeInUp 0.6s ease' }}>✓</div>
                <h3 style={{ color: '#c4b5fd', fontSize: '24px', fontWeight: 500, marginBottom: '12px' }}>Заявка отправлена!</h3>
                <p style={{ color: 'rgba(196, 181, 253, 0.6)', fontSize: '15px' }}>Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
            <form className="cta-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label className="form-label">Имя</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Как вас зовут?"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Телефон</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Мессенджер</label>
                <div className="form-radio-group">
                  <label className="form-radio">
                    <input
                      type="radio"
                      name="messenger"
                      value="whatsapp"
                      checked={formData.messenger === 'whatsapp'}
                      onChange={(e) => setFormData({...formData, messenger: e.target.value})}
                    />
                    <span>WhatsApp</span>
                  </label>
                  <label className="form-radio">
                    <input
                      type="radio"
                      name="messenger"
                      value="telegram"
                      checked={formData.messenger === 'telegram'}
                      onChange={(e) => setFormData({...formData, messenger: e.target.value})}
                    />
                    <span>Telegram</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Расскажите о задаче</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Что хотите создать или импортировать из Китая?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', marginTop: '4px' }}>
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required style={{ marginTop: '2px', accentColor: '#7c3aed', width: '16px', height: '16px', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: 'rgba(196, 181, 253, 0.7)', lineHeight: '1.4' }}>
                  Я соглашаюсь на{' '}
                  <a href="#" style={{ color: '#c4b5fd', textDecoration: 'underline' }}>обработку персональных данных</a>
                </span>
              </label>
              <button type="submit" className="form-submit" disabled={!consent} style={!consent ? { opacity: 0.4, cursor: 'not-allowed' } : {}}>Записаться на консультацию</button>
            </form>
            )}
          </Reveal>
        </div>
      </section>
      {/* QUESTION MODAL */}
      {questionOpen && (
        <div className="modal-overlay" onClick={() => setQuestionOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setQuestionOpen(false)}>✕</button>
            {questionSent ? (
              <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeInUp 0.5s ease' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h3 style={{ color: '#c4b5fd', fontSize: '22px' }}>Вопрос отправлен!</h3>
              </div>
            ) : (
              <form onSubmit={handleQuestion}>
                <h3 className="modal-title">Задать вопрос</h3>
                <p className="modal-subtitle">Ответим в течении 30 минут</p>
                <input className="modal-input" type="text" placeholder="Ваше имя" required value={questionData.name} onChange={(e) => setQuestionData({...questionData, name: e.target.value})} />
                <input className="modal-input" type="tel" placeholder="+7 (___) ___-__-__" required value={questionData.phone} onChange={(e) => setQuestionData({...questionData, phone: e.target.value})} />
                <textarea className="modal-input" placeholder="Ваш вопрос" required value={questionData.question} onChange={(e) => setQuestionData({...questionData, question: e.target.value})} style={{ minHeight: '100px', resize: 'none' }} />
                <button type="submit" className="modal-submit">Отправить</button>
              </form>
            )}
          </div>
        </div>
      )}
      {/* CALLBACK MODAL */}
      {callbackOpen && (
        <div className="modal-overlay" onClick={() => setCallbackOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setCallbackOpen(false)}>✕</button>
            {callbackSent ? (
              <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeInUp 0.5s ease' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h3 style={{ color: '#c4b5fd', fontSize: '22px' }}>Заявка отправлена!</h3>
              </div>
            ) : (
              <form onSubmit={handleCallback}>
                <h3 className="modal-title">Обратный звонок</h3>
                <p className="modal-subtitle">Менеджер свяжется с вами в течении 30 минут</p>
                <input className="modal-input" type="tel" placeholder="+7 (___) ___-__-__" required value={callbackData.phone} onChange={(e) => setCallbackData({...callbackData, phone: e.target.value})} />
                <input className="modal-input" type="text" placeholder="Ваше имя" required value={callbackData.name} onChange={(e) => setCallbackData({...callbackData, name: e.target.value})} />
                <button type="submit" className="modal-submit">Отправить</button>
              </form>
            )}
          </div>
        </div>
      )}
      <footer className="footer bg-graphite">
        <div className="footer-inner">
          <div className="footer-about">
            <Link to="/" className="logo">
              <img src="/images/final2-1.png" alt="VIKITAY GROUP" style={{ height: '54px', width: 'auto' }} />
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
