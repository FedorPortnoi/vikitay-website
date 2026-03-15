import { useState, useRef, useEffect, useCallback } from 'react';

function useInView(threshold = 0.15) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isInView];
}

const Reveal = ({ children, delay = 0 }) => {
  const [ref, isInView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    }}>
      {children}
    </div>
  );
};

export default function FactoryBlock({
  name,
  description,
  factoryPhotos = [],
  certificates = [],
  productPhotos = [],
  reverse = false,
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex < 0) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(-1);
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % certificates.length);
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + certificates.length) % certificates.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, certificates.length]);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = el.querySelector('[data-product-item]')?.offsetWidth || 300;
    el.scrollBy({ left: dir * itemWidth, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .factory-block-carousel {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 8px 0;
        }
        .factory-block-carousel::-webkit-scrollbar { display: none; }
        .factory-block-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 640px) {
          .factory-block-grid {
            grid-template-columns: 1fr;
          }
          .factory-block-section {
            padding: 80px 24px !important;
          }
        }
        .factory-block-carousel-item {
          flex: 0 0 calc(25% - 15px);
          scroll-snap-align: start;
          min-width: 0;
        }
        @media (max-width: 1024px) {
          .factory-block-carousel-item {
            flex: 0 0 calc(50% - 10px);
          }
        }
        @media (max-width: 640px) {
          .factory-block-carousel-item {
            flex: 0 0 100%;
          }
        }
      `}</style>

      <section className="factory-block-section" style={{
        padding: '120px 48px',
        background: '#0d0d0f',
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        color: '#fff',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <Reveal>
            <div style={{
              display: 'flex',
              flexDirection: reverse ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              gap: 60,
              flexWrap: 'wrap',
              marginBottom: 60,
            }}>
              <div style={{ flex: '1 1 340px', minWidth: 280 }}>
                <h2 style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 700,
                  margin: '0 0 20px',
                  letterSpacing: '0.3px',
                  lineHeight: 1.15,
                }}>
                  {name}
                </h2>
                <div style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.2px',
                }}>
                  {description}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Factory Photos Grid */}
          {factoryPhotos.length > 0 && (
            <Reveal delay={0.1}>
              <div
                className="factory-block-grid"
                style={{
                  marginBottom: certificates.length > 0 || productPhotos.length > 0 ? 48 : 0,
                }}
              >
                {factoryPhotos.map((src, i) => (
                  <div key={i} style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(139,92,246,0.1)',
                    aspectRatio: '4 / 3',
                  }}>
                    <img
                      src={src}
                      alt={`${name} — фото ${i + 1}`}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <Reveal delay={0.2}>
              <div style={{ marginBottom: productPhotos.length > 0 ? 48 : 0 }}>
                <p style={{
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  color: '#a78bfa',
                  marginBottom: 20,
                }}>
                  Сертификаты
                </p>
                <div style={{
                  display: 'flex',
                  gap: 16,
                  flexWrap: 'wrap',
                }}>
                  {certificates.map((src, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      style={{
                        borderRadius: 12,
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(139,92,246,0.1)',
                        flex: '0 0 auto',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <img
                        src={src}
                        alt={`Сертификат ${i + 1}`}
                        loading="lazy"
                        style={{
                          height: 180,
                          width: 'auto',
                          display: 'block',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Product Carousel */}
          {productPhotos.length > 0 && (
            <Reveal delay={0.3}>
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                  <p style={{
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                    color: '#a78bfa',
                    margin: 0,
                  }}>
                    Продукция
                  </p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={() => scroll(-1)}
                      aria-label="Назад"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        border: '1px solid rgba(167,139,250,0.3)',
                        background: canScrollLeft ? 'rgba(139,92,246,0.15)' : 'transparent',
                        color: canScrollLeft ? '#c4b5fd' : 'rgba(255,255,255,0.25)',
                        cursor: canScrollLeft ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        transition: 'all 0.3s ease',
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      &#8592;
                    </button>
                    <button
                      onClick={() => scroll(1)}
                      aria-label="Вперёд"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        border: '1px solid rgba(167,139,250,0.3)',
                        background: canScrollRight ? 'rgba(139,92,246,0.15)' : 'transparent',
                        color: canScrollRight ? '#c4b5fd' : 'rgba(255,255,255,0.25)',
                        cursor: canScrollRight ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        transition: 'all 0.3s ease',
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      &#8594;
                    </button>
                  </div>
                </div>

                <div ref={scrollRef} className="factory-block-carousel">
                  {productPhotos.map((src, i) => (
                    <div
                      key={i}
                      data-product-item
                      className="factory-block-carousel-item"
                    >
                      <div style={{
                        borderRadius: 16,
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(139,92,246,0.1)',
                        aspectRatio: '3 / 4',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-6px)';
                          e.currentTarget.style.borderColor = 'rgba(139,92,246,0.25)';
                          e.currentTarget.style.boxShadow = '0 25px 50px -15px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.borderColor = 'rgba(139,92,246,0.1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <img
                          src={src}
                          alt={`${name} — продукт ${i + 1}`}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Certificate Lightbox */}
      {lightboxIndex >= 0 && (
        <div
          data-lightbox
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxIndex(-1); }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'certLightboxFadeIn 0.3s ease',
            fontFamily: "'Jost', sans-serif",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(-1)}
            aria-label="Закрыть"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '1px solid rgba(167,139,250,0.4)',
              background: 'rgba(139,92,246,0.2)',
              color: '#c4b5fd',
              fontSize: 24,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              fontFamily: "'Jost', sans-serif",
              zIndex: 2,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(139,92,246,0.4)';
              e.currentTarget.style.borderColor = 'rgba(167,139,250,0.7)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(139,92,246,0.2)';
              e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)';
            }}
          >
            &#10005;
          </button>

          {/* Left arrow */}
          {certificates.length > 1 && (
            <button
              onClick={() => setLightboxIndex(i => (i - 1 + certificates.length) % certificates.length)}
              aria-label="Предыдущий"
              style={{
                position: 'absolute',
                left: 24,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1px solid rgba(167,139,250,0.3)',
                background: 'rgba(139,92,246,0.15)',
                color: '#c4b5fd',
                fontSize: 22,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                fontFamily: "'Jost', sans-serif",
                zIndex: 2,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.35)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,92,246,0.15)'}
            >
              &#8592;
            </button>
          )}

          {/* Right arrow */}
          {certificates.length > 1 && (
            <button
              onClick={() => setLightboxIndex(i => (i + 1) % certificates.length)}
              aria-label="Следующий"
              style={{
                position: 'absolute',
                right: 24,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1px solid rgba(167,139,250,0.3)',
                background: 'rgba(139,92,246,0.15)',
                color: '#c4b5fd',
                fontSize: 22,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                fontFamily: "'Jost', sans-serif",
                zIndex: 2,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.35)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,92,246,0.15)'}
            >
              &#8594;
            </button>
          )}

          {/* Image */}
          <img
            src={certificates[lightboxIndex]}
            alt={`Сертификат ${lightboxIndex + 1}`}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 8,
              zIndex: 1,
            }}
          />

          {/* Counter */}
          {certificates.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 14,
              letterSpacing: 2,
              zIndex: 2,
            }}>
              {lightboxIndex + 1} / {certificates.length}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes certLightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

    </>
  );
}
