import React, { useEffect, useLayoutEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight, ArrowRight, ArrowUp, Check, ChevronLeft, ChevronRight,
  Flower2, Mail, Menu, MessageSquare, Phone, Sparkles, X
} from 'lucide-react';
import './styles.css';

// ── Config ───────────────────────────────────────────────────────────────────
const FORM_EMAIL = 'chirathmaflora33@gmail.com';
const phone      = '94777166655'; // WhatsApp
const phone_call = '94771114345'; // Normal call
const facebook   = 'https://www.facebook.com/chirathmaflora/';
const instagram  = 'https://www.instagram.com/chirathma_flora/';
const tiktok     = 'https://www.tiktok.com/@chirathma_flora';

// ── Portfolio ────────────────────────────────────────────────────────────────
const collections = [
  // Weddings
  { type: 'Weddings',   title: 'Seaside Vows',        meta: 'Beach poruwa · Floral arch · Traditional',   img: '/wedding-1-1.jpg' },
  { type: 'Weddings',   title: 'Golden Hour',          meta: 'Beach ceremony · Kandyan dancers',           img: '/wedding-1-2.jpg' },
  { type: 'Weddings',   title: 'Ocean Breeze',         meta: 'Coastal setup · Sunset backdrop',            img: '/wedding-1-3.jpg' },
  { type: 'Weddings',   title: 'The Grand Stage',      meta: 'Settee back · Draping · Green & ivory',      img: '/wedding-2.jpg' },
  { type: 'Weddings',   title: 'Garden Elegance',      meta: 'Pillar arrangements · Petal aisle',          img: '/wedding-3-1.jpg' },
  { type: 'Weddings',   title: 'Tablescape Dreams',    meta: 'Rustic styling · Pampas & lanterns',         img: '/wedding-3-2.jpg' },
  // Proposals
  { type: 'Proposals',  title: 'Will You Marry Me?',   meta: 'LED letters · Rose petals · Candlelight',    img: '/marry-me-1-1.jpg' },
  { type: 'Proposals',  title: 'Poolside Reflection',  meta: 'Night setup · MARRY ME letters · Romance',   img: '/marry-me-1-2.jpg' },
  // Bride-to-Be
  { type: 'Celebrations', title: 'Bridal Shower',      meta: 'Boho tablescape · Rustic styling',           img: '/bridetobe-1-1.jpg' },
  { type: 'Celebrations', title: 'Bridal Bliss',       meta: 'Blue & white · Elegant party décor',         img: '/bridetobe-1-2.jpg' },
  { type: 'Celebrations', title: 'Bride to Be',        meta: 'Group celebration · Premium setup',           img: '/bridetobe-1-3.jpg' },
  // Birthdays
  { type: 'Birthdays',  title: 'Double the Joy',       meta: 'Balloon installation · Milestone',           img: '/work-01.jpg' },
  { type: 'Birthdays',  title: 'A Little Gentleman',   meta: 'Portrait corner · Celebration',              img: '/work-02.jpg' },
  { type: 'Birthdays',  title: 'Thivein Turns One',    meta: 'Garden party · Cake styling',                img: '/work-03.jpg' },
  { type: 'Birthdays',  title: 'Blue Skies',           meta: 'Outdoor setup · First birthday',             img: '/work-04.jpg' },
  { type: 'Birthdays',  title: 'Golden Thirty-Six',    meta: 'Birthday backdrop · Floral detail',          img: '/work-05.jpg' },
  // Ceremonies
  { type: 'Ceremonies', title: 'Blessed Beginnings',    meta: 'Traditional ceremony · Floral stage',        img: '/work-06.jpg' },
];

const filterTabs = ['All', 'Weddings', 'Birthdays', 'Proposals', 'Celebrations', 'Ceremonies'];

const steps = [
  ['01', 'Tell us your story',  'Share the date, place, feeling and the little details you love.'],
  ['02', 'See the vision',      'We shape a tailored concept, floral palette and transparent proposal.'],
  ['03', 'Walk into wonder',    'Our crew installs every stem, light and detail—then clears it all away.'],
];

