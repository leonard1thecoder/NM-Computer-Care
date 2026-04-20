'use client';

import Navbar from '../components/Navbar';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Star,
  Clock,
  Shield,
  Award,
  CheckCircle,
  MessageCircle,
  X,
  Send,
  Sparkles,
  Laptop,
  HardDrive,
  Cloud,
  Server,
  ArrowRight,
  BadgeCheck,
  Zap,
  Users,
  TriangleAlert,
  CircleDollarSign,
  Headphones,
  Activity,
} from 'lucide-react';

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
      <radialGradient id="ig-grad-home" cx="30%" cy="107%" r="130%">
        <stop offset="0%" stopColor="#ffd600"/>
        <stop offset="20%" stopColor="#ff7a00"/>
        <stop offset="40%" stopColor="#ff0069"/>
        <stop offset="70%" stopColor="#d300c5"/>
        <stop offset="100%" stopColor="#7638fa"/>
      </radialGradient>
    </defs>
    <rect width="36" height="36" rx="8" fill="url(#ig-grad-home)"/>
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

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type Testimonial = {
  name: string;
  location: string;
  text: string;
  rating: number;
};

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState<{ show: boolean; success: boolean }>({ show: false, success: true });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot' as const, text: "Hi! 👋 I'm NM Bot. How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    { name: 'Sipho Mkhize', location: 'Durban', text: "They upgraded my old laptop with SSD and RAM. It's now faster than my new one!", rating: 5 },
    { name: 'Nomsa Dlamini', location: 'Johannesburg', text: 'Fixed my Windows 10 to 11 upgrade perfectly. Professional and honest service.', rating: 5 },
    { name: 'Thabo Nkosi', location: 'Cape Town', text: 'Excellent AWS S3 backup setup for my small business. Very knowledgeable team.', rating: 5 },
    { name: 'Zanele Buthelezi', location: 'Pretoria', text: 'Quick repair on my laptop screen. Done same day and at a fair price.', rating: 5 },
    { name: 'Lucky Mthembu', location: 'Bloemfontein', text: "Best performance upgrade I've ever had. My gaming laptop now runs smoothly.", rating: 5 },
    { name: 'Amahle Ngcobo', location: 'Pietermaritzburg', text: 'They recovered all my important files after a hard drive failure. Lifesavers!', rating: 5 },
    { name: 'Sibusiso Khumalo', location: 'Polokwane', text: 'Great customer service and clear explanations. Will definitely use again.', rating: 5 },
    { name: 'Lindiwe Malinga', location: 'East London', text: 'Set up AWS EC2 for my small business. Made remote work so much easier.', rating: 5 },
    { name: 'Bongani Zulu', location: 'Kimberley', text: 'Fast and reliable. Fixed my overheating issue in under an hour.', rating: 5 },
    { name: 'Nomvula Mdluli', location: 'Mbombela', text: 'Professional team. They helped me understand everything clearly.', rating: 5 },
  ];

  const serviceCards = useMemo(
    () => [
      { icon: Laptop, title: 'Laptop & PC Repairs', desc: 'Screen replacement, keyboard fixes, overheating issues, virus removal & more.', badge: 'Fast turnaround' },
      { icon: Zap, title: 'Windows Upgrades', desc: 'Clean upgrade from Windows 7/8/10 to Windows 11 with safe backup checks.', badge: 'Secure process' },
      { icon: HardDrive, title: 'Hardware Upgrades', desc: 'RAM, SSD, cleaning & performance boosts for older and newer devices.', badge: 'Performance boost' },
      { icon: Cloud, title: 'AWS S3 Backup', desc: 'Secure automatic cloud backups for files and business critical data.', badge: 'Cloud protection' },
      { icon: Server, title: 'AWS EC2 Servers', desc: 'Cloud hosting setup for businesses that need scalable infrastructure.', badge: 'Scalable hosting' },
      { icon: Headphones, title: 'Data Recovery', desc: 'Recover lost files safely with expert diagnostics and recovery workflows.', badge: 'Careful recovery' },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMessages]);

  const validateField = (name: keyof FormState, value: string) => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: true }));
      return false;
    }
    setErrors((prev) => ({ ...prev, [name]: false }));
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormState;
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) validateField(key, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    (Object.keys(formData) as (keyof FormState)[]).forEach((key) => {
      if (!validateField(key, formData[key])) valid = false;
    });
    if (!valid) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    setIsSubmitting(false);
    setPopup({ show: true, success: true });
    setFormData(initialForm);
    setErrors({});
  };

  const closePopup = () => setPopup({ show: false, success: true });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 2000);
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;
    setChatMessages((prev) => [...prev, { type: 'user', text: userInput }]);
    const query = userInput.toLowerCase();
    setTimeout(() => {
      let reply = 'Thank you! Our team will reply shortly.';
      if (query.includes('price') || query.includes('pricing')) reply = 'Plans start from R299. Want me to show you the best option?';
      else if (query.includes('windows') || query.includes('upgrade')) reply = 'Yes, we do clean Windows upgrades with backup checks.';
      else if (query.includes('repair')) reply = 'We handle laptop and PC repairs, diagnostics, and same-day support where possible.';
      setChatMessages((prev) => [...prev, { type: 'bot', text: reply }]);
    }, 700);
    setUserInput('');
  };

  return (
    <div className="nm-page">
      <style>{styles}</style>
      <Navbar />

      <main className="nm-shell">
        <section className="nm-hero">
          <div className="nm-hero-copy">
            <div className="nm-kicker"><Sparkles size={14} /> Dashboard-style tech care</div>
            <h1>NM Computer Care</h1>
            <p>
              Fast repairs, performance upgrades, cloud solutions, and a clean client experience built to feel as polished as an admin dashboard.
            </p>
            <div className="nm-hero-actions">
              <a href="#services" className="nm-btn nm-btn--primary">View Services <ArrowRight size={16} /></a>
              <a href="#pricing" className="nm-btn nm-btn--ghost">Pricing Plans</a>
            </div>
            <div className="nm-trust-row">
              <div className="nm-trust-item"><Clock size={16} /> Fast turnaround</div>
              <div className="nm-trust-item"><Shield size={16} /> Data protection</div>
              <div className="nm-trust-item"><Award size={16} /> Satisfaction focus</div>
              <div className="nm-trust-item"><BadgeCheck size={16} /> Certified technicians</div>
            </div>
          </div>

          <div className="nm-hero-panel">
            <div className="nm-hero-panel-top">
              <div>
                <p className="nm-mini-label">Live support</p>
                <h2>Everything feels structured, clear, and premium.</h2>
              </div>
              <div className="nm-hero-chip"><Activity size={14} /> Online</div>
            </div>
            <div className="nm-stats-grid">
              <div className="nm-stat-card"><span>Projects</span><strong>214</strong></div>
              <div className="nm-stat-card"><span>Subscribers</span><strong>856</strong></div>
              <div className="nm-stat-card"><span>Response time</span><strong>Under 2h</strong></div>
              <div className="nm-stat-card"><span>Support score</span><strong>4.9/5</strong></div>
            </div>
            <div className="nm-hero-panel-bottom">
              <div className="nm-hero-check"><CircleDollarSign size={16} /> Honest pricing</div>
              <div className="nm-hero-check"><TriangleAlert size={16} /> Safer diagnostics</div>
            </div>
          </div>
        </section>

        <section className="nm-strip">
          <div className="nm-strip-card"><Users size={18} /><div><strong>Trusted by South Africans</strong><span>Small business, students, and home users</span></div></div>
          <div className="nm-strip-card"><Shield size={18} /><div><strong>Secure workflows</strong><span>Backup-first approach on every repair</span></div></div>
          <div className="nm-strip-card"><Zap size={18} /><div><strong>Performance uplift</strong><span>Upgrade aging devices without the chaos</span></div></div>
        </section>

        <section id="about" className="nm-section nm-section--split">
          <div className="nm-section-copy">
            <div className="nm-section-tag">About us</div>
            <h2>Expert Tech Care in South Africa</h2>
            <p>We fix, upgrade, and future-proof your computers and laptops with honesty, speed, and a premium support flow that matches the rest of the project.</p>
            <div className="nm-quote"><p>"Reliable service with honest pricing."</p><span>— Satisfied Customer, Durban</span></div>
          </div>
          <div className="nm-panel-visual">
            <div className="nm-visual-badge"><Laptop size={16} /> Modern repair experience</div>
            <div className="nm-visual-stack">
              <div className="nm-visual-card"><strong>Assessment</strong><span>We inspect, diagnose, and plan the right fix.</span></div>
              <div className="nm-visual-card"><strong>Repair</strong><span>Fast hands-on support with clear communication.</span></div>
              <div className="nm-visual-card"><strong>Follow-up</strong><span>We make sure the device stays stable and secure.</span></div>
            </div>
          </div>
        </section>

        <section id="vision" className="nm-section nm-section--split nm-section--alt">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" alt="Vision" className="nm-image" />
          <div className="nm-section-copy">
            <div className="nm-section-tag">Vision</div>
            <h2>Our Vision</h2>
            <p>To be the most trusted and innovative tech care partner in South Africa.</p>
          </div>
        </section>

        <section id="mission" className="nm-section nm-section--split">
          <div className="nm-section-copy">
            <div className="nm-section-tag">Mission</div>
            <h2>Our Mission</h2>
            <p>To deliver fast, honest, and expert computer and laptop support.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80" alt="Mission" className="nm-image" />
        </section>

        <section id="values" className="nm-section nm-section--split nm-section--alt">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" alt="Core Values" className="nm-image" />
          <div className="nm-section-copy">
            <div className="nm-section-tag">Values</div>
            <h2>Our Core Values</h2>
            <div className="nm-values">
              <div><strong>Reliability</strong><span>We do what we promise</span></div>
              <div><strong>Integrity</strong><span>Honest pricing and clear communication</span></div>
              <div><strong>Customer Care</strong><span>Every client is treated like family</span></div>
              <div><strong>Expertise</strong><span>We keep learning the latest technology</span></div>
              <div><strong>Affordability</strong><span>Quality support for everyone</span></div>
            </div>
          </div>
        </section>

        <section id="services" className="nm-section">
          <div className="nm-section-head">
            <div><div className="nm-section-tag">Services</div><h2>Our Services</h2></div>
            <p>Beautiful, fast, and practical service cards that match the dashboard aesthetic.</p>
          </div>
          <div className="nm-service-grid">
            {serviceCards.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="nm-service-card">
                  <div className="nm-service-top"><div className="nm-service-icon"><Icon size={18} /></div><span>{service.badge}</span></div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <button onClick={() => setShowModal(true)} className="nm-link-btn">Learn More <ArrowRight size={16} /></button>
                </div>
              );
            })}
          </div>
        </section>

        <section id="pricing" className="nm-section">
          <div className="nm-section-head">
            <div><div className="nm-section-tag">Pricing</div><h2>Our Pricing Plans</h2></div>
            <p>Clear cards with strong hierarchy, like a polished admin dashboard.</p>
          </div>
          <div className="nm-pricing-grid">
            <div className="nm-price-card">
              <div className="nm-price-top"><div className="nm-price-icon"><Laptop size={18} /></div><div><h3>Basic Care</h3><p>Home users, students, small SOHO</p></div></div>
              <ul><li>• Troubleshooting & diagnostics</li><li>• Software fixes & virus removal</li><li>• Windows 7/10 → 11 upgrades</li><li>• Basic performance tune-up</li></ul>
              <div className="nm-price-amount"><strong>R299 – R399</strong><span>One-time setup: R250</span></div>
              <a href="/register" className="nm-btn nm-btn--primary nm-btn--full">Choose Basic Care</a>
            </div>
            <div className="nm-price-card nm-price-card--featured">
              <div className="nm-badge">MOST POPULAR</div>
              <div className="nm-price-top"><div className="nm-price-icon"><Sparkles size={18} /></div><div><h3>Performance Care</h3><p>Gamers, freelancers, small offices</p></div></div>
              <ul><li>• Everything in Basic Care</li><li>• Hardware diagnosis & upgrades</li><li>• Data backup & recovery</li><li>• Full system optimization</li></ul>
              <div className="nm-price-amount"><strong>R499 – R699</strong><span>One-time setup: R450</span></div>
              <a href="/register" className="nm-btn nm-btn--primary nm-btn--full">Choose Performance Care</a>
            </div>
            <div className="nm-price-card">
              <div className="nm-price-top"><div className="nm-price-icon"><Server size={18} /></div><div><h3>Business Care</h3><p>Small businesses (5–20 devices)</p></div></div>
              <ul><li>• Everything in Performance Care</li><li>• On-site or remote support (2 hours/month)</li><li>• Network setup & Wi-Fi optimization</li><li>• Preventive maintenance</li></ul>
              <div className="nm-price-amount"><strong>R899 – R1,299</strong><span>One-time setup: R750</span></div>
              <a href="/register" className="nm-btn nm-btn--primary nm-btn--full">Choose Business Care</a>
            </div>
          </div>
        </section>

        <section id="founders" className="nm-section">
          <div className="nm-section-head">
            <div><div className="nm-section-tag">Founders</div><h2>Meet Our Co-Founders</h2></div>
            <p>Faces behind the brand, presented in a structured layout.</p>
          </div>
          <div className="nm-founders-grid">
            <div className="nm-founder-card">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Sizolwakhe" />
              <h3>Sizolwakhe Leonard Mthimunye</h3>
              <span>Founder & Technical Director</span>
            </div>
            <div className="nm-founder-card">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" alt="Thandeka" />
              <h3>Thandeka Mthimunye</h3>
              <span>Co-Founder & Operations Director</span>
            </div>
          </div>
        </section>

        <section className="nm-section">
          <div className="nm-section-head">
            <div><div className="nm-section-tag">Testimonials</div><h2>What Our Customers Say</h2></div>
            <p>Rotating testimonials in a clean carousel card.</p>
          </div>
          <div className="nm-testimonial-shell">
            <div className="nm-testimonial-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={`${testimonial.name}-${testimonial.location}`} className="nm-testimonial-slide">
                  <div className="nm-testimonial-card">
                    <div className="nm-stars">{[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="nm-star" />)}</div>
                    <p>"{testimonial.text}"</p>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="nm-section nm-section--split nm-section--contact">
          <div className="nm-contact-copy">
            <div className="nm-section-tag">Contact</div>
            <h2>Ready to Fix or Upgrade Your Tech?</h2>
            <p>Get a free diagnosis or book your service today.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate className="nm-form-card">
            <div className="nm-form-grid">
              <input name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} className={errors.name ? 'nm-input nm-input--error' : 'nm-input'} required />
              <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className={errors.email ? 'nm-input nm-input--error' : 'nm-input'} required />
              <input name="phone" placeholder="Phone / WhatsApp" value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'nm-input nm-input--error' : 'nm-input'} />
              <select name="service" value={formData.service} onChange={handleInputChange} className={errors.service ? 'nm-input nm-input--error' : 'nm-input'}>
                <option value="">Select Service</option>
                <option value="Basic Care">Basic Care</option>
                <option value="Performance Care">Performance Care</option>
                <option value="Business Care">Business Care</option>
              </select>
            </div>
            <textarea name="message" placeholder="Describe your problem..." rows={5} value={formData.message} onChange={handleInputChange} className={errors.message ? 'nm-input nm-input--error nm-textarea' : 'nm-input nm-textarea'} required />
            {isSubmitting ? (
              <div className="nm-spinner-wrap"><div className="nm-spinner"><span /></div></div>
            ) : (
              <button type="submit" className="nm-btn nm-btn--primary nm-btn--full">Send Message</button>
            )}
          </form>
        </section>

        <section className="nm-newsletter">
          <div className="nm-newsletter-copy">
            <div className="nm-section-tag nm-section-tag--dark">Newsletter</div>
            <h3>Stay Updated</h3>
            <p>Subscribe for tech tips and special offers.</p>
          </div>
          {!subscribed ? (
            <form onSubmit={handleNewsletterSubmit} className="nm-newsletter-form">
              <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="Enter your email" required className="nm-newsletter-input" />
              <button type="submit" className="nm-btn nm-btn--gold">Subscribe</button>
            </form>
          ) : (
            <div className="nm-subscribed">✅ Thank you for subscribing!</div>
          )}
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

      <div className="nm-chat-shell">
        {!isChatOpen ? (
          <button onClick={() => setIsChatOpen(true)} className="nm-chat-launch">
            <MessageCircle size={24} />
            <span>Chat with us</span>
          </button>
        ) : (
          <div className="nm-chat-box">
            <div className="nm-chat-head">
              <div className="nm-chat-head-left">
                <div className="nm-chat-badge">NM</div>
                <div><p>NM Support</p><span>Online now</span></div>
              </div>
              <button onClick={() => setIsChatOpen(false)} aria-label="Close chat"><X size={20} /></button>
            </div>
            <div ref={chatRef} className="nm-chat-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`nm-chat-row ${msg.type === 'user' ? 'nm-chat-row--user' : ''}`}>
                  <div className={`nm-chat-bubble ${msg.type === 'user' ? 'nm-chat-bubble--user' : ''}`}>{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="nm-chat-input-row">
              <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type your message..." className="nm-chat-input" />
              <button onClick={sendMessage} className="nm-chat-send" aria-label="Send message"><Send size={18} /></button>
            </div>
          </div>
        )}
      </div>

      {popup.show && (
        <div className="nm-modal-backdrop">
          <div className="nm-modal-card">
            <div className={`nm-modal-icon ${popup.success ? 'nm-modal-icon--success' : 'nm-modal-icon--error'}`}>{popup.success ? '😊' : '😠'}</div>
            <h3>{popup.success ? 'Request Sent!' : 'Request Failed'}</h3>
            <p>{popup.success ? 'Your message has been sent successfully. We will get back to you soon.' : 'Something went wrong. Please try again later.'}</p>
            <button onClick={closePopup} className="nm-btn nm-btn--primary nm-btn--full">Close</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="nm-modal-backdrop">
          <div className="nm-modal-card nm-modal-card--simple">
            <h3>Service Details</h3>
            <p>Our expert team will provide a full diagnosis and clear quote.</p>
            <button onClick={() => setShowModal(false)} className="nm-btn nm-btn--primary nm-btn--full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = `
:root{--bg:#f5f7fb;--surface:#ffffff;--surface-2:#f8fafc;--border:#e2e8f0;--text:#0f172a;--muted:#64748b;--blue:#2563eb;--indigo:#4f46e5;--gold:#f59e0b;--shadow:0 12px 30px rgba(15,23,42,.08)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,system-ui,Arial,sans-serif}img{max-width:100%;display:block}button,input,select,textarea{font:inherit}a{color:inherit;text-decoration:none}
.nm-page{min-height:100vh;background:radial-gradient(circle at top, rgba(37,99,235,.08), transparent 24%), linear-gradient(180deg,#f8fafc 0%,#eef2ff 100%)}
.nm-shell{max-width:1240px;margin:0 auto;padding:1.5rem 1.25rem 5rem}
.nm-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:1.25rem;padding:1.25rem;border:1px solid rgba(226,232,240,.9);border-radius:28px;background:linear-gradient(135deg, rgba(255,255,255,.95), rgba(248,250,252,.88));box-shadow:var(--shadow)}
.nm-hero-copy{padding:1rem}
.nm-kicker,.nm-section-tag{display:inline-flex;align-items:center;gap:.5rem;border-radius:999px;padding:.45rem .8rem;background:rgba(37,99,235,.09);color:var(--blue);font-size:.78rem;font-weight:800;letter-spacing:.04em}.nm-section-tag--dark{background:rgba(255,255,255,.09);color:#e2e8f0}
.nm-hero-copy h1{margin:1rem 0 .75rem;font-size:clamp(2.8rem, 5vw, 5.6rem);line-height:.95;letter-spacing:-.06em;background:linear-gradient(135deg,#0f172a 10%, #2563eb 55%, #4f46e5 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.nm-hero-copy p{margin:0;color:var(--muted);font-size:1.05rem;line-height:1.7;max-width:60ch}
.nm-hero-actions{display:flex;flex-wrap:wrap;gap:.85rem;margin-top:1.5rem}
.nm-btn{border:none;border-radius:16px;padding:.95rem 1.15rem;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:.55rem;transition:transform .18s ease, box-shadow .18s ease, background-color .18s ease, border-color .18s ease}.nm-btn:hover{transform:translateY(-1px)}
.nm-btn--primary{background:linear-gradient(135deg,var(--blue),var(--indigo));color:#fff;box-shadow:0 16px 28px rgba(37,99,235,.22)}
.nm-btn--ghost{background:#fff;color:var(--text);border:1px solid var(--border)}
.nm-btn--gold{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#111827}
.nm-btn--full{width:100%}
.nm-trust-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.75rem;margin-top:1.4rem}
.nm-trust-item{display:flex;align-items:center;gap:.5rem;padding:.75rem .85rem;border-radius:16px;border:1px solid var(--border);background:rgba(255,255,255,.72);font-size:.9rem;color:#334155;box-shadow:0 6px 16px rgba(15,23,42,.04)}
.nm-hero-panel{border-radius:24px;border:1px solid var(--border);background:linear-gradient(180deg,#0f172a 0%, #111827 100%);color:#fff;padding:1.2rem;box-shadow:var(--shadow)}
.nm-hero-panel-top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}.nm-mini-label{margin:0 0 .35rem;text-transform:uppercase;letter-spacing:.12em;font-size:.72rem;color:#94a3b8;font-weight:800}.nm-hero-panel h2{margin:0;font-size:1.35rem;line-height:1.2;letter-spacing:-.03em}.nm-hero-chip{display:inline-flex;align-items:center;gap:.4rem;padding:.45rem .7rem;border-radius:999px;background:rgba(255,255,255,.08);color:#e2e8f0;font-size:.78rem;white-space:nowrap}
.nm-stats-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.8rem;margin-top:1rem}.nm-stat-card{padding:1rem;border-radius:18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}.nm-stat-card span{display:block;color:#94a3b8;font-size:.78rem;margin-bottom:.3rem}.nm-stat-card strong{font-size:1.05rem;font-weight:800}
.nm-hero-panel-bottom{display:flex;gap:.75rem;margin-top:1rem;flex-wrap:wrap}.nm-hero-check{display:inline-flex;align-items:center;gap:.45rem;padding:.7rem .85rem;border-radius:14px;background:rgba(255,255,255,.06);color:#e2e8f0;font-size:.9rem}
.nm-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.9rem;margin:1rem 0 1.4rem}.nm-strip-card{display:flex;align-items:center;gap:.8rem;border:1px solid var(--border);background:#fff;border-radius:20px;padding:1rem 1.1rem;box-shadow:var(--shadow)}.nm-strip-card strong{display:block;font-size:.95rem}.nm-strip-card span{display:block;color:var(--muted);font-size:.85rem;margin-top:.15rem}
.nm-section{margin-top:1.2rem;padding:1.25rem;border-radius:28px;border:1px solid rgba(226,232,240,.9);background:rgba(255,255,255,.92);box-shadow:var(--shadow)}.nm-section--alt{background:linear-gradient(135deg,#ffffff 0%, #f8fafc 100%)}.nm-section--split{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;align-items:center}
.nm-section-head{display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;margin-bottom:1rem}.nm-section-head h2,.nm-section-copy h2,.nm-contact-copy h2{margin:.4rem 0 0;font-size:clamp(1.7rem, 2.5vw, 2.5rem);letter-spacing:-.04em;line-height:1.05}.nm-section-head p,.nm-section-copy p,.nm-contact-copy p{margin:0;color:var(--muted);max-width:54ch;line-height:1.7}
.nm-section-copy{padding:1rem}.nm-quote{margin-top:1rem;padding:1rem 1.1rem;border-radius:18px;border:1px solid var(--border);background:#f8fafc}.nm-quote p{margin:0;font-size:1.05rem;color:#111827}.nm-quote span{display:block;margin-top:.4rem;color:var(--muted);font-size:.9rem}
.nm-panel-visual{padding:1rem;border-radius:24px;background:linear-gradient(180deg,#0f172a 0%,#111827 100%);color:#fff}.nm-visual-badge{display:inline-flex;align-items:center;gap:.45rem;border-radius:999px;padding:.45rem .7rem;background:rgba(255,255,255,.08);color:#e2e8f0;font-size:.8rem;font-weight:700}.nm-visual-stack{display:grid;gap:.75rem;margin-top:1rem}.nm-visual-card{padding:1rem;border-radius:18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}.nm-visual-card strong{display:block;font-size:1rem;margin-bottom:.3rem}.nm-visual-card span{color:#cbd5e1;font-size:.92rem;line-height:1.6}
.nm-image{width:100%;height:100%;min-height:320px;object-fit:cover;border-radius:24px;box-shadow:var(--shadow)}
.nm-values{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.85rem;margin-top:1rem}.nm-values div{padding:1rem;border-radius:18px;border:1px solid var(--border);background:#f8fafc}.nm-values strong{display:block;margin-bottom:.25rem}.nm-values span{color:var(--muted);font-size:.9rem}
.nm-service-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.nm-service-card,.nm-price-card,.nm-founder-card,.nm-form-card{border:1px solid var(--border);background:#fff;border-radius:24px;box-shadow:var(--shadow)}.nm-service-card{padding:1.2rem}.nm-service-top{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-bottom:1rem}.nm-service-top span{color:var(--blue);font-size:.78rem;font-weight:800;background:rgba(37,99,235,.09);padding:.42rem .7rem;border-radius:999px}.nm-service-icon{width:42px;height:42px;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(135deg,var(--blue),var(--indigo))}.nm-service-card h3{margin:0;font-size:1.15rem;letter-spacing:-.02em}.nm-service-card p{margin:.65rem 0 0;color:var(--muted);line-height:1.7}.nm-link-btn{margin-top:1rem;border:none;background:transparent;color:var(--blue);font-weight:800;display:inline-flex;align-items:center;gap:.35rem;cursor:pointer;padding:0}
.nm-pricing-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.nm-price-card{padding:1.2rem;position:relative}.nm-price-card--featured{border:2px solid rgba(37,99,235,.45);transform:translateY(-4px)}.nm-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--blue),var(--indigo));color:#fff;font-size:.72rem;letter-spacing:.08em;font-weight:800;padding:.45rem .9rem;border-radius:999px;box-shadow:var(--shadow)}.nm-price-top{display:flex;align-items:center;gap:.9rem;margin-bottom:1rem}.nm-price-icon{width:46px;height:46px;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(135deg,var(--blue),var(--indigo))}.nm-price-top h3{margin:0;font-size:1.25rem}.nm-price-top p{margin:.2rem 0 0;color:var(--muted)}.nm-price-card ul{padding:0;margin:0;list-style:none;display:grid;gap:.7rem;color:#334155;line-height:1.55}.nm-price-amount{margin:1.1rem 0;padding-top:1rem;border-top:1px solid var(--border)}.nm-price-amount strong{display:block;font-size:1.65rem;letter-spacing:-.04em}.nm-price-amount span{display:block;margin-top:.15rem;color:var(--muted);font-size:.88rem}
.nm-founders-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.nm-founder-card{overflow:hidden;text-align:center}.nm-founder-card img{width:100%;height:260px;object-fit:cover}.nm-founder-card h3{margin:1rem 1rem .25rem;font-size:1.2rem}.nm-founder-card span{display:block;padding:0 1rem 1.1rem;color:var(--muted)}
.nm-testimonial-shell{overflow:hidden;border-radius:24px;border:1px solid var(--border);background:#f8fafc}.nm-testimonial-track{display:flex;transition:transform .7s ease-in-out}.nm-testimonial-slide{min-width:100%;padding:1rem}.nm-testimonial-card{max-width:700px;margin:0 auto;background:#fff;border-radius:24px;border:1px solid var(--border);box-shadow:var(--shadow);padding:1.5rem;text-align:center}.nm-stars{display:flex;justify-content:center;gap:.2rem;margin-bottom:1rem}.nm-star{width:20px;height:20px;fill:#facc15;color:#facc15}.nm-testimonial-card p{margin:0;color:#334155;font-size:1.04rem;line-height:1.8;font-style:italic}.nm-testimonial-card strong{display:block;margin-top:1.15rem;font-size:1rem}.nm-testimonial-card span{display:block;color:var(--muted);font-size:.92rem;margin-top:.2rem}
.nm-section--contact{display:grid;grid-template-columns:.8fr 1.2fr;gap:1rem;align-items:start}.nm-contact-copy{padding:1rem}.nm-form-card{padding:1.15rem}.nm-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.85rem;margin-bottom:.85rem}.nm-input{width:100%;border:1px solid #cbd5e1;background:#fff;color:#0f172a;border-radius:16px;padding:1rem 1rem;outline:none;transition:border-color .18s ease, box-shadow .18s ease, transform .18s ease}.nm-input:focus{border-color:rgba(37,99,235,.55);box-shadow:0 0 0 4px rgba(37,99,235,.12)}.nm-input--error{border-color:#ef4444}.nm-textarea{min-height:140px;resize:vertical}.nm-spinner-wrap{display:flex;justify-content:center;padding:1.2rem 0}.nm-spinner{width:58px;height:58px;position:relative}.nm-spinner span{position:absolute;inset:0;border-radius:50%;border:4px solid rgba(37,99,235,.18);border-top-color:var(--blue);animation:nm-spin 1.1s linear infinite}@keyframes nm-spin{to{transform:rotate(360deg)}}
.nm-newsletter{margin-top:1.2rem;border-radius:28px;background:linear-gradient(135deg,#0f172a 0%, #111827 100%);color:#fff;border:1px solid rgba(255,255,255,.08);box-shadow:var(--shadow);padding:1.25rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}.nm-newsletter-copy h3{margin:.35rem 0 .35rem;font-size:1.6rem}.nm-newsletter-copy p{margin:0;color:#cbd5e1}.nm-newsletter-form{display:flex;gap:.75rem;width:min(560px,100%)}.nm-newsletter-input{flex:1;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:#fff;border-radius:16px;padding:1rem 1rem;outline:none}.nm-newsletter-input::placeholder{color:#94a3b8}.nm-subscribed{padding:1rem 1.1rem;border-radius:16px;border:1px solid rgba(34,197,94,.35);background:rgba(34,197,94,.12);color:#86efac;font-weight:700}
.nm-footer{margin-top:1.2rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.2rem 1.3rem;border-radius:24px;background:#fff;border:1px solid var(--border);box-shadow:var(--shadow)}.nm-footer h3{margin:0;font-size:1.25rem}.nm-footer p{margin:.25rem 0 0;color:var(--muted)}.nm-socials{display:flex;gap:.85rem;align-items:center}.nm-socials a{display:flex;align-items:center;justify-content:center;border-radius:10px;transition:transform .18s ease,opacity .18s ease}.nm-socials a:hover{transform:translateY(-2px) scale(1.05);opacity:.88}.nm-footer-copy{margin:0;color:var(--muted)}
.nm-chat-shell{position:fixed;right:1.25rem;bottom:1.25rem;z-index:9999}.nm-chat-launch{display:flex;align-items:center;gap:.7rem;border:none;background:linear-gradient(135deg,var(--blue),var(--indigo));color:#fff;padding:.95rem 1.15rem;border-radius:18px;box-shadow:0 18px 34px rgba(37,99,235,.26);cursor:pointer}.nm-chat-box{width:min(370px, calc(100vw - 2rem));background:#fff;border:1px solid var(--border);border-radius:24px;overflow:hidden;box-shadow:0 24px 50px rgba(15,23,42,.22)}.nm-chat-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem;background:linear-gradient(135deg,var(--blue),var(--indigo));color:#fff}.nm-chat-head-left{display:flex;align-items:center;gap:.75rem}.nm-chat-badge{width:38px;height:38px;border-radius:14px;background:#fff;color:var(--blue);display:flex;align-items:center;justify-content:center;font-weight:900}.nm-chat-head p{margin:0;font-weight:800}.nm-chat-head span{font-size:.78rem;color:#dbeafe}.nm-chat-head button{background:none;border:none;color:#fff;cursor:pointer}.nm-chat-messages{height:320px;overflow-y:auto;padding:1rem;background:#f8fafc;display:flex;flex-direction:column;gap:.8rem}.nm-chat-row{display:flex;justify-content:flex-start}.nm-chat-row--user{justify-content:flex-end}.nm-chat-bubble{max-width:78%;padding:.85rem 1rem;border-radius:18px;background:#fff;border:1px solid var(--border);color:#111827;line-height:1.55}.nm-chat-bubble--user{background:linear-gradient(135deg,var(--blue),var(--indigo));color:#fff;border-color:transparent}.nm-chat-input-row{display:flex;gap:.65rem;padding:1rem;border-top:1px solid var(--border);background:#fff}.nm-chat-input{flex:1;border:1px solid var(--border);border-radius:16px;padding:.95rem 1rem;outline:none}.nm-chat-send{width:46px;height:46px;border:none;border-radius:16px;background:linear-gradient(135deg,var(--blue),var(--indigo));color:#fff;cursor:pointer}
.nm-modal-backdrop{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:1.25rem;background:rgba(15,23,42,.72);backdrop-filter:blur(10px)}.nm-modal-card{width:min(420px,100%);background:#fff;border-radius:28px;border:1px solid var(--border);box-shadow:0 28px 60px rgba(0,0,0,.28);padding:1.6rem;text-align:center}.nm-modal-card--simple{width:min(420px,100%)}.nm-modal-icon{width:86px;height:86px;margin:0 auto 1rem;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:3rem}.nm-modal-icon--success{background:#dcfce7}.nm-modal-icon--error{background:#fee2e2}.nm-modal-card h3{margin:.25rem 0 .5rem;font-size:1.65rem}.nm-modal-card p{margin:0 0 1rem;color:var(--muted);line-height:1.7}
@media (max-width:1080px){.nm-hero,.nm-section--split,.nm-section--contact{grid-template-columns:1fr}.nm-service-grid,.nm-pricing-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.nm-trust-row,.nm-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.nm-values{grid-template-columns:1fr}}
@media (max-width:767px){.nm-shell{padding:1rem .9rem 4rem}.nm-hero{padding:1rem}.nm-hero-copy{padding:.25rem}.nm-hero-copy h1{font-size:2.9rem}.nm-trust-row,.nm-strip,.nm-service-grid,.nm-pricing-grid,.nm-founders-grid,.nm-form-grid{grid-template-columns:1fr}.nm-stats-grid{grid-template-columns:1fr 1fr}.nm-newsletter{flex-direction:column;align-items:stretch}.nm-newsletter-form{flex-direction:column;width:100%}.nm-footer{flex-direction:column;text-align:center}.nm-section-head{flex-direction:column;align-items:flex-start}}
`;
