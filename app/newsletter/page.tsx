'use client';

import Navbar from '../../components/Navbar';
import { useState } from 'react';
import { Mail, Sparkles, ArrowRight, Clock, ShieldCheck, TrendingUp, Newspaper, CheckCircle2, Star } from 'lucide-react';

// ── Inline SVG social icons (no external image deps) ──────────────────────────
const FacebookIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="8" fill="#1877F2"/>
    <path
      d="M24.75 18H20.5V28H16.5V18H13.5V14.5H16.5V12.25C16.5 9.38 18.13 7.75 20.76 7.75C21.52 7.75 22.38 7.87 23.25 8V11.25H21.5C20.25 11.25 20.5 11.88 20.5 12.63V14.5H23.75L24.75 18Z"
      fill="white"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="107%" r="130%">
        <stop offset="0%" stopColor="#ffd600"/>
        <stop offset="20%" stopColor="#ff7a00"/>
        <stop offset="40%" stopColor="#ff0069"/>
        <stop offset="70%" stopColor="#d300c5"/>
        <stop offset="100%" stopColor="#7638fa"/>
      </radialGradient>
    </defs>
    <rect width="36" height="36" rx="8" fill="url(#ig-grad)"/>
    <rect x="10" y="10" width="16" height="16" rx="5" stroke="white" strokeWidth="1.8" fill="none"/>
    <circle cx="18" cy="18" r="4" stroke="white" strokeWidth="1.8" fill="none"/>
    <circle cx="23.5" cy="12.5" r="1.1" fill="white"/>
  </svg>
);

const XIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="8" fill="#000"/>
    <path
      d="M20.18 16.7L26.38 9.5H24.88L19.5 15.77L15.18 9.5H9.75L16.25 18.97L9.75 26.5H11.25L16.93 19.93L21.5 26.5H26.93L20.18 16.7ZM17.68 19.07L17.01 18.1L11.8 10.63H14.45L18.27 16.14L18.94 17.11L24.39 24.93H21.74L17.68 19.07Z"
      fill="white"
    />
  </svg>
);
// ──────────────────────────────────────────────────────────────────────────────

