import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, Check, ChevronLeft, ChevronRight, Flower2, Menu, Phone, Sparkles, X } from 'lucide-react';
import './styles.css';

const phone = '94771114345';
const facebook = 'https://www.facebook.com/chirathmaflora/';
const instagram = 'https://www.instagram.com/chirathma_flora/';
const tiktok = 'https://www.tiktok.com/@chirathma_flora';
const collections = [
  { type: 'Birthdays', title: 'Double the Joy', meta: 'Balloon installation · Milestone', img: '/work-01.jpg' },
  { type: 'Birthdays', title: 'A Little Gentleman', meta: 'Portrait corner · Celebration', img: '/work-02.jpg' },
  { type: 'Birthdays', title: 'Thivein Turns One', meta: 'Garden party · Cake styling', img: '/work-03.jpg' },
  { type: 'Birthdays', title: 'Blue Skies', meta: 'Outdoor setup · First birthday', img: '/work-04.jpg' },
  { type: 'Birthdays', title: 'Golden Thirty-Six', meta: 'Birthday backdrop · Floral detail', img: '/work-05.jpg' },
  { type: 'Ceremonies', title: 'Blessed Beginnings', meta: 'Traditional ceremony · Floral stage', img: '/work-06.jpg' },
];

const steps = [
  ['01', 'Tell us your story', 'Share the date, place, feeling and the little details you love.'],
  ['02', 'See the vision', 'We shape a tailored concept, floral palette and transparent proposal.'],
  ['03', 'Walk into wonder', 'Our crew installs every stem, light and detail—then clears it all away.'],
];

