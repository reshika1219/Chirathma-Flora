import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, Check, ChevronLeft, ChevronRight, Flower2, Menu, Phone, Sparkles, X } from 'lucide-react';
import './styles.css';

// ── Contact ──────────────────────────────────────────────────────────────────
// To receive enquiry emails, replace the placeholder below with your email
// address. FormSubmit.co will send form submissions directly to that address —
// no account or signup required. First submission triggers a one-time
// verification email from FormSubmit.
const FORM_EMAIL = 'YOUR_EMAIL@gmail.com'; // ← replace with your real email

// ── Business details ─────────────────────────────────────────────────────────
const phone        = '94771114345';
const facebook     = 'https://www.facebook.com/chirathmaflora/';
const instagram    = 'https://www.instagram.com/chirathma_flora/';
const tiktok       = 'https://www.tiktok.com/@chirathma_flora';

// ── Portfolio ─────────────────────────────────────────────────────────────────
const collections = [
  { type: 'Birthdays',   title: 'Double the Joy',    meta: 'Balloon installation · Milestone',   img: '/work-01.jpg' },
  { type: 'Birthdays',   title: 'A Little Gentleman',meta: 'Portrait corner · Celebration',      img: '/work-02.jpg' },
  { type: 'Birthdays',   title: 'Thivein Turns One', meta: 'Garden party · Cake styling',        img: '/work-03.jpg' },
  { type: 'Birthdays',   title: 'Blue Skies',        meta: 'Outdoor setup · First birthday',     img: '/work-04.jpg' },
  { type: 'Birthdays',   title: 'Golden Thirty-Six', meta: 'Birthday backdrop · Floral detail',  img: '/work-05.jpg' },
  { type: 'Ceremonies',  title: 'Blessed Beginnings',meta: 'Traditional ceremony · Floral stage',img: '/work-06.jpg' },
];

const steps = [
  ['01', 'Tell us your story',  'Share the date, place, feeling and the little details you love.'],
  ['02', 'See the vision',      'We shape a tailored concept, floral palette and transparent proposal.'],
  ['03', 'Walk into wonder',    'Our crew installs every stem, light and detail—then clears it all away.'],
];

// ── Enquiry form ──────────────────────────────────────────────────────────────
function EnquiryForm() {
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState('');
  const formRef               = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const data = Object.fromEntries(new FormData(formRef.current));

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({ ...data, _subject: `New enquiry from ${data.name}` }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        throw new Error('Server error');
      }
    } catch {
      setError('Something went wrong. Please call us directly or reach out on WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="success">
        <Check />
        <h3>Your story is on its way.</h3>
        <p>Thank you. We'll be in touch within 24 hours.</p>
        <button onClick={() => { setSent(false); formRef.current?.reset(); }} type="button">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {/* FormSubmit honeypot — prevents spam */}
      <input type="text" name="_honey" style={{ display: 'none' }} />
      <input type="hidden" name="_captcha" value="false" />

      <label>
        Your name
        <input name="name" required placeholder="e.g. Nethmi &amp; Kasun" />
      </label>
      <label>
        Phone / WhatsApp
        <input name="phone" required type="tel" placeholder="07X XXX XXXX" />
      </label>
      <div className="form-row">
        <label>
          Occasion
          <select name="occasion">
            <option>Wedding</option>
            <option>Birthday</option>
            <option>Private party</option>
            <option>Corporate event</option>
          </select>
        </label>
        <label>
          Event date
          <input name="event_date" type="date" />
        </label>
      </div>
      <label>
        Tell us about your vision
        <textarea name="message" placeholder="The mood, venue, guest count, colours you love…" />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="full-btn" type="submit" disabled={sending}>
        {sending ? 'Sending…' : <><span>Send my enquiry</span> <ArrowRight /></>}
      </button>
    </form>
  );
}