export default function Newsletter() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setSubscribed(true);
      setIsSubmitting(false);
      setNewsletterEmail('');

      setTimeout(() => {
        setSubscribed(false);
      }, 4000);
    }, 800);
  };

  return (
    <div className="nm-page">
      <style>{styles}</style>
      <Navbar />

      <main className="nm-shell">
        <section className="nm-hero">
          <div className="nm-hero-copy">
            <div className="nm-kicker">
              <Sparkles size={14} />
              Newsletter & insights
            </div>
            <h1>NM Tech Newsletter</h1>
            <p>
              Weekly insights, repair tips, Windows guides, cloud advice, and the latest tech news
              from South Africa — wrapped in a clean dashboard-style layout.
            </p>

            <div className="nm-hero-actions">
              <a href="#subscribe" className="nm-btn nm-btn--primary">
                Subscribe now <ArrowRight size={16} />
              </a>
              <a href="#articles" className="nm-btn nm-btn--ghost">
                Browse articles
              </a>
            </div>

            <div className="nm-trust-row">
              <div className="nm-trust-item"><Clock size={16} /> Weekly updates</div>
              <div className="nm-trust-item"><ShieldCheck size={16} /> Inbox respect</div>
              <div className="nm-trust-item"><TrendingUp size={16} /> Practical tips</div>
              <div className="nm-trust-item"><Newspaper size={16} /> Tech news</div>
            </div>
          </div>

          <div className="nm-hero-panel">
            <div className="nm-hero-panel-top">
              <div>
                <p className="nm-mini-label">Newsletter status</p>
                <h2>Useful, clear, and easy to scan.</h2>
              </div>
              <div className="nm-hero-chip">
                <Mail size={14} />
                Active
              </div>
            </div>

            <div className="nm-stats-grid">
              <div className="nm-stat-card">
                <span>Issues sent</span>
                <strong>48</strong>
              </div>
              <div className="nm-stat-card">
                <span>Subscribers</span>
                <strong>856</strong>
              </div>
              <div className="nm-stat-card">
                <span>Open rate</span>
                <strong>61%</strong>
              </div>
              <div className="nm-stat-card">
                <span>Avg. read time</span>
                <strong>4 min</strong>
              </div>
            </div>

            <div className="nm-hero-panel-bottom">
              <div className="nm-hero-check">
                <CheckCircle2 size={16} />
                No spam
              </div>
              <div className="nm-hero-check">
                <Star size={16} />
                Curated content
              </div>
            </div>
          </div>
        </section>

        <section id="subscribe" className="nm-section nm-section--split">
          {!subscribed ? (
            <div className="nm-subscribe-card">
              <div className="nm-section-tag">Subscribe</div>
              <h2>Subscribe to Our Newsletter</h2>
              <p>
                Get the latest tech tips, repair guides, and special offers delivered straight to
                your inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="nm-subscribe-form">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="nm-input"
                />
                <button type="submit" disabled={isSubmitting} className="nm-btn nm-btn--primary nm-btn--full">
                  {isSubmitting ? 'Subscribing...' : 'Subscribe now'}
                </button>
              </form>

              <p className="nm-fineprint">
                You can unsubscribe at any time. We respect your inbox.
              </p>
            </div>
          ) : (
            <div className="nm-success-card">
              <div className="nm-success-icon">✅</div>
              <h2>Thank You for Subscribing!</h2>
              <p>You&apos;ll now receive our weekly tech newsletter with useful tips and updates.</p>
            </div>
          )}

          <div className="nm-side-panel">
            <div className="nm-section-tag nm-section-tag--dark">Why subscribe</div>
            <div className="nm-side-list">
              <div className="nm-side-item">
                <div className="nm-side-icon">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <strong>Repair insights</strong>
                  <span>Learn how to protect your devices and data.</span>
                </div>
              </div>
              <div className="nm-side-item">
                <div className="nm-side-icon">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <strong>Upgrade tips</strong>
                  <span>Make old laptops feel new again.</span>
                </div>
              </div>
              <div className="nm-side-item">
                <div className="nm-side-icon">
                  <Newspaper size={16} />
                </div>
                <div>
                  <strong>Fresh articles</strong>
                  <span>Short, clear, and practical tech reads.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="articles" className="nm-section">
          <div className="nm-section-head">
            <div>
              <div className="nm-section-tag">Latest articles</div>
              <h2>Recent Reads</h2>
            </div>
            <p>Clean cards with stronger spacing and dashboard-style hierarchy.</p>
          </div>

          <div className="nm-article-grid">
            <article className="nm-article-card">
              <div className="nm-article-date">April 8, 2026</div>
              <h3>How to Safely Upgrade from Windows 10 to Windows 11 in 2026</h3>
              <p>Step-by-step guide with common pitfalls and performance tips for South African users.</p>
              <a href="#" className="nm-link-btn">
                Read full article <ArrowRight size={16} />
              </a>
            </article>

            <article className="nm-article-card">
              <div className="nm-article-date">April 1, 2026</div>
              <h3>Best Budget SSD Upgrades for Old Laptops in 2026</h3>
              <p>Real-world speed tests and recommendations under R800.</p>
              <a href="#" className="nm-link-btn">
                Read full article <ArrowRight size={16} />
              </a>
            </article>
          </div>

          <div className="nm-article-footer">
            More helpful articles coming soon...
          </div>
        </section>

        <footer className="nm-footer">
          <div>
            <h3>NM Computer Care</h3>
            <p>South Africa • Professional Tech Support</p>
          </div>

          <div className="nm-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
              <XIcon />
            </a>
          </div>

          <p className="nm-footer-copy">© 2026 All Rights Reserved</p>
        </footer>
      </main>
    </div>
  );
}