function App() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState('All');
  const [slide, setSlide] = useState(0);
  const [event, setEvent] = useState('Wedding');
  const [mood, setMood] = useState('Romantic');
  const [palette, setPalette] = useState('Ivory & Sage');
  const [sent, setSent] = useState(false);
  const filtered = filter === 'All' ? collections : collections.filter(x => x.type === filter);
  const next = d => setSlide((slide + d + filtered.length) % filtered.length);

  useEffect(() => { setSlide(0); }, [filter]);
  useEffect(() => {
    const onScroll = () => document.documentElement.style.setProperty('--scroll', `${window.scrollY}px`);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent(`Hello Chirathma Flora! I'd love to plan a ${mood.toLowerCase()} ${event.toLowerCase()} with a ${palette} palette.`)}`;

  return <main>
    <header className="nav">
      <a className="brand" href="#top" aria-label="Chirathma Flora home"><img src="/chirathma-logo.jpg" alt=""/><span>CHIRATHMA<small>FLORA · POLGAHAWELA</small></span></a>
      <nav className={menu ? 'open' : ''}>
        <a href="#work" onClick={() => setMenu(false)}>Our work</a><a href="#services" onClick={() => setMenu(false)}>Services</a><a href="#story" onClick={() => setMenu(false)}>Our story</a>
        <a className="nav-cta" href="#inquire" onClick={() => setMenu(false)}>Plan your event <ArrowDownRight size={17}/></a>
      </nav>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button>
    </header>

    <section className="hero" id="top">
      <img className="hero-image" src="/chirathma-hero.png" alt="Luxury ivory floral wedding installation at twilight" />
      <div className="hero-shade" />
      <div className="eyebrow"><span/> Floral artistry · Polgahawela</div>
      <div className="hero-copy">
        <h1>We make<br/><em>moments bloom.</em></h1>
        <p>Immersive floral décor for weddings, birthdays and celebrations—designed around your story, down to the final petal.</p>
        <a className="text-link" href="#work">Explore our work <ArrowDownRight size={19}/></a>
      </div>
      <div className="hero-note"><b>Fresh flowers.<br/>Remarkable spaces.</b><span>Islandwide<br/>Sri Lanka</span></div>
      <span className="scroll-note">SCROLL TO DISCOVER</span>
    </section>

    <section className="intro" id="story">
      <div className="section-no">01 — OUR PHILOSOPHY</div>
      <div>
        <h2>Not just decoration.<br/><em>A feeling, made visible.</em></h2>
        <p>We believe the best celebrations feel unmistakably yours. Our florists layer fresh blooms, thoughtful details and atmosphere into spaces that invite everyone to pause, connect and remember.</p>
        <a className="dark-link" href="#process">How we create <ArrowRight size={18}/></a>
      </div>
      <Flower2 className="line-flower" strokeWidth={.6}/>
    </section>

    <section className="work" id="work">
      <div className="work-head"><div><span className="section-no light">02 — SELECTED CELEBRATIONS</span><h2>Made for<br/><em>your moment.</em></h2></div>
        <div className="filters">{['All','Birthdays','Ceremonies'].map(f => <button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div>
      </div>
      <div className="gallery">
        {filtered.map((item, i) => <article key={item.title} className={i===slide?'featured':''}>
          <img src={item.img} alt={item.title} /><div className="card-overlay"><span>{item.type}</span><h3>{item.title}</h3><p>{item.meta}</p></div>
        </article>)}
      </div>
      <div className="gallery-controls"><span>{String(slide+1).padStart(2,'0')} / {String(filtered.length).padStart(2,'0')}</span><button onClick={()=>next(-1)}><ChevronLeft/></button><button onClick={()=>next(1)}><ChevronRight/></button></div>
    </section>

    <section className="services" id="services">
      <span className="section-no">03 — WHAT WE CREATE</span><h2>Every detail,<br/><em>beautifully considered.</em></h2>
      <div className="service-grid">
        {[['01','Wedding décor','Poruwa · Setee backs · Entrances · Tablescapes'],['02','Birthday worlds','Kids’ themes · Milestones · Intimate dinners'],['03','Celebration styling','Engagements · Homecomings · Private parties'],['04','Floral details','Bouquets · Car décor · Oil lamps · Installations']].map(s=><article key={s[0]}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><ArrowDownRight/></article>)}
      </div>
    </section>

    <section className="builder">
      <div className="builder-copy"><span className="section-no light">MAKE IT YOURS</span><h2>Start your<br/><em>flower story.</em></h2><p>Choose a few details and see your celebration’s first little spark take shape.</p></div>
      <div className="builder-card">
        <label>01 · THE OCCASION</label><div className="pills">{['Wedding','Birthday','Party'].map(x=><button key={x} className={event===x?'active':''} onClick={()=>setEvent(x)}>{x}</button>)}</div>
        <label>02 · THE FEELING</label><div className="pills">{['Romantic','Modern','Joyful'].map(x=><button key={x} className={mood===x?'active':''} onClick={()=>setMood(x)}>{x}</button>)}</div>
        <label>03 · THE PALETTE</label><div className="swatches">{['Ivory & Sage','Blush & Gold','Tropical Colour'].map((x,i)=><button key={x} className={palette===x?'active':''} onClick={()=>setPalette(x)}><i className={`swatch s${i}`}/>{x}{palette===x&&<Check size={15}/>}</button>)}</div>
        <div className="concept"><Sparkles/><div><small>YOUR CONCEPT</small><b>{mood} {event}</b><span>{palette} · Custom floral design</span></div></div>
        <a href={whatsapp} target="_blank" rel="noreferrer" className="full-btn">Bring this vision to life <ArrowRight/></a>
      </div>
    </section>

    <section className="process" id="process"><span className="section-no">04 — THE JOURNEY</span><div className="process-title"><h2>From first hello<br/><em>to final flourish.</em></h2><p>Beautiful should feel effortless. Our considered process keeps it that way.</p></div><div className="steps">{steps.map(s=><article key={s[0]}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></article>)}</div></section>

    <section className="testimonial"><Flower2/><blockquote>“The room felt like it had grown<br/>straight out of our imagination.”</blockquote><p>— A kind word from one of our couples</p></section>

    <section className="inquire" id="inquire">
      <div><span className="section-no light">YOUR DATE. YOUR STORY.</span><h2>Let’s make it<br/><em>unforgettable.</em></h2><p>Tell us what you’re dreaming of. We’ll bring the flowers—and a few ideas you haven’t imagined yet.</p><div className="contact-lines"><a href="tel:+94771114345"><Phone/>077 111 4345</a><a href="tel:+94777166655"><Phone/>077 716 6655</a></div></div>
      <form onSubmit={e=>{e.preventDefault();setSent(true)}}>{sent ? <div className="success"><Check/><h3>Your story is on its way.</h3><p>Thank you. We’ll be in touch shortly.</p><button onClick={()=>setSent(false)} type="button">Send another enquiry</button></div> : <><label>Your name<input required placeholder="e.g. Nethmi & Kasun"/></label><label>Phone / WhatsApp<input required type="tel" placeholder="07X XXX XXXX"/></label><div className="form-row"><label>Occasion<select><option>Wedding</option><option>Birthday</option><option>Private party</option><option>Corporate event</option></select></label><label>Event date<input type="date"/></label></div><label>Tell us about your vision<textarea placeholder="The mood, venue, guest count, colours you love..."/></label><button className="full-btn">Send my enquiry <ArrowRight/></button></>}</form>
    </section>

    <footer><a className="brand" href="#top"><img src="/chirathma-logo.jpg" alt=""/><span>CHIRATHMA<small>FLORA · POLGAHAWELA</small></span></a><p>No. 110/2, Colombo Road, Polgahawela, Sri Lanka</p><div><a href={instagram} target="_blank" rel="noreferrer">Instagram</a><a href={facebook} target="_blank" rel="noreferrer">Facebook</a><a href={tiktok} target="_blank" rel="noreferrer">TikTok</a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="tel:+94771114345">Call</a><a href="#top">Back to top ↑</a></div><small>© {new Date().getFullYear()} CHIRATHMA FLORA. MADE WITH CARE.</small></footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App/>);