const services = [
  ['01', 'Wedding décor',       'Poruwa · Settee backs · Entrances · Tablescapes'],
  ['02', 'Birthday worlds',     "Kids' themes · Milestones · Intimate dinners"],
  ['03', 'Proposals & events',  'MARRY ME setups · Engagements · Anniversaries'],
  ['04', 'Celebration styling', 'Bridal showers · Homecomings · Private parties'],
];

const packages = [
  {
    label: 'STARTER',  name: 'Bloom',  price: 'Rs. 35,000',  per: 'up to 50 guests',
    features: ['Basic floral décor', 'Entrance arrangement', 'Table centerpieces', 'Setup & cleanup'],
  },
  {
    label: 'MOST POPULAR',  name: 'Garden',  price: 'Rs. 60,000',  per: 'full event',  featured: true,
    features: ['Premium floral installation', 'Settee back / Poruwa décor', 'Aisle & entrance styling', 'Table styling & centerpieces', 'Lighting & draping', 'Full setup & cleanup'],
  },
  {
    label: 'LUXURY',  name: 'Estate',  price: 'Custom',  per: 'bespoke design',
    features: ['Complete venue transformation', 'Custom floral art & installations', 'Multi-zone event styling', 'Premium lighting design', 'Dedicated design team', 'Full planning support'],
  },
];

// ── Hooks ────────────────────────────────────────────────────────────────────
function useInView(opts = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); if (!opts.repeat) obs.unobserve(el); }
      else if (opts.repeat) setInView(false);
    }, { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? '0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCounter(end, inView, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(id); }
      else setVal(start);
    }, 16);
    return () => clearInterval(id);
  }, [inView, end, duration]);
  return val;
}

// ── Floating petals ──────────────────────────────────────────────────────────
function Petals() {
  const petals = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 8}s`,
      width: `${8 + Math.random() * 10}px`,
      height: `${8 + Math.random() * 10}px`,
    }))
  , []);
  return (
    <div className="petals">
      {petals.map((s, i) => <div key={i} className="petal" style={s} />)}
    </div>
  );
}

// ── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, className = '', type = 'reveal', delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`${type} ${inView ? 'in-view' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

// ── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const families = useCounter(2199, inView);
  const recommend = useCounter(100, inView, 1000);
  const years = useCounter(6, inView, 800);
  const reviews = useCounter(29, inView, 1000);

  return (
    <section className="stats-bar" ref={ref}>
      <div className="stat-item">
        <span className={`stat-number ${inView ? 'counted' : ''}`}>{families.toLocaleString()}+</span>
        <span className="stat-label">Happy Families</span>
      </div>
      <div className="stat-item">
        <span className={`stat-number ${inView ? 'counted' : ''}`}>{recommend}%</span>
        <span className="stat-label">Recommended</span>
      </div>
      <div className="stat-item">
        <span className={`stat-number ${inView ? 'counted' : ''}`}>{years}+</span>
        <span className="stat-label">Years of Magic</span>
      </div>
      <div className="stat-item">
        <span className={`stat-number ${inView ? 'counted' : ''}`}>{reviews}+</span>
        <span className="stat-label">5-Star Reviews</span>
      </div>
    </section>
  );
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onNav }) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNav]);

  if (index === null) return null;
  const item = images[index];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diffX > threshold) {
      onNav(1);
    } else if (diffX < -threshold) {
      onNav(-1);
    }
  };

  return (
    <div
      className={`lightbox ${index !== null ? 'open' : ''}`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox"><X size={20} /></button>
      <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); onNav(-1); }} aria-label="Previous image"><ChevronLeft /></button>
      <img src={item.img} alt={item.title} onClick={(e) => e.stopPropagation()} />
      <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); onNav(1); }} aria-label="Next image"><ChevronRight /></button>
      <div className="lightbox-caption">{item.title} — {item.meta}</div>
    </div>
  );
}