const styles = `
:root{
  --bg:#f5f7fb;
  --surface:#ffffff;
  --surface-2:#f8fafc;
  --border:#e2e8f0;
  --text:#0f172a;
  --muted:#64748b;
  --blue:#2563eb;
  --indigo:#4f46e5;
  --gold:#f59e0b;
  --shadow:0 12px 30px rgba(15,23,42,.08);
}

*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,system-ui,Arial,sans-serif}
img{max-width:100%;display:block}
button,input,select,textarea{font:inherit}
a{color:inherit;text-decoration:none}

.nm-page{min-height:100vh;background:radial-gradient(circle at top, rgba(37,99,235,.08), transparent 24%), linear-gradient(180deg,#f8fafc 0%,#eef2ff 100%)}
.nm-shell{max-width:1240px;margin:0 auto;padding:1.5rem 1.25rem 5rem}

.nm-hero{
  display:grid;
  grid-template-columns:1.15fr .85fr;
  gap:1.25rem;
  padding:1.25rem;
  border:1px solid rgba(226,232,240,.9);
  border-radius:28px;
  background:linear-gradient(135deg, rgba(255,255,255,.95), rgba(248,250,252,.88));
  box-shadow:var(--shadow);
}
.nm-hero-copy{padding:1rem}
.nm-kicker,.nm-section-tag{
  display:inline-flex;
  align-items:center;
  gap:.5rem;
  border-radius:999px;
  padding:.45rem .8rem;
  background:rgba(37,99,235,.09);
  color:var(--blue);
  font-size:.78rem;
  font-weight:800;
  letter-spacing:.04em;
}
.nm-section-tag--dark{
  background:rgba(255,255,255,.09);
  color:#e2e8f0;
}
.nm-hero-copy h1{
  margin:1rem 0 .75rem;
  font-size:clamp(2.8rem, 5vw, 5.6rem);
  line-height:.95;
  letter-spacing:-.06em;
  background:linear-gradient(135deg,#0f172a 10%, #2563eb 55%, #4f46e5 100%);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.nm-hero-copy p{
  margin:0;
  color:var(--muted);
  font-size:1.05rem;
  line-height:1.7;
  max-width:60ch;
}
.nm-hero-actions{
  display:flex;
  flex-wrap:wrap;
  gap:.85rem;
  margin-top:1.5rem;
}
.nm-btn{
  border:none;
  border-radius:16px;
  padding:.95rem 1.15rem;
  font-weight:800;
  cursor:pointer;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:.55rem;
  transition:transform .18s ease, box-shadow .18s ease, background-color .18s ease, border-color .18s ease;
}
.nm-btn:hover{transform:translateY(-1px)}
.nm-btn--primary{
  background:linear-gradient(135deg,var(--blue),var(--indigo));
  color:#fff;
  box-shadow:0 16px 28px rgba(37,99,235,.22);
}
.nm-btn--ghost{
  background:#fff;
  color:var(--text);
  border:1px solid var(--border);
}
.nm-btn--gold{
  background:linear-gradient(135deg,#fbbf24,#f59e0b);
  color:#111827;
}
.nm-btn--full{width:100%}

.nm-trust-row{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:.75rem;
  margin-top:1.4rem;
}
.nm-trust-item{
  display:flex;
  align-items:center;
  gap:.5rem;
  padding:.75rem .85rem;
  border-radius:16px;
  border:1px solid var(--border);
  background:rgba(255,255,255,.72);
  font-size:.9rem;
  color:#334155;
  box-shadow:0 6px 16px rgba(15,23,42,.04);
}

.nm-hero-panel{
  border-radius:24px;
  border:1px solid var(--border);
  background:linear-gradient(180deg,#0f172a 0%, #111827 100%);
  color:#fff;
  padding:1.2rem;
  box-shadow:var(--shadow);
}
.nm-hero-panel-top{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:1rem;
}
.nm-mini-label{
  margin:0 0 .35rem;
  text-transform:uppercase;
  letter-spacing:.12em;
  font-size:.72rem;
  color:#94a3b8;
  font-weight:800;
}
.nm-hero-panel h2{
  margin:0;
  font-size:1.35rem;
  line-height:1.2;
  letter-spacing:-.03em;
}
.nm-hero-chip{
  display:inline-flex;
  align-items:center;
  gap:.4rem;
  padding:.45rem .7rem;
  border-radius:999px;
  background:rgba(255,255,255,.08);
  color:#e2e8f0;
  font-size:.78rem;
  white-space:nowrap;
}
.nm-stats-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:.8rem;
  margin-top:1rem;
}
.nm-stat-card{
  padding:1rem;
  border-radius:18px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.08);
}
.nm-stat-card span{
  display:block;
  color:#94a3b8;
  font-size:.78rem;
  margin-bottom:.3rem;
}
.nm-stat-card strong{
  font-size:1.05rem;
  font-weight:800;
}
.nm-hero-panel-bottom{
  display:flex;
  gap:.75rem;
  margin-top:1rem;
  flex-wrap:wrap;
}
.nm-hero-check{
  display:inline-flex;
  align-items:center;
  gap:.45rem;
  padding:.7rem .85rem;
  border-radius:14px;
  background:rgba(255,255,255,.06);
  color:#e2e8f0;
  font-size:.9rem;
}

.nm-section{
  margin-top:1.2rem;
  padding:1.25rem;
  border-radius:28px;
  border:1px solid rgba(226,232,240,.9);
  background:rgba(255,255,255,.92);
  box-shadow:var(--shadow);
}
.nm-section--split{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:1.25rem;
  align-items:center;
}
.nm-section-head{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:1rem;
  margin-bottom:1rem;
}
.nm-section-head h2{
  margin:.4rem 0 0;
  font-size:clamp(1.7rem, 2.5vw, 2.5rem);
  letter-spacing:-.04em;
  line-height:1.05;
}
.nm-section-head p,
.nm-subscribe-card p,
.nm-section-copy p,
.nm-contact-copy p{
  margin:0;
  color:var(--muted);
  max-width:54ch;
  line-height:1.7;
}
.nm-subscribe-card,
.nm-side-panel,
.nm-success-card{
  border-radius:24px;
  border:1px solid var(--border);
  background:#fff;
  box-shadow:var(--shadow);
  padding:1.25rem;
}
.nm-subscribe-card h2,
.nm-success-card h2{
  margin:.8rem 0 .4rem;
  font-size:2rem;
  letter-spacing:-.04em;
}
.nm-subscribe-form{
  display:grid;
  gap:.8rem;
  margin-top:1rem;
}
.nm-input{
  width:100%;
  border:1px solid #cbd5e1;
  background:#fff;
  color:#0f172a;
  border-radius:16px;
  padding:1rem 1rem;
  outline:none;
  transition:border-color .18s ease, box-shadow .18s ease;
}
.nm-input:focus{
  border-color:rgba(37,99,235,.55);
  box-shadow:0 0 0 4px rgba(37,99,235,.12);
}
.nm-fineprint{
  margin-top:.75rem;
  color:var(--muted);
  font-size:.85rem;
}
.nm-success-card{
  text-align:center;
  background:linear-gradient(135deg,#f0fdf4,#ecfdf5);
  border-color:#bbf7d0;
}
.nm-success-icon{
  width:84px;
  height:84px;
  margin:0 auto 1rem;
  border-radius:999px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:2.6rem;
  background:#dcfce7;
}
.nm-side-list{
  display:grid;
  gap:.85rem;
  margin-top:1rem;
}
.nm-side-item{
  display:flex;
  gap:.85rem;
  align-items:flex-start;
  padding:.9rem 1rem;
  border-radius:18px;
  border:1px solid var(--border);
  background:#f8fafc;
}
.nm-side-icon{
  width:38px;
  height:38px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  background:linear-gradient(135deg,var(--blue),var(--indigo));
  flex-shrink:0;
}
.nm-side-item strong{
  display:block;
  margin:0 0 .15rem;
}
.nm-side-item span{
  display:block;
  color:var(--muted);
  font-size:.9rem;
  line-height:1.55;
}

.nm-article-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:1rem;
}
.nm-article-card{
  padding:1.25rem;
  border-radius:24px;
  border:1px solid var(--border);
  background:#fff;
  box-shadow:var(--shadow);
  transition:transform .18s ease, box-shadow .18s ease;
}
.nm-article-card:hover{
  transform:translateY(-2px);
  box-shadow:0 18px 34px rgba(15,23,42,.10);
}
.nm-article-date{
  color:var(--blue);
  font-size:.85rem;
  font-weight:700;
  margin-bottom:.55rem;
}
.nm-article-card h3{
  margin:0 0 .7rem;
  font-size:1.35rem;
  letter-spacing:-.03em;
  line-height:1.25;
}
.nm-article-card p{
  margin:0 0 1rem;
  color:var(--muted);
  line-height:1.7;
}
.nm-link-btn{
  display:inline-flex;
  align-items:center;
  gap:.35rem;
  color:var(--blue);
  font-weight:800;
}
.nm-article-footer{
  margin-top:1rem;
  text-align:center;
  color:var(--muted);
}

.nm-footer{
  margin-top:1.2rem;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  padding:1.2rem 1.3rem;
  border-radius:24px;
  background:#fff;
  border:1px solid var(--border);
  box-shadow:var(--shadow);
}
.nm-footer h3{
  margin:0;
  font-size:1.25rem;
}
.nm-footer p{
  margin:.25rem 0 0;
  color:var(--muted);
}
.nm-socials{
  display:flex;
  gap:.85rem;
  align-items:center;
}
.nm-socials a{
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  transition:transform .18s ease, opacity .18s ease;
}
.nm-socials a:hover{
  transform:translateY(-2px) scale(1.05);
  opacity:.88;
}
.nm-footer-copy{
  margin:0;
  color:var(--muted);
}

@media (max-width: 1080px){
  .nm-hero,
  .nm-section--split{
    grid-template-columns:1fr;
  }
  .nm-trust-row{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
  .nm-article-grid{
    grid-template-columns:1fr;
  }
}

@media (max-width: 767px){
  .nm-shell{padding:1rem .9rem 4rem}
  .nm-hero{padding:1rem}
  .nm-hero-copy{padding:.25rem}
  .nm-hero-copy h1{font-size:2.9rem}
  .nm-trust-row{
    grid-template-columns:1fr;
  }
  .nm-stats-grid{
    grid-template-columns:1fr 1fr;
  }
  .nm-footer{
    flex-direction:column;
    text-align:center;
  }
}
`;