// ── Main app ──────────────────────────────────────────────────────────────────
function App() {
  const [menu,    setMenu]    = useState(false);
  const [filter,  setFilter]  = useState('All');
  const [slide,   setSlide]   = useState(0);
  const [event,   setEvent]   = useState('Wedding');
  const [mood,    setMood]    = useState('Romantic');
  const [palette, setPalette] = useState('Ivory & Sage');

  const filtered = filter === 'All' ? collections : collections.filter(x => x.type === filter);
  const next     = d => setSlide((slide + d + filtered.length) % filtered.length);

  useEffect(() => { setSlide(0); }, [filter]);
  useEffect(() => {
    const onScroll = () =>
      document.documentElement.style.setProperty('--scroll', `${window.scrollY}px`);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent(
    `Hello Chirathma Flora! I'd love to plan a ${mood.toLowerCase()} ${event.toLowerCase()} with a ${palette} palette.`
  )}`;

  return (
    <main>
      {/* ── Navigation ── */}
      <header className="nav">
        <a className="brand" href="#top" aria-label="Chirathma Flora home">
          <img src="/chirathma-logo.jpg" alt="Chirathma Flora logo" width="42" height="42" />
          <span>CHIRATHMA<small>FLORA · POLGAHAWELA</small></span>
        </a>
        <nav className={menu ? 'open' : ''} aria-label="Main navigation">
          <a href="#work"     onClick={() => setMenu(false)}>Our work</a>
          <a href="#services" onClick={() => setMenu(false)}>Services</a>
          <a href="#story"    onClick={() => setMenu(false)}>Our story</a>
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
        <img
          className="hero-image"
          src="/chirathma-hero.jpg"
          alt="Luxury ivory floral wedding installation at twilight"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-shade" />
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
        <div className="section-no">01 — OUR PHILOSOPHY</div>
        <div>
          <h2>Not just decoration.<br /><em>A feeling, made visible.</em></h2>
          <p>We believe the best celebrations feel unmistakably yours. Our florists layer fresh blooms, thoughtful details and atmosphere into spaces that invite everyone to pause, connect and remember.</p>
          <a className="dark-link" href="#process">How we create <ArrowRight size={18} /></a>
        </div>
        <Flower2 className="line-flower" strokeWidth={0.6} />
      </section>

      {/* ── Work / Gallery ── */}
      <section className="work" id="work">
        <div className="work-head">
          <div>
            <span className="section-no light">02 — SELECTED CELEBRATIONS</span>
            <h2>Made for<br /><em>your moment.</em></h2>
          </div>
          <div className="filters">
            {['All', 'Birthdays', 'Ceremonies'].map(f => (
              <button
                key={f}
                className={filter === f ? 'active' : ''}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="gallery" role="list">
          {filtered.map((item, i) => (
            <article key={item.title} className={i === slide ? 'featured' : ''} role="listitem">
              <img src={item.img} alt={item.title} loading="lazy" decoding="async" />
              <div className="card-overlay">
                <span>{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="gallery-controls">
          <span>{String(slide + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}</span>
          <button onClick={() => next(-1)} aria-label="Previous image"><ChevronLeft /></button>
          <button onClick={() => next(1)}  aria-label="Next image"><ChevronRight /></button>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="services" id="services">
        <span className="section-no">03 — WHAT WE CREATE</span>
        <h2>Every detail,<br /><em>beautifully considered.</em></h2>
        <div className="service-grid">
          {[
            ['01', 'Wedding décor',       'Poruwa · Setee backs · Entrances · Tablescapes'],
            ['02', 'Birthday worlds',     "Kids' themes · Milestones · Intimate dinners"],
            ['03', 'Celebration styling', 'Engagements · Homecomings · Private parties'],
            ['04', 'Floral details',      'Bouquets · Car décor · Oil lamps · Installations'],
          ].map(s => (
            <article key={s[0]}>
              <span>{s[0]}</span>
              <h3>{s[1]}</h3>
              <p>{s[2]}</p>
              <ArrowDownRight />
            </article>
          ))}
        </div>
      </section>

      {/* ── Concept builder ── */}
      <section className="builder">
        <div className="builder-copy">
          <span className="section-no light">MAKE IT YOURS</span>
          <h2>Start your<br /><em>flower story.</em></h2>
          <p>Choose a few details and see your celebration's first little spark take shape.</p>
        </div>
        <div className="builder-card">
          <label>01 · THE OCCASION</label>
          <div className="pills">
            {['Wedding', 'Birthday', 'Party'].map(x => (
              <button key={x} className={event === x ? 'active' : ''} onClick={() => setEvent(x)}>{x}</button>
            ))}
          </div>
          <label>02 · THE FEELING</label>
          <div className="pills">
            {['Romantic', 'Modern', 'Joyful'].map(x => (
              <button key={x} className={mood === x ? 'active' : ''} onClick={() => setMood(x)}>{x}</button>
            ))}
          </div>
          <label>03 · THE PALETTE</label>
          <div className="swatches">
            {['Ivory & Sage', 'Blush & Gold', 'Tropical Colour'].map((x, i) => (
              <button key={x} className={palette === x ? 'active' : ''} onClick={() => setPalette(x)}>
                <i className={`swatch s${i}`} />
                {x}
                {palette === x && <Check size={15} />}
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
        </div>
      </section>

      {/* ── Process ── */}
      <section className="process" id="process">
        <span className="section-no">04 — THE JOURNEY</span>
        <div className="process-title">
          <h2>From first hello<br /><em>to final flourish.</em></h2>
          <p>Beautiful should feel effortless. Our considered process keeps it that way.</p>
        </div>
        <div className="steps">
          {steps.map(s => (
            <article key={s[0]}>
              <span>{s[0]}</span>
              <h3>{s[1]}</h3>
              <p>{s[2]}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="testimonial">
        <Flower2 />
        <blockquote>
          "The entire venue was transformed into something we had only ever dreamed of.
          Every detail was perfect — we couldn't have asked for more."
        </blockquote>
        <p>— Nethmi &amp; Kasun, Wedding at Polgahawela</p>
      </section>

      {/* ── Inquire / Contact ── */}
      <section className="inquire" id="inquire">
        <div>
          <span className="section-no light">YOUR DATE. YOUR STORY.</span>
          <h2>Let's make it<br /><em>unforgettable.</em></h2>
          <p>Tell us what you're dreaming of. We'll bring the flowers—and a few ideas you haven't imagined yet.</p>
          <div className="contact-lines">
            <a href="tel:+94771114345"><Phone />077 111 4345</a>
            <a href="tel:+94777166655"><Phone />077 716 6655</a>
          </div>
        </div>
        <EnquiryForm />
      </section>

      {/* ── Footer ── */}
      <footer>
        <a className="brand" href="#top" aria-label="Back to top">
          <img src="/chirathma-logo.jpg" alt="" width="42" height="42" />
          <span>CHIRATHMA<small>FLORA · POLGAHAWELA</small></span>
        </a>
        <p>No. 110/2, Colombo Road, Polgahawela, Sri Lanka</p>
        <div>
          <a href={instagram}  target="_blank" rel="noreferrer">Instagram</a>
          <a href={facebook}   target="_blank" rel="noreferrer">Facebook</a>
          <a href={tiktok}     target="_blank" rel="noreferrer">TikTok</a>
          <a href={whatsapp}   target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="tel:+94771114345">Call</a>
          <a href="#top">Back to top ↑</a>
        </div>
        <small>© {new Date().getFullYear()} CHIRATHMA FLORA. MADE WITH CARE.</small>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