// ── Enquiry form ─────────────────────────────────────────────────────────────
const getTodayLocalDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function EnquiryForm({ builderConcept }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('Wedding');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');

  const [hasManuallyEditedOccasion, setHasManuallyEditedOccasion] = useState(false);
  const [hasManuallyEditedMessage, setHasManuallyEditedMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (builderConcept) {
      if (!hasManuallyEditedOccasion) {
        const mapped = builderConcept.event === 'Party' ? 'Private party' : builderConcept.event;
        setOccasion(mapped);
      }
      if (!hasManuallyEditedMessage) {
        setMessage(`I'd love to plan a ${builderConcept.mood.toLowerCase()} ${builderConcept.event.toLowerCase()} with a ${builderConcept.palette} palette. Let's discuss details!`);
      }
    }
  }, [builderConcept, hasManuallyEditedOccasion, hasManuallyEditedMessage]);

  const validateField = (fieldName, value) => {
    let err = '';
    if (fieldName === 'name') {
      if (!value.trim()) err = 'Name is required.';
      else if (value.trim().length < 2) err = 'Name must be at least 2 characters.';
    }
    if (fieldName === 'phone') {
      const clean = value.replace(/[^\d+]/g, '');
      if (!value.trim()) err = 'Phone number is required.';
      else if (!/^(?:\+94|0)?7\d{8}$/.test(clean)) err = 'Please enter a valid Sri Lankan mobile number (e.g. 077 111 4345).';
    }
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateField('name', name);
    const phoneErr = validateField('phone', phone);

    if (nameErr || phoneErr) {
      setErrors({ name: nameErr, phone: phoneErr });
      setTouched({ name: true, phone: true });
      return;
    }

    setSending(true);
    setError('');

    const data = {
      name,
      phone,
      occasion,
      event_date: eventDate,
      message,
    };

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `New enquiry from ${data.name}` }),
      });
      if (res.ok) setSent(true);
      else throw new Error('Server error');
    } catch {
      setError('Something went wrong. Please call us directly or reach out on WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setOccasion('Wedding');
    setEventDate('');
    setMessage('');
    setErrors({});
    setTouched({});
    setHasManuallyEditedOccasion(false);
    setHasManuallyEditedMessage(false);
    setSent(false);
  };

  if (sent) {
    return (
      <div className="success">
        <Check />
        <h3>Your story is on its way.</h3>
        <p>Thank you. We'll be in touch within 24 hours.</p>
        <button onClick={resetForm} type="button">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <input type="text" name="_honey" style={{ display: 'none' }} />
      <input type="hidden" name="_captcha" value="false" />
      <label>
        Your name
        <input
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (touched.name) {
              setErrors(prev => ({ ...prev, name: validateField('name', e.target.value) }));
            }
          }}
          onBlur={() => {
            setTouched(prev => ({ ...prev, name: true }));
            setErrors(prev => ({ ...prev, name: validateField('name', name) }));
          }}
          placeholder="e.g. Nethmi &amp; Kasun"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>
      <label>
        Phone / WhatsApp
        <input
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (touched.phone) {
              setErrors(prev => ({ ...prev, phone: validateField('phone', e.target.value) }));
            }
          }}
          onBlur={() => {
            setTouched(prev => ({ ...prev, phone: true }));
            setErrors(prev => ({ ...prev, phone: validateField('phone', phone) }));
          }}
          placeholder="07X XXX XXXX"
        />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </label>
      <div className="form-row">
        <label>
          Occasion
          <select
            name="occasion"
            value={occasion}
            onChange={(e) => {
              setOccasion(e.target.value);
              setHasManuallyEditedOccasion(true);
            }}
          >
            <option>Wedding</option><option>Birthday</option><option>Proposal</option>
            <option>Bridal shower</option><option>Private party</option><option>Corporate event</option>
          </select>
        </label>
        <label>
          Event date
          <input
            name="event_date"
            type="date"
            value={eventDate}
            min={getTodayLocalDate()}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </label>
      </div>
      <label>
        Tell us about your vision
        <textarea
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setHasManuallyEditedMessage(true);
          }}
          placeholder="The mood, venue, guest count, colours you love…"
        />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="full-btn" type="submit" disabled={sending}>
        {sending ? 'Sending…' : <><span>Send my enquiry</span><ArrowRight /></>}
      </button>
    </form>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [loaded, setLoaded] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [filter, setFilter] = useState('All');
  const [slide, setSlide] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [event, setEvent] = useState('Wedding');
  const [mood, setMood] = useState('Romantic');
  const [palette, setPalette] = useState('Ivory & Sage');

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diffX > threshold) {
      next(1);
    } else if (diffX < -threshold) {
      next(-1);
    }
  };

  const filtered = useMemo(
    () => filter === 'All' ? collections : collections.filter(x => x.type === filter),
    [filter]
  );

  // Page load
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Scroll handlers
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      document.documentElement.style.setProperty('--scroll', `${y}px`);
      setScrolled(y > 80);
      setShowTop(y > 600);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? y / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset slide on filter change
  useEffect(() => { setSlide(0); }, [filter]);

  // Keep the selected card visible without translating beyond the track.
  const positionCarousel = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = track?.children[slide];
    if (!viewport || !track || !card) return;

    const viewportPadding = Number.parseFloat(getComputedStyle(viewport).paddingLeft) || 0;
    const visibleWidth = viewport.clientWidth - viewportPadding;
    const maxOffset = Math.max(0, track.scrollWidth - visibleWidth);
    const offset = Math.min(card.offsetLeft, maxOffset);
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
  }, [slide]);

  useLayoutEffect(() => {
    positionCarousel();
  }, [positionCarousel, filtered]);

  useEffect(() => {
    window.addEventListener('resize', positionCarousel);
    return () => window.removeEventListener('resize', positionCarousel);
  }, [positionCarousel]);

  const next = useCallback((d) => {
    setSlide(prev => (prev + d + filtered.length) % filtered.length);
  }, [filtered.length]);

  const openLightbox = useCallback((idx) => {
    setLightboxIdx(idx);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    document.body.style.overflow = '';
  }, []);

  const navLightbox = useCallback((d) => {
    setLightboxIdx(prev => (prev + d + filtered.length) % filtered.length);
  }, [filtered.length]);

  const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent(
    `Hello Chirathma Flora! I'd love to plan a ${mood.toLowerCase()} ${event.toLowerCase()} with a ${palette} palette.`
  )}`;

  return (
    <>
      {/* Page loader */}
      <div className={`page-loader ${loaded ? 'loaded' : ''}`}>
        <img className="loader-logo" src="/chirathma-logo.jpg" alt="" />
      </div>

      {/* Scroll progress */}
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />

      {/* Lightbox */}
      <Lightbox images={filtered} index={lightboxIdx} onClose={closeLightbox} onNav={navLightbox} />

      <main>
        {/* ── Navigation ── */}
        <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
          <a className="brand" href="#top" aria-label="Chirathma Flora home">
            <img src="/chirathma-logo.jpg" alt="Chirathma Flora logo" width="42" height="42" />
            <span>CHIRATHMA<small>FLORA · POLGAHAWELA</small></span>
          </a>
          <nav className={menu ? 'open' : ''} aria-label="Main navigation">
            <a href="#work" onClick={() => setMenu(false)}>Our work</a>
            <a href="#services" onClick={() => setMenu(false)}>Services</a>
            <a href="#pricing" onClick={() => setMenu(false)}>Packages</a>
            <a href="#story" onClick={() => setMenu(false)}>Our story</a>
            <a className="nav-cta" href="#inquire" onClick={() => setMenu(false)}>
              Plan your event <ArrowDownRight size={17} />
            </a>
          </nav>
          <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>
            {menu ? <X /> : <Menu />}
          </button>
        </header>

        {/* ── Hero ── */}
        <section className="hero" id="top">
          <img className="hero-image" src="/chirathma-hero.jpg" alt="Luxury ivory floral wedding installation" fetchPriority="high" decoding="async" />
          <div className="hero-shade" />
          <Petals />
          <div className="eyebrow"><span /> Floral artistry · Polgahawela</div>
          <div className="hero-copy">
            <h1>We make<br /><em>moments bloom.</em></h1>
            <p>Immersive floral décor for weddings, birthdays and celebrations—designed around your story, down to the final petal.</p>
            <a className="text-link" href="#work">Explore our work <ArrowDownRight size={19} /></a>
          </div>
          <div className="hero-note">
            <b>Fresh flowers.<br />Remarkable spaces.</b>
            <span>Islandwide<br />Sri Lanka</span>
          </div>
          <span className="scroll-note">SCROLL TO DISCOVER</span>
        </section>

        {/* ── Philosophy ── */}
        <section className="intro" id="story">
          <Reveal><div className="section-no">01 — OUR PHILOSOPHY</div></Reveal>
          <div>
            <Reveal>
              <h2>Not just decoration.<br /><em>A feeling, made visible.</em></h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p>We believe the best celebrations feel unmistakably yours. Our florists layer fresh blooms, thoughtful details and atmosphere into spaces that invite everyone to pause, connect and remember.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <a className="dark-link" href="#process">How we create <ArrowRight size={18} /></a>
            </Reveal>
          </div>
          <Flower2 className="line-flower" strokeWidth={0.6} />
        </section>

        {/* ── Stats ── */}
        <StatsBar />

        {/* ── Work / Gallery ── */}
        <section className="work" id="work">
          <div className="work-head">
            <Reveal>
              <div>
                <span className="section-no light">02 — SELECTED CELEBRATIONS</span>
                <h2>Made for<br /><em>your moment.</em></h2>
              </div>
            </Reveal>
            <div className="filters">
              {filterTabs.map(f => (
                <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} aria-pressed={filter === f}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div
            className="carousel-viewport"
            ref={viewportRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="carousel-track" ref={trackRef} role="list">
              {filtered.map((item, i) => (
                <article
                  key={`${item.title}-${filter}`}
                  className={i === slide ? 'active' : ''}
                  role="listitem"
                  tabIndex={0}
                  onClick={() => {
                    if (i === slide) openLightbox(i);
                    else setSlide(i);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (i === slide) openLightbox(i);
                      else setSlide(i);
                    }
                  }}
                >
                  <img src={item.img} alt={item.title} loading="lazy" decoding="async" />
                  <div className="card-overlay">
                    <span>{item.type}</span>
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="gallery-controls">
            <span>{String(slide + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}</span>
            <button onClick={() => next(-1)} aria-label="Previous image"><ChevronLeft /></button>
            <button onClick={() => next(1)} aria-label="Next image"><ChevronRight /></button>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="services" id="services">
          <Reveal><span className="section-no">03 — WHAT WE CREATE</span></Reveal>
          <Reveal delay={0.1}><h2>Every detail,<br /><em>beautifully considered.</em></h2></Reveal>
          <div className="service-grid stagger">
            {services.map(s => (
              <Reveal key={s[0]}>
                <article>
                  <span>{s[0]}</span>
                  <h3>{s[1]}</h3>
                  <p>{s[2]}</p>
                  <ArrowDownRight />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="pricing" id="pricing">
          <Reveal><span className="section-no">04 — PACKAGES</span></Reveal>
          <Reveal delay={0.1}><h2>Invest in<br /><em>unforgettable.</em></h2></Reveal>
          <div className="pricing-grid stagger">
            {packages.map((pkg) => (
              <Reveal key={pkg.name}>
                <div className={`price-card ${pkg.featured ? 'featured' : ''}`}>
                  <span className="price-label">{pkg.label}</span>
                  <h3 className="price-name">{pkg.name}</h3>
                  <div className="price-tag">{pkg.price} <small>/ {pkg.per}</small></div>
                  <ul className="price-features">
                    {pkg.features.map(f => (
                      <li key={f}><Check size={16} />{f}</li>
                    ))}
                  </ul>
                  <a href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi! I'm interested in the ${pkg.name} package.`)}`}
                     target="_blank" rel="noreferrer" className="price-cta">
                    Get a quote <ArrowRight size={16} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Concept builder ── */}
        <section className="builder">
          <div className="builder-copy">
            <Reveal><span className="section-no light">MAKE IT YOURS</span></Reveal>
            <Reveal delay={0.1}><h2>Start your<br /><em>flower story.</em></h2></Reveal>
            <Reveal delay={0.2}><p>Choose a few details and see your celebration's first little spark take shape.</p></Reveal>
          </div>
          <div className="builder-card">
            <label>01 · THE OCCASION</label>
            <div className="pills">
              {['Wedding', 'Birthday', 'Proposal', 'Party'].map(x => (
                <button key={x} className={event === x ? 'active' : ''} onClick={() => setEvent(x)}>{x}</button>
              ))}
            </div>
            <label>02 · THE FEELING</label>
            <div className="pills">
              {['Romantic', 'Modern', 'Joyful', 'Elegant'].map(x => (
                <button key={x} className={mood === x ? 'active' : ''} onClick={() => setMood(x)}>{x}</button>
              ))}
            </div>
            <label>03 · THE PALETTE</label>
            <div className="swatches">
              {['Ivory & Sage', 'Blush & Gold', 'Tropical Colour'].map((x, i) => (
                <button key={x} className={palette === x ? 'active' : ''} onClick={() => setPalette(x)}>
                  <i className={`swatch s${i}`} />{x}{palette === x && <Check size={15} />}
                </button>
              ))}
            </div>
            <div className="concept">
              <Sparkles />
              <div>
                <small>YOUR CONCEPT</small>
                <b>{mood} {event}</b>
                <span>{palette} · Custom floral design</span>
              </div>
            </div>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="full-btn">
              Bring this vision to life <ArrowRight />
            </a>
            <a href="#inquire" className="builder-secondary-btn">
              Or, request a detailed proposal below
            </a>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="process" id="process">
          <Reveal><span className="section-no">05 — THE JOURNEY</span></Reveal>
          <div className="process-title">
            <Reveal><h2>From first hello<br /><em>to final flourish.</em></h2></Reveal>
            <Reveal delay={0.2}><p>Beautiful should feel effortless. Our considered process keeps it that way.</p></Reveal>
          </div>
          <div className="steps stagger">
            {steps.map(s => (
              <Reveal key={s[0]}>
                <article>
                  <span>{s[0]}</span>
                  <h3>{s[1]}</h3>
                  <p>{s[2]}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Testimonial ── */}
        <section className="testimonial">
          <Reveal>
            <Flower2 />
            <blockquote>
              "The entire venue was transformed into something we had only ever dreamed of.
              Every detail was perfect."
            </blockquote>
            <p>— Nethmi &amp; Kasun, Wedding at Polgahawela</p>
          </Reveal>
        </section>

        {/* ── Inquire / Contact ── */}
        <section className="inquire" id="inquire">
          <div>
            <Reveal><span className="section-no light">YOUR DATE. YOUR STORY.</span></Reveal>
            <Reveal delay={0.1}><h2>Let's make it<br /><em>unforgettable.</em></h2></Reveal>
            <Reveal delay={0.2}>
              <p>Tell us what you're dreaming of. We'll bring the flowers—and a few ideas you haven't imagined yet.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="contact-lines">
                <a href={`tel:+${phone_call}`}><Phone size={16} />077 111 4345</a>
                <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer"><MessageSquare size={16} />077 716 6655 (WhatsApp)</a>
                <a href="mailto:chirathmaflora33@gmail.com"><Mail size={16} />chirathmaflora33@gmail.com</a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}><EnquiryForm builderConcept={{ event, mood, palette }} /></Reveal>
        </section>

        {/* ── Footer ── */}
        <footer>
          <a className="brand" href="#top" aria-label="Back to top">
            <img src="/chirathma-logo.jpg" alt="" width="42" height="42" />
            <span>CHIRATHMA<small>FLORA · POLGAHAWELA</small></span>
          </a>
          <p>No. 110/2, Colombo Road, Polgahawela, Sri Lanka</p>
          <div>
            <a href={instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={tiktok} target="_blank" rel="noreferrer">TikTok</a>
            <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="tel:+94771114345">Call</a>
            <a href="#top">Back to top ↑</a>
          </div>
          <small>© {new Date().getFullYear()} CHIRATHMA FLORA. MADE WITH CARE.</small>
        </footer>
      </main>

      {/* Scroll to top */}
      <button className={`scroll-top ${showTop ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
        <ArrowUp size={20} />
      </button>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
