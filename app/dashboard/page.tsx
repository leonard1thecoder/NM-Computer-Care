'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Settings,
  Rocket,
  Building2,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Laptop,
  X,
  UploadCloud,
  Check,
  LogOut,
  User,
  ChevronRight,
  Layers,
  AlertCircle,
  Search,
  Printer,
  Sparkles,
} from 'lucide-react';

/* ─────────────────────────── Types ─────────────────────────── */

type PlanKey = 'basic' | 'performance' | 'business' | 'consult';
type DeviceType = 'pc' | 'laptop';
type YesNo = 'yes' | 'no';
type PlanStep = 1 | 2 | 3 | 4;
type ViewMode = 'dashboard' | 'account';

type BookingRecord = {
  id: string;
  userId?: string;
  device: string;
  price: string;
  status: string;
  date: string;
  quote?: Quote | null;
};

type Quote = {
  id: string;
  bookingId: string;
  amount: string;
  breakdown: string[];
  acceptedAt: string;
};

/* ─────────────────────────── Plan config ─────────────────────── */

const PLANS = {
  basic: {
    title: 'Basic Care',
    icon: Settings,
    accent: '#2563EB',
    badge: null,
    price: 'R299 – R399',
    setup: 'One-time setup: R250',
    features: [
      'Troubleshooting & diagnostics',
      'Software fixes & virus removal',
      'Windows 7/10 → 11 upgrades',
      'Basic performance tune-up',
    ],
  },
  performance: {
    title: 'Performance Care',
    icon: Rocket,
    accent: '#7C3AED',
    badge: 'Popular',
    price: 'R499 – R699',
    setup: 'One-time setup: R450',
    features: [
      'Everything in Basic Care',
      'Hardware diagnosis & upgrades (RAM, SSD)',
      'Data backup & recovery',
      'Full system optimisation',
    ],
  },
  business: {
    title: 'Business Care',
    icon: Building2,
    accent: '#D97706',
    badge: null,
    price: 'R899 – R1,299',
    setup: 'Per business (or R150/device)',
    features: [
      'Everything in Performance Care',
      'On-site or remote support (2 hrs/month)',
      'Network setup & Wi-Fi optimisation',
      'Preventive maintenance',
    ],
  },
  consult: {
    title: 'Consultation',
    icon: MessageSquare,
    accent: '#0891B2',
    badge: 'Free',
    price: 'Free',
    setup: 'Instant chatbot access',
    features: [
      'Quick answers from chatbot',
      'Free for quick troubleshooting',
      'Escalate to human support if needed',
    ],
  },
} as const;

/* ─────────────────────────── Root page ─────────────────────────── */

export default function Dashboard() {
  const [activePlan, setActivePlan] = useState<PlanKey>('basic');
  const [showBooking, setShowBooking] = useState(false);
  const [bookingPlanKey, setBookingPlanKey] = useState<PlanKey>('basic');
  const [bookingsPanelFor, setBookingsPanelFor] = useState<PlanKey | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');

  const openBooking = (p: PlanKey) => {
    setBookingPlanKey(p);
    setShowBooking(true);
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSidebar(false);
        setShowBooking(false);
        setBookingsPanelFor(null);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="nm-root">
        <aside className="nm-sidebar">
          <div className="nm-sidebar-brand">
            <div className="nm-avatar nm-avatar--brand">NM</div>
            <div>
              <p className="nm-sidebar-brand-name">NM Computer Care</p>
              <p className="nm-sidebar-brand-sub">Premium tech support</p>
            </div>
          </div>

          <p className="nm-sidebar-label">My Plans</p>

          <nav className="nm-sidebar-nav">
            {(Object.keys(PLANS) as PlanKey[]).map((key) => {
              const plan = PLANS[key];
              const Icon = plan.icon;
              const active = activePlan === key;
              return (
                <button
                  key={key}
                  onClick={() => setActivePlan(key)}
                  className={`nm-nav-item ${active ? 'nm-nav-item--active' : ''}`}
                  style={active ? ({ '--plan-accent': plan.accent } as React.CSSProperties) : {}}
                  aria-pressed={active}
                >
                  <div className="nm-nav-icon" style={{ background: active ? `${plan.accent}18` : undefined }}>
                    <Icon size={18} style={{ color: active ? plan.accent : undefined }} />
                  </div>
                  <div className="nm-nav-text">
                    <span className="nm-nav-title">{plan.title}</span>
                    <span className="nm-nav-sub">{plan.price}</span>
                  </div>
                  {plan.badge && (
                    <span className="nm-badge" style={{ background: `${plan.accent}18`, color: plan.accent }}>
                      {plan.badge}
                    </span>
                  )}
                  {active && <ChevronRight size={14} style={{ color: plan.accent, marginLeft: 'auto', flexShrink: 0 }} />}
                </button>
              );
            })}
          </nav>

          <div className="nm-sidebar-footer">
            <div className="nm-sidebar-footer-row">
              <div className="nm-avatar nm-avatar--small nm-avatar--user">SL</div>
              <div style={{ minWidth: 0 }}>
                <p className="nm-sidebar-footer-name">S. L. Mthimunye</p>
                <p className="nm-sidebar-footer-role">Technical Director</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="nm-main">
          <header className="nm-header">
            <div className="nm-header-left">
              <div className="nm-avatar nm-avatar--brand nm-avatar--sm">NM</div>
              <div>
                <h1 className="nm-header-title">NM Computer Care</h1>
                <p className="nm-header-subtitle">Fast support, clean workflows, polished service</p>
              </div>
            </div>
            <button onClick={() => setShowSidebar(true)} className="nm-profile-btn" aria-label="Open profile">
              <div className="nm-header-user-text">
                <span className="nm-header-user-name">Sizolwakhe L. Mthimunye</span>
              </div>
              <div className="nm-avatar nm-avatar--user">SL</div>
            </button>
          </header>

          <main className="nm-content">
            {viewMode === 'dashboard' ? (
              <>
                <div className="nm-hero-strip">
                  <div className="nm-hero-strip-left">
                    <div className="nm-hero-kicker">
                      <Sparkles size={14} /> Premium dashboard
                    </div>
                    <h2>Everything in one clean workspace.</h2>
                    <p>Switch plans, book services, inspect bookings, and track invoices without losing context.</p>
                  </div>
                  <div className="nm-hero-strip-right">
                    <div className="nm-stat-card">
                      <span>Active plan</span>
                      <strong>{PLANS[activePlan].title}</strong>
                    </div>
                    <div className="nm-stat-card">
                      <span>Support mode</span>
                      <strong>{activePlan === 'consult' ? 'Chat' : 'Bookings'}</strong>
                    </div>
                  </div>
                </div>

                {(Object.keys(PLANS) as PlanKey[]).map((key) => (
                  <PlanSection
                    key={key}
                    planKey={key}
                    visible={activePlan === key}
                    onBook={() => openBooking(key)}
                    onViewBookings={() => setBookingsPanelFor(key)}
                  />
                ))}
              </>
            ) : (
              <AccountSettings onBack={() => setViewMode('dashboard')} />
            )}
          </main>
        </div>

        <MobileFooter
          activePlan={activePlan}
          onSelectPlan={setActivePlan}
          onBook={openBooking}
          onViewBookings={setBookingsPanelFor}
        />

        {bookingsPanelFor && (
          <Modal onClose={() => setBookingsPanelFor(null)}>
            <ModalHeader
              title={`Bookings — ${PLANS[bookingsPanelFor].title}`}
              subtitle="Filter, search and print"
              onClose={() => setBookingsPanelFor(null)}
            />
            <div style={{ padding: '1rem' }}>
              <BookingsPanel />
            </div>
          </Modal>
        )}

        {showBooking && (
          <Modal onClose={() => setShowBooking(false)}>
            <ModalHeader
              title={`Book — ${PLANS[bookingPlanKey].title}`}
              subtitle="Fill each step to request a quote"
              onClose={() => setShowBooking(false)}
            />
            <div style={{ padding: '1.5rem' }}>
              <BookingForm onClose={() => setShowBooking(false)} planKey={bookingPlanKey} />
            </div>
          </Modal>
        )}

        <ProfileSidebar
          open={showSidebar}
          onClose={() => setShowSidebar(false)}
          onAccountSettings={() => {
            setShowSidebar(false);
            setViewMode('account');
          }}
        />
      </div>
    </>
  );
}

/* ─────────────────────────── Plan section ─────────────────────── */

function PlanSection({
  planKey,
  visible,
  onBook,
  onViewBookings,
}: {
  planKey: PlanKey;
  visible: boolean;
  onBook: () => void;
  onViewBookings: () => void;
}) {
  const plan = PLANS[planKey];
  const Icon = plan.icon;

  return (
    <section className={`nm-plan-section ${visible ? 'nm-plan-section--visible' : ''}`} aria-hidden={!visible}>
      <div className="nm-plan-hero" style={{ '--plan-accent': plan.accent } as React.CSSProperties}>
        <div className="nm-plan-hero-icon">
          <Icon size={22} style={{ color: plan.accent }} />
        </div>
        <div>
          <h2 className="nm-plan-hero-title">{plan.title}</h2>
          <p className="nm-plan-hero-meta">
            <span style={{ color: plan.accent, fontWeight: 600 }}>{plan.price}</span>
            <span className="nm-dot">·</span>
            <span>{plan.setup}</span>
          </p>
        </div>
        {plan.badge && (
          <span className="nm-hero-badge" style={{ background: `${plan.accent}18`, color: plan.accent }}>
            {plan.badge}
          </span>
        )}
      </div>

      <div className="nm-plan-body">
        <div className="nm-features">
          <h3 className="nm-section-heading">What's included</h3>
          <ul className="nm-feature-list">
            {plan.features.map((f, index) => (
              <li key={f} className="nm-feature-item" style={{ animationDelay: `${index * 70}ms` }}>
                <CheckCircle size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: 2 }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {planKey !== 'consult' ? (
          <div className="nm-quick-actions">
            <h3 className="nm-section-heading">Quick actions</h3>
            <div className="nm-action-list">
              <ActionButton icon={<Laptop size={16} />} label="Book a service" onClick={onBook} accent={plan.accent} />
              <ActionButton icon={<Layers size={16} />} label="View bookings" onClick={onViewBookings} accent={plan.accent} />
            </div>
          </div>
        ) : (
          <div className="nm-quick-actions">
            <h3 className="nm-section-heading">Chat with our AI Assistant</h3>
            <ChatbotDemo />
          </div>
        )}
      </div>

      {planKey !== 'consult' && (
        <div className="nm-plan-payments">
          <h3 className="nm-section-heading" style={{ marginBottom: '0.75rem' }}>
            Pending payments
          </h3>
          <PendingPayments planKey={planKey} />
        </div>
      )}
    </section>
  );
}

function ActionButton({ icon, label, onClick, accent }: { icon: React.ReactNode; label: string; onClick: () => void; accent: string }) {
  return (
    <button onClick={onClick} className="nm-action-btn" style={{ '--btn-accent': accent } as React.CSSProperties}>
      <span className="nm-action-icon">{icon}</span>
      <span className="nm-action-label">{label}</span>
      <ArrowRight size={14} style={{ color: '#9CA3AF', marginLeft: 'auto' }} />
    </button>
  );
}

/* ─────────────────────────── Simple Chatbot Demo ─────────────────── */

function ChatbotDemo() {
  const [messages, setMessages] = useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: 'Hi 👋 How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const value = input.trim();
    if (!value) return;
    setMessages((prev) => [...prev, { from: 'user', text: value }]);
    setInput('');

    window.setTimeout(() => {
      const text = value.toLowerCase();
      const reply = text.includes('price')
        ? 'The quickest route is to book Basic Care or Performance Care depending on the issue.'
        : text.includes('windows')
          ? 'Windows upgrades are supported. I can help you scope the device compatibility.'
          : text.includes('virus')
            ? 'I recommend Basic Care for removal, cleanup, and a tune-up.'
            : "Got it. I'll guide you through the best support path.";
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    }, 650);
  };

  return (
    <div className="nm-chatbot">
      <div className="nm-chatbot-topbar">
        <div className="nm-chatbot-status">
          <span className="nm-chatbot-dot" />
          AI assistant online
        </div>
        <span className="nm-chatbot-hint">Response in seconds</span>
      </div>
      <div className="nm-chatbot-messages" ref={listRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`nm-chat-msg ${msg.from === 'user' ? 'nm-chat-msg--user' : 'nm-chat-msg--bot'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="nm-chatbot-inputbar">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your question..."
          className="nm-input"
          style={{ flex: 1 }}
        />
        <button onClick={sendMessage} className="nm-btn nm-btn--primary">
          Send
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── Pending payments ─────────────────── */

const SAMPLE_RECORDS: BookingRecord[] = [
  { id: 'BKG-000', userId: 'user-123', device: 'Laptop', price: 'R350', status: 'Pending Payment', date: '2026-03-31', quote: null },
  { id: 'BKG-001', userId: 'user-001', device: 'Laptop', price: 'R299', status: 'Pending', date: '2026-04-01', quote: null },
  { id: 'BKG-002', userId: 'user-002', device: 'PC', price: 'R399', status: 'Completed', date: '2026-04-02', quote: null },
  { id: 'BKG-003', userId: 'user-003', device: 'Laptop', price: 'R450', status: 'Pending Payment', date: '2026-04-03', quote: null },
  { id: 'BKG-004', userId: 'user-004', device: 'PC', price: 'R899', status: 'In Progress', date: '2026-04-04', quote: null },
  { id: 'BKG-005', userId: 'user-005', device: 'Laptop', price: 'R350', status: 'Pending Payment', date: '2026-04-05', quote: null },
];

function PendingPayments({ planKey }: { planKey: PlanKey }) {
  const [records, setRecords] = useState<BookingRecord[]>(SAMPLE_RECORDS);
  const [activeQuote, setActiveQuote] = useState<Quote | null>(null);

  const scopedRecords = useMemo(() => {
    if (planKey === 'consult') return [];
    return records.filter((r) => {
      const value = Number(r.price.replace(/[^\d]/g, '')) || 0;
      if (planKey === 'basic') return value <= 399;
      if (planKey === 'performance') return value > 399 && value <= 699;
      return value >= 700;
    });
  }, [planKey, records]);

  const pendingCount = scopedRecords.filter((r) => r.status.toLowerCase().includes('pending')).length;

  const acceptPayment = (bookingId: string) => {
    const rec = records.find((r) => r.id === bookingId);
    if (!rec) return;
    const numeric = Number(rec.price.replace(/[^\d]/g, '')) || 0;
    const labour = Math.max(0, numeric - 50);
    const quote: Quote = {
      id: `Q-${bookingId}`,
      bookingId,
      amount: rec.price,
      breakdown: [`Service: ${rec.device} repair`, 'Parts: R50', `Labour: R${labour}`],
      acceptedAt: new Date().toISOString(),
    };
    setRecords((prev) => prev.map((r) => (r.id === bookingId ? { ...r, status: 'Paid', quote } : r)));
    setActiveQuote(quote);
  };

  return (
    <>
      <div className="nm-payments-card">
        <div className="nm-payments-header">
          <div>
            <span className="nm-payments-title">Outstanding invoices</span>
            <span className="nm-payments-sub">Tap to accept &amp; mark as paid</span>
          </div>
          <span className="nm-payments-count">{pendingCount} pending</span>
        </div>

        <div className="nm-table-wrap nm-table-wrap--compact">
          <table className="nm-table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Device</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {scopedRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#94A3B8' }}>
                    No invoices for this plan
                  </td>
                </tr>
              ) : (
                scopedRecords.map((r) => (
                  <tr key={r.id}>
                    <td><span className="nm-booking-id">{r.id}</span></td>
                    <td>{r.device}</td>
                    <td>{r.date}</td>
                    <td>
                      <StatusPill status={r.status} />
                      <div className="nm-user-id">{r.userId}</div>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{r.price}</td>
                    <td style={{ textAlign: 'right' }}>
                      {r.status !== 'Paid' ? (
                        <button onClick={() => acceptPayment(r.id)} className="nm-accept-btn">
                          <Check size={13} /> Accept
                        </button>
                      ) : r.quote ? (
                        <span className="nm-paid-label">{r.quote.id}</span>
                      ) : null}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {activeQuote && <QuoteModal quote={activeQuote} onClose={() => setActiveQuote(null)} />}
    </>
  );
}

/* ─────────────────────────── Quote modal ─────────────────────── */

function QuoteModal({ quote, onClose }: { quote: Quote; onClose: () => void }) {
  const [paying, setPaying] = useState(false);

  const handleOzowPay = async () => {
    setPaying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1400));
      const testTxId = `OZ-TEST-${Math.floor(100000 + Math.random() * 900000)}`;
      alert(`✅ Ozow Test Payment Successful!\n\nTransaction ID: ${testTxId}\nAmount: ${quote.amount}\n\n(No real money charged - sandbox mode)`);
      onClose();
    } catch {
      alert('Ozow test payment failed. Please try again.');
    } finally {
      setPaying(false);
    }
  };

  return (
    <Modal onClose={onClose} size="sm">
      <ModalHeader title={`Quote ${quote.id}`} subtitle={`Booking ${quote.bookingId}`} onClose={onClose} />
      <div style={{ padding: '1.5rem' }}>
        <div className="nm-quote-amount">{quote.amount}</div>
        <p className="nm-quote-label">Total amount due</p>

        <div className="nm-quote-breakdown">
          {quote.breakdown.map((b) => (
            <div key={b} className="nm-quote-row">
              <span className="nm-quote-dot" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <p className="nm-quote-timestamp">Accepted {new Date(quote.acceptedAt).toLocaleString()}</p>

        <div className="nm-modal-actions">
          <button onClick={handleOzowPay} disabled={paying} className="nm-btn nm-btn--primary" style={{ minWidth: '180px' }}>
            {paying ? <>Processing with Ozow…</> : <>Pay now with Ozow</>}
          </button>
          <button onClick={onClose} className="nm-btn nm-btn--ghost">
            Close
          </button>
        </div>

        <p style={{ fontSize: '10px', color: '#64748B', textAlign: 'center', marginTop: '1rem' }}>
          Test mode • Ozow sandbox • No real money will be charged
        </p>
      </div>
    </Modal>
  );
}

/* ─────────────────────────── Bookings panel ─────────────────── */

const BOOKING_ROWS = [
  { id: 'BKG-000', userId: 'user-123', name: '—', device: 'Laptop', os: 'Windows 10', status: 'Pending', date: '2026-03-31' },
  { id: 'BKG-001', userId: 'user-001', name: 'John Doe', device: 'Laptop', os: 'Windows 10', status: 'Pending', date: '2026-04-01' },
  { id: 'BKG-002', userId: 'user-002', name: 'Alice Smith', device: 'PC', os: 'Windows 11', status: 'Completed', date: '2026-04-02' },
  { id: 'BKG-003', userId: 'user-003', name: 'Bob Johnson', device: 'Laptop', os: 'Linux', status: 'Pending', date: '2026-04-03' },
  { id: 'BKG-004', userId: 'user-004', name: 'Carol White', device: 'PC', os: 'Windows 10', status: 'In Progress', date: '2026-04-04' },
  { id: 'BKG-005', userId: 'user-005', name: 'David Brown', device: 'Laptop', os: 'Windows 11', status: 'Pending', date: '2026-04-05' },
];

function BookingsPanel() {
  const [searchBy, setSearchBy] = useState<'name' | 'device' | 'status' | 'userId'>('name');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const tableRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BOOKING_ROWS;
    return BOOKING_ROWS.filter((r) => {
      if (searchBy === 'name') return r.name.toLowerCase().includes(q);
      if (searchBy === 'device') return r.device.toLowerCase().includes(q);
      if (searchBy === 'status') return r.status.toLowerCase().includes(q);
      return r.userId.toLowerCase().includes(q);
    });
  }, [query, searchBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * limit, currentPage * limit);

  useEffect(() => setPage(1), [query, searchBy, limit]);

  const printBookings = () => {
    if (!tableRef.current) return;
    const w = window.open('', '_blank', 'noopener,noreferrer');
    if (!w) return;
    w.document.write(`
      <html>
        <head>
          <title>Bookings</title>
          <style>
            body{font-family:system-ui;padding:20px}
            table{width:100%;border-collapse:collapse}
            th,td{border:1px solid #e5e7eb;padding:8px;text-align:left}
            th{background:#f8fafc}
          </style>
        </head>
        <body>
          <h2>Bookings</h2>
          ${tableRef.current.innerHTML}
        </body>
      </html>
    `);
    w.document.close();
    setTimeout(() => w.print(), 200);
  };

  return (
    <div className="nm-bookings">
      <div className="nm-bookings-toolbar">
        <div className="nm-toolbar-left">
          <select value={searchBy} onChange={(e) => setSearchBy(e.target.value as any)} className="nm-select">
            <option value="name">Name</option>
            <option value="userId">User ID</option>
            <option value="device">Device</option>
            <option value="status">Status</option>
          </select>
          <div className="nm-search-wrap">
            <Search size={15} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="nm-input" />
          </div>
        </div>
        <div className="nm-toolbar-right">
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="nm-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <button onClick={printBookings} className="nm-btn nm-btn--ghost nm-btn--sm">
            <Printer size={14} /> Print
          </button>
        </div>
      </div>

      <div className="nm-table-wrap nm-table-wrap--compact" ref={tableRef} style={{ maxHeight: 260 }}>
        <table className="nm-table">
          <thead>
            <tr>
              <th>Booking</th>
              <th>Device</th>
              <th>OS</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                  No results found
                </td>
              </tr>
            ) : (
              paginated.map((r) => (
                <tr key={r.id}>
                  <td><span className="nm-booking-id">{r.id}</span></td>
                  <td>{r.device}</td>
                  <td>{r.os}</td>
                  <td>{r.date}</td>
                  <td><StatusPill status={r.status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="nm-pagination">
        <span className="nm-page-info">
          {total} result{total !== 1 ? 's' : ''} · Page {currentPage}/{totalPages}
        </span>
        <div className="nm-page-btns">
          <button onClick={() => setPage((p) => p - 1)} disabled={currentPage <= 1} className="nm-btn nm-btn--ghost nm-btn--sm">
            ← Prev
          </button>
          <button onClick={() => setPage((p) => p + 1)} disabled={currentPage >= totalPages} className="nm-btn nm-btn--ghost nm-btn--sm">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Booking form ─────────────────────── */

const AMD_CPUS = ['Ryzen 5 5600X', 'Ryzen 7 5800X', 'Ryzen 9 5900X'];
const INTEL_CPUS = ['Core i5-12400', 'Core i7-12700', 'Core i9-12900'];
const RAM_OPTIONS = ['8GB DDR4 2666MHz', '16GB DDR4 3200MHz', '32GB DDR4 3600MHz'];
const GPU_OPTIONS = ['NVIDIA GTX 1660', 'NVIDIA RTX 3060', 'AMD RX 6600'];
const SOFTWARE_OPTIONS = ['Microsoft Copilot', 'Office 365', 'Antivirus', 'VPN'];
const OS_OPTIONS = ['Windows 8', 'Windows 10', 'Windows 11', 'Linux'];

function BookingForm({ onClose, planKey }: { onClose: () => void; planKey: PlanKey }) {
  const [step, setStep] = useState<PlanStep>(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [deviceType, setDeviceType] = useState<DeviceType>('pc');
  const [osUpgrade, setOsUpgrade] = useState<YesNo>('no');
  const [selectedOS, setSelectedOS] = useState<string>('');
  const [upgradeCPU, setUpgradeCPU] = useState<YesNo>('no');
  const [cpuVendor, setCpuVendor] = useState<'amd' | 'intel' | ''>('');
  const [cpuModel, setCpuModel] = useState('');
  const [upgradeRAM, setUpgradeRAM] = useState<YesNo>('no');
  const [selectedRAM, setSelectedRAM] = useState<string[]>([]);
  const [gpuDeviceType, setGpuDeviceType] = useState<'computer' | 'laptop' | ''>('');
  const [upgradeGPU, setUpgradeGPU] = useState<YesNo>('no');
  const [gpuModel, setGpuModel] = useState('');
  const [businessPlanType, setBusinessPlanType] = useState<'basic' | 'performance'>('basic');
  const [businessQuantity, setBusinessQuantity] = useState(10);
  const [requestDrivers, setRequestDrivers] = useState<YesNo>('no');
  const [additionalSoftware, setAdditionalSoftware] = useState<string[]>([]);
  const [wantsSoftware, setWantsSoftware] = useState<YesNo>('no');
  const [problemDescription, setProblemDescription] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const isBusiness = planKey === 'business';
  const subFlow: 'basic' | 'performance' = isBusiness ? businessPlanType : planKey === 'performance' ? 'performance' : 'basic';
  const isPerfFlow = subFlow === 'performance';
  const maxSteps = isBusiness ? 4 : 3;

  const labels: string[] = isBusiness
    ? businessPlanType === 'basic'
      ? ['Bulk setup', 'Device', 'Software', 'Details']
      : ['Bulk setup', 'CPU', 'RAM', 'GPU']
    : planKey === 'basic'
      ? ['Device', 'Software', 'Details']
      : planKey === 'performance'
        ? ['CPU', 'RAM', 'GPU']
        : ['Device', 'Software', 'Details'];

  const toggleRAM = (r: string) => setSelectedRAM((p) => (p.includes(r) ? p.filter((x) => x !== r) : [...p, r]));
  const toggleSoftware = (s: string) => setAdditionalSoftware((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setScreenshotFile(file);
    if (!file) { setScreenshotPreview(null); return; }
    const reader = new FileReader();
    reader.onload = () => setScreenshotPreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const validate = (s: PlanStep): string | null => {
    if (isBusiness && s === 1) return null;
    if (!isBusiness && s === 1) {
      if (planKey === 'performance') {
        if (upgradeCPU === 'yes' && !cpuVendor) return 'Choose a CPU vendor.';
        if (upgradeCPU === 'yes' && !cpuModel) return 'Choose a CPU model.';
      } else {
        if (osUpgrade === 'yes' && !selectedOS) return 'Please select an operating system.';
      }
      return null;
    }
    if (s === 2) {
      if (isBusiness && isPerfFlow) {
        if (upgradeCPU === 'yes' && !cpuVendor) return 'Choose a CPU vendor.';
        if (upgradeCPU === 'yes' && !cpuModel) return 'Choose a CPU model.';
      } else if (!isBusiness && isPerfFlow) {
        if (upgradeRAM === 'yes' && selectedRAM.length === 0) return 'Select at least one RAM option.';
      }
      return null;
    }
    if (s === 3) {
      if (isBusiness && isPerfFlow) {
        if (upgradeRAM === 'yes' && selectedRAM.length === 0) return 'Select at least one RAM option.';
      } else if (!isBusiness && isPerfFlow) {
        if (!gpuDeviceType) return 'Choose Desktop or Laptop for GPU.';
        if (gpuDeviceType === 'computer' && upgradeGPU === 'yes' && !gpuModel) return 'Choose a GPU model.';
      } else if (!isBusiness) {
        if (!problemDescription.trim()) return 'Please describe the problem (required).';
      }
      return null;
    }
    if (s === 4 && isBusiness) {
      if (isPerfFlow) {
        if (!gpuDeviceType) return 'Choose Desktop or Laptop for GPU.';
        if (gpuDeviceType === 'computer' && upgradeGPU === 'yes' && !gpuModel) return 'Choose a GPU model.';
      } else {
        if (!problemDescription.trim()) return 'Please describe the problem (required).';
      }
      return null;
    }
    return null;
  };

  const goNext = () => {
    const err = validate(step);
    if (err) { setError(err); return; }
    setError(null);
    if (step < maxSteps) setStep((s) => (s + 1) as PlanStep);
  };

  const goPrev = () => {
    setError(null);
    if (step > 1) setStep((s) => (s - 1) as PlanStep);
    else onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < maxSteps) return;
    const err = validate(step);
    if (err) { setError(err); return; }
    setSubmitting(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 850));
      setSuccess(true);
    } catch {
      setError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && step < maxSteps) { e.preventDefault(); goNext(); }
  };

  if (success) {
    return (
      <div className="nm-success">
        <div className="nm-success-icon"><Check size={32} /></div>
        <h3 className="nm-success-title">Request submitted!</h3>
        <p className="nm-success-body">We'll be in touch within 2 hours to confirm your booking and arrange service.</p>
        <button onClick={onClose} className="nm-btn nm-btn--primary" style={{ marginTop: '1.5rem' }}>
          Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown}>
      <div className="nm-steps">
        {Array.from({ length: maxSteps }, (_, i) => (i + 1) as PlanStep).map((s) => (
          <div key={s} className={`nm-step ${step === s ? 'nm-step--active' : ''} ${step > s ? 'nm-step--done' : ''}`}>
            <div className="nm-step-circle">{step > s ? <Check size={12} /> : s}</div>
            <span className="nm-step-label">{labels[s - 1]}</span>
          </div>
        ))}
        <div className="nm-step-track">
          <div className="nm-step-fill" style={{ width: `${maxSteps === 1 ? 100 : ((step - 1) / (maxSteps - 1)) * 100}%` }} />
        </div>
      </div>

      {error && (
        <div className="nm-form-error">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="nm-form-body">
        {step === 1 && (
          <div className="nm-form-step">
            {isBusiness ? (
              <>
                <FormSection label="Bulk plan type">
                  <div className="nm-toggle-group">
                    <ToggleBtn active={businessPlanType === 'basic'} onClick={() => setBusinessPlanType('basic')}>Basic Care</ToggleBtn>
                    <ToggleBtn active={businessPlanType === 'performance'} onClick={() => setBusinessPlanType('performance')}>Performance Care</ToggleBtn>
                  </div>
                </FormSection>
                <FormSection label="Number of devices">
                  <input type="number" min={1} value={businessQuantity} onChange={(e) => setBusinessQuantity(Math.max(1, Number(e.target.value)))} className="nm-input" style={{ width: 120 }} />
                </FormSection>
              </>
            ) : planKey === 'performance' ? (
              <CPUSection upgradeCPU={upgradeCPU} setUpgradeCPU={setUpgradeCPU} cpuVendor={cpuVendor} setCpuVendor={setCpuVendor} cpuModel={cpuModel} setCpuModel={setCpuModel} />
            ) : (
              <>
                <FormSection label="Device type">
                  <div className="nm-toggle-group">
                    <ToggleBtn active={deviceType === 'pc'} onClick={() => setDeviceType('pc')}>Desktop PC</ToggleBtn>
                    <ToggleBtn active={deviceType === 'laptop'} onClick={() => setDeviceType('laptop')}>Laptop</ToggleBtn>
                  </div>
                </FormSection>
                <FormSection label="Operating System Update">
                  <YesNoToggle value={osUpgrade} onChange={setOsUpgrade} />
                  {osUpgrade === 'yes' && (
                    <>
                      <div className="nm-form-info">We install Windows 8, 10, 11 and Linux</div>
                      <FormSection label="Select Operating System">
                        <select value={selectedOS} onChange={(e) => setSelectedOS(e.target.value)} className="nm-select" style={{ width: '100%' }}>
                          <option value="">Choose OS...</option>
                          {OS_OPTIONS.map((os) => <option key={os} value={os}>{os}</option>)}
                        </select>
                      </FormSection>
                    </>
                  )}
                </FormSection>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="nm-form-step">
            {isBusiness ? (
              isPerfFlow ? (
                <CPUSection upgradeCPU={upgradeCPU} setUpgradeCPU={setUpgradeCPU} cpuVendor={cpuVendor} setCpuVendor={setCpuVendor} cpuModel={cpuModel} setCpuModel={setCpuModel} />
              ) : (
                <FormSection label="Device type">
                  <div className="nm-toggle-group">
                    <ToggleBtn active={deviceType === 'pc'} onClick={() => setDeviceType('pc')}>Desktop PC</ToggleBtn>
                    <ToggleBtn active={deviceType === 'laptop'} onClick={() => setDeviceType('laptop')}>Laptop</ToggleBtn>
                  </div>
                </FormSection>
              )
            ) : isPerfFlow ? (
              <>
                <FormSection label="Upgrade RAM?">
                  <YesNoToggle value={upgradeRAM} onChange={setUpgradeRAM} />
                </FormSection>
                {upgradeRAM === 'yes' && (
                  <FormSection label="Select RAM options">
                    <div className="nm-check-grid">
                      {RAM_OPTIONS.map((r) => <CheckItem key={r} checked={selectedRAM.includes(r)} onChange={() => toggleRAM(r)} label={r} />)}
                    </div>
                  </FormSection>
                )}
              </>
            ) : (
              <>
                <FormSection label="Request drivers update (VPN & Anti-Virus)?">
                  <YesNoToggle value={requestDrivers} onChange={setRequestDrivers} />
                </FormSection>
                <FormSection label="Install additional software?">
                  <YesNoToggle value={wantsSoftware} onChange={setWantsSoftware} />
                  {wantsSoftware === 'yes' && (
                    <div className="nm-check-grid" style={{ marginTop: '0.75rem' }}>
                      {SOFTWARE_OPTIONS.map((s) => <CheckItem key={s} checked={additionalSoftware.includes(s)} onChange={() => toggleSoftware(s)} label={s} />)}
                    </div>
                  )}
                </FormSection>
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="nm-form-step">
            {isBusiness ? (
              isPerfFlow ? (
                <>
                  <FormSection label="Upgrade RAM?">
                    <YesNoToggle value={upgradeRAM} onChange={setUpgradeRAM} />
                  </FormSection>
                  {upgradeRAM === 'yes' && (
                    <FormSection label="Select RAM options">
                      <div className="nm-check-grid">
                        {RAM_OPTIONS.map((r) => <CheckItem key={r} checked={selectedRAM.includes(r)} onChange={() => toggleRAM(r)} label={r} />)}
                      </div>
                    </FormSection>
                  )}
                </>
              ) : (
                <>
                  <FormSection label="Request drivers update (VPN & Anti-Virus)?">
                    <YesNoToggle value={requestDrivers} onChange={setRequestDrivers} />
                  </FormSection>
                  <FormSection label="Install additional software?">
                    <YesNoToggle value={wantsSoftware} onChange={setWantsSoftware} />
                    {wantsSoftware === 'yes' && (
                      <div className="nm-check-grid" style={{ marginTop: '0.75rem' }}>
                        {SOFTWARE_OPTIONS.map((s) => <CheckItem key={s} checked={additionalSoftware.includes(s)} onChange={() => toggleSoftware(s)} label={s} />)}
                      </div>
                    )}
                  </FormSection>
                </>
              )
            ) : isPerfFlow ? (
              <>
                <FormSection label="Device type for GPU">
                  <div className="nm-toggle-group">
                    <ToggleBtn active={gpuDeviceType === 'computer'} onClick={() => setGpuDeviceType('computer')}>Desktop</ToggleBtn>
                    <ToggleBtn active={gpuDeviceType === 'laptop'} onClick={() => setGpuDeviceType('laptop')}>Laptop</ToggleBtn>
                  </div>
                </FormSection>
                {gpuDeviceType === 'computer' && (
                  <>
                    <FormSection label="Upgrade graphics card?">
                      <YesNoToggle value={upgradeGPU} onChange={setUpgradeGPU} />
                    </FormSection>
                    {upgradeGPU === 'yes' && (
                      <FormSection label="Select GPU model">
                        <select value={gpuModel} onChange={(e) => setGpuModel(e.target.value)} className="nm-select" style={{ width: '100%' }}>
                          <option value="">Choose model…</option>
                          {GPU_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </FormSection>
                    )}
                  </>
                )}
                {gpuDeviceType === 'laptop' && (
                  <div className="nm-form-info">For laptops we provide external GPU consultation and compatibility checks.</div>
                )}
              </>
            ) : (
              <>
                <FormSection label="Describe the problem (required)">
                  <textarea value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)} rows={4} className="nm-textarea" placeholder="Tell us what's happening with your device…" required />
                </FormSection>
                <FormSection label="Screenshot (optional)">
                  <label className="nm-upload-btn">
                    <UploadCloud size={16} /> Upload image
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                  </label>
                  {screenshotPreview && (
                    <div className="nm-preview-wrap">
                      <img src={screenshotPreview} alt="preview" className="nm-preview-img" />
                      <button type="button" onClick={() => { setScreenshotFile(null); setScreenshotPreview(null); if (fileRef.current) fileRef.current.value = ''; }} className="nm-remove-btn">
                        <X size={14} /> Remove
                      </button>
                    </div>
                  )}
                </FormSection>
              </>
            )}
          </div>
        )}

        {step === 4 && isBusiness && (
          <div className="nm-form-step">
            {isPerfFlow ? (
              <>
                <FormSection label="Device type for GPU">
                  <div className="nm-toggle-group">
                    <ToggleBtn active={gpuDeviceType === 'computer'} onClick={() => setGpuDeviceType('computer')}>Desktop</ToggleBtn>
                    <ToggleBtn active={gpuDeviceType === 'laptop'} onClick={() => setGpuDeviceType('laptop')}>Laptop</ToggleBtn>
                  </div>
                </FormSection>
                {gpuDeviceType === 'computer' && (
                  <>
                    <FormSection label="Upgrade graphics card?">
                      <YesNoToggle value={upgradeGPU} onChange={setUpgradeGPU} />
                    </FormSection>
                    {upgradeGPU === 'yes' && (
                      <FormSection label="Select GPU model">
                        <select value={gpuModel} onChange={(e) => setGpuModel(e.target.value)} className="nm-select" style={{ width: '100%' }}>
                          <option value="">Choose model…</option>
                          {GPU_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </FormSection>
                    )}
                  </>
                )}
                {gpuDeviceType === 'laptop' && (
                  <div className="nm-form-info">For laptops we provide external GPU consultation and compatibility checks.</div>
                )}
              </>
            ) : (
              <>
                <FormSection label="Describe the problem (optional)">
                  <textarea value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)} rows={4} className="nm-textarea" placeholder="Tell us what's happening with your device…" />
                </FormSection>
                <FormSection label="Screenshot (optional)">
                  <label className="nm-upload-btn">
                    <UploadCloud size={16} /> Upload image
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                  </label>
                  {screenshotPreview && (
                    <div className="nm-preview-wrap">
                      <img src={screenshotPreview} alt="preview" className="nm-preview-img" />
                      <button type="button" onClick={() => { setScreenshotFile(null); setScreenshotPreview(null); if (fileRef.current) fileRef.current.value = ''; }} className="nm-remove-btn">
                        <X size={14} /> Remove
                      </button>
                    </div>
                  )}
                </FormSection>
              </>
            )}
          </div>
        )}
      </div>

      <div className="nm-form-nav">
        <button type="button" onClick={goPrev} className="nm-btn nm-btn--ghost">
          {step > 1 ? '← Back' : 'Cancel'}
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          {step < maxSteps ? (
            <button type="button" onClick={goNext} className="nm-btn nm-btn--primary">
              Next <ArrowRight size={14} />
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="nm-btn nm-btn--primary">
              {submitting ? 'Submitting…' : 'Submit request'} <Check size={14} />
            </button>
          )}
        </div>
      </div>

      <p className="nm-form-disclaimer">By submitting you agree to be contacted to confirm the booking.</p>
    </form>
  );
}

function CPUSection({ upgradeCPU, setUpgradeCPU, cpuVendor, setCpuVendor, cpuModel, setCpuModel }: any) {
  return (
    <>
      <FormSection label="Upgrade CPU?">
        <YesNoToggle value={upgradeCPU} onChange={setUpgradeCPU} />
      </FormSection>
      {upgradeCPU === 'yes' && (
        <>
          <FormSection label="CPU vendor">
            <div className="nm-toggle-group">
              <ToggleBtn active={cpuVendor === 'amd'} onClick={() => { setCpuVendor('amd'); setCpuModel(''); }}>AMD</ToggleBtn>
              <ToggleBtn active={cpuVendor === 'intel'} onClick={() => { setCpuVendor('intel'); setCpuModel(''); }}>Intel</ToggleBtn>
            </div>
          </FormSection>
          {cpuVendor && (
            <FormSection label="CPU model">
              <select value={cpuModel} onChange={(e) => setCpuModel(e.target.value)} className="nm-select" style={{ width: '100%' }}>
                <option value="">Choose model…</option>
                {(cpuVendor === 'amd' ? AMD_CPUS : INTEL_CPUS).map((m: string) => <option key={m} value={m}>{m}</option>)}
              </select>
            </FormSection>
          )}
        </>
      )}
    </>
  );
}

function FormSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="nm-form-section">
      <label className="nm-form-label">{label}</label>
      {children}
    </div>
  );
}

function YesNoToggle({ value, onChange }: { value: YesNo; onChange: (v: YesNo) => void }) {
  return (
    <div className="nm-toggle-group">
      <ToggleBtn active={value === 'yes'} onClick={() => onChange('yes')}>Yes</ToggleBtn>
      <ToggleBtn active={value === 'no'} onClick={() => onChange('no')}>No</ToggleBtn>
    </div>
  );
}

function ToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`nm-toggle-btn ${active ? 'nm-toggle-btn--active' : ''}`}>
      {children}
    </button>
  );
}

function CheckItem({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className={`nm-check-item ${checked ? 'nm-check-item--checked' : ''}`}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
      <div className="nm-check-box">{checked && <Check size={11} />}</div>
      <span>{label}</span>
    </label>
  );
}

/* ─────────────────────────── Profile sidebar ─────────────────────────
   Removed: Notifications and Settings actions
─────────────────────────────────────────────────────────────────────── */

function ProfileSidebar({
  open,
  onClose,
  onAccountSettings,
}: {
  open: boolean;
  onClose: () => void;
  onAccountSettings: () => void;
}) {
  return (
    <>
      <div className={`nm-overlay ${open ? 'nm-overlay--visible' : ''}`} onClick={onClose} aria-hidden />
      <aside className={`nm-profile-sidebar ${open ? 'nm-profile-sidebar--open' : ''}`}>
        <div className="nm-sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="nm-avatar nm-avatar--user nm-avatar--lg">SL</div>
            <div>
              <p className="nm-profile-name">Sizolwakhe L. Mthimunye</p>
              <p className="nm-profile-role">Technical Director</p>
            </div>
          </div>
          <button onClick={onClose} className="nm-icon-btn" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="nm-profile-body">
          <div className="nm-profile-card">
            <p className="nm-profile-card-label">Physical address</p>
            <address className="nm-profile-address">
              NM Computer Care<br />
              12 Market Street<br />
              Emalahleni, Mpumalanga<br />
              South Africa
            </address>
          </div>

          {/* Account section — only Account settings remains */}
          <div className="nm-profile-section">
            <p className="nm-profile-section-label">Account</p>
            <ProfileAction
              icon={<User size={16} />}
              title="Account settings"
              sub="Manage profile & preferences"
              onClick={onAccountSettings}
            />
          </div>

          <div className="nm-profile-section">
            <p className="nm-profile-section-label">Session</p>
            <button onClick={() => alert('Signed out (demo)')} className="nm-profile-signout">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        <div className="nm-profile-footer">
          <span>Version 1.1.0 • Beautifully upgraded</span>
          <span>© NM Computer Care</span>
        </div>
      </aside>
    </>
  );
}

function ProfileAction({ icon, title, sub, onClick }: { icon: React.ReactNode; title: string; sub: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="nm-profile-action">
      <span className="nm-profile-action-icon">{icon}</span>
      <span>
        <span className="nm-profile-action-title">{title}</span>
        <span className="nm-profile-action-sub">{sub}</span>
      </span>
    </button>
  );
}

/* ─────────────────────────── Account Settings ─────────────────────────
   Order: Email → Preferences (new, with unsubscribe toggle) → Password → Address
─────────────────────────────────────────────────────────────────────── */

function AccountSettings({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('s.l.mthimunye@nmcomputercare.co.za');

  // Preferences
  const [unsubscribed, setUnsubscribed] = useState(false);

  // Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Address
  const [addressLine1, setAddressLine1] = useState('NM Computer Care');
  const [addressLine2, setAddressLine2] = useState('12 Market Street');
  const [addressCity, setAddressCity] = useState('Emalahleni, Mpumalanga');
  const [addressCountry, setAddressCountry] = useState('South Africa');

  const handleSaveEmail = () => alert(`✅ Email updated to: ${email}`);

  const handleSavePassword = () => {
    if (!newPassword || !confirmPassword) { alert('❌ Please fill in the new password fields'); return; }
    if (newPassword !== confirmPassword) { alert('❌ New passwords do not match'); return; }
    alert('✅ Password updated successfully!');
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
  };

  const handleSaveAddress = () =>
    alert(`✅ Address updated to:\n${addressLine1}\n${addressLine2}\n${addressCity}\n${addressCountry}`);

  return (
    <div className="nm-account-settings">
      <div className="nm-account-header">
        <button onClick={onBack} className="nm-btn nm-btn--ghost">← Back to Dashboard</button>
        <h2>Account Settings</h2>
      </div>

      {/* 1. Update Email */}
      <div className="nm-settings-section">
        <h3>Update Email Address</h3>
        <div className="nm-profile-info">
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="nm-input" style={{ maxWidth: '420px' }} />
          <button onClick={handleSaveEmail} className="nm-btn nm-btn--primary" style={{ marginTop: '12px' }}>
            Save New Email
          </button>
        </div>
      </div>

      {/* 2. Preferences (NEW — unsubscribe toggle) */}
      <div className="nm-settings-section">
        <h3>Preferences</h3>
        <div className="nm-pref-row">
          <div className="nm-pref-text">
            <span className="nm-pref-title">Newsletter & marketing emails</span>
            <span className="nm-pref-sub">
              {unsubscribed
                ? 'You are currently unsubscribed. Toggle to re-subscribe.'
                : 'You are subscribed. Toggle off to unsubscribe from all marketing emails.'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setUnsubscribed((v) => !v)}
            className={`nm-toggle-switch ${unsubscribed ? 'nm-toggle-switch--off' : 'nm-toggle-switch--on'}`}
            aria-pressed={!unsubscribed}
            aria-label="Toggle newsletter subscription"
          >
            <span className="nm-toggle-thumb" />
          </button>
        </div>
      </div>

      {/* 3. Update Password */}
      <div className="nm-settings-section">
        <h3>Update Password</h3>
        <div className="nm-profile-info">
          <label>Current Password</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="nm-input" style={{ maxWidth: '420px' }} />
          <label style={{ marginTop: '1rem' }}>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="nm-input" style={{ maxWidth: '420px' }} />
          <label style={{ marginTop: '1rem' }}>Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="nm-input" style={{ maxWidth: '420px' }} />
          <button onClick={handleSavePassword} className="nm-btn nm-btn--primary" style={{ marginTop: '1.5rem' }}>
            Update Password
          </button>
        </div>
      </div>

      {/* 4. Update Physical Address */}
      <div className="nm-settings-section">
        <h3>Update Physical Address</h3>
        <div className="nm-profile-info">
          <label>Company / Name</label>
          <input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="nm-input" />
          <label style={{ marginTop: '1rem' }}>Street Address</label>
          <input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="nm-input" />
          <label style={{ marginTop: '1rem' }}>City, Province</label>
          <input value={addressCity} onChange={(e) => setAddressCity(e.target.value)} className="nm-input" />
          <label style={{ marginTop: '1rem' }}>Country</label>
          <input value={addressCountry} onChange={(e) => setAddressCountry(e.target.value)} className="nm-input" />
          <button onClick={handleSaveAddress} className="nm-btn nm-btn--primary" style={{ marginTop: '1.5rem' }}>
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Mobile footer ─────────────────── */

function MobileFooter({
  activePlan,
  onSelectPlan,
  onBook,
  onViewBookings,
}: {
  activePlan: PlanKey;
  onSelectPlan: (p: PlanKey) => void;
  onBook: (p: PlanKey) => void;
  onViewBookings: (p: PlanKey) => void;
}) {
  return (
    <div className="nm-mobile-footer">
      <div className="nm-mobile-footer-inner">
        <div className="nm-mobile-header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="nm-avatar nm-avatar--brand nm-avatar--sm">NM</div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>NM Computer Care</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => onBook(activePlan)} className="nm-btn nm-btn--primary nm-btn--sm">Book</button>
            <button onClick={() => onViewBookings(activePlan)} className="nm-btn nm-btn--ghost nm-btn--sm">Bookings</button>
          </div>
        </div>
        <div className="nm-mobile-nav">
          {(Object.keys(PLANS) as PlanKey[]).map((key) => {
            const plan = PLANS[key];
            const Icon = plan.icon;
            const active = activePlan === key;
            return (
              <button
                key={key}
                onClick={() => onSelectPlan(key)}
                className={`nm-mobile-nav-item ${active ? 'nm-mobile-nav-item--active' : ''}`}
                style={active ? ({ '--plan-accent': plan.accent, borderColor: plan.accent, background: `${plan.accent}10` } as React.CSSProperties) : {}}
              >
                <Icon size={18} style={{ color: active ? plan.accent : '#6B7280' }} />
                <span>{plan.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Shared UI ─────────────────────── */

function Modal({ children, onClose, size }: { children: React.ReactNode; onClose: () => void; size?: 'sm' }) {
  return (
    <div className="nm-modal-backdrop">
      <div className="nm-modal-scrim" onClick={onClose} aria-hidden />
      <div className={`nm-modal ${size === 'sm' ? 'nm-modal--sm' : ''}`}>{children}</div>
    </div>
  );
}

function ModalHeader({ title, subtitle, onClose }: { title: string; subtitle: string; onClose: () => void }) {
  return (
    <div className="nm-modal-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="nm-avatar nm-avatar--brand nm-avatar--sm">NM</div>
        <div>
          <h3 className="nm-modal-title">{title}</h3>
          <p className="nm-modal-sub">{subtitle}</p>
        </div>
      </div>
      <button onClick={onClose} className="nm-icon-btn" aria-label="Close"><X size={18} /></button>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'nm-pill--warning',
    'pending payment': 'nm-pill--warning',
    paid: 'nm-pill--success',
    completed: 'nm-pill--success',
    'in progress': 'nm-pill--info',
    approved: 'nm-pill--success',
  };
  const cls = map[status.toLowerCase()] ?? 'nm-pill--neutral';
  return <span className={`nm-pill ${cls}`}>{status}</span>;
}

/* ─────────────────────────── Styles ─────────────────────────── */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --nm-bg: #f8fafc;
  --nm-surface: #ffffff;
  --nm-border: #e2e8f0;
  --nm-text: #0f172a;
  --nm-muted: #64748b;
  --nm-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.nm-root {
  display: flex;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.10), transparent 30%),
    radial-gradient(circle at top right, rgba(124, 58, 237, 0.10), transparent 28%),
    linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  font-family: 'DM Sans', system-ui, sans-serif;
  color: var(--nm-text);
}

.nm-sidebar {
  display: none;
  width: 284px;
  background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
  color: #fff;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  flex-shrink: 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.12);
}
@media (min-width: 768px) { .nm-sidebar { display: flex; } }

.nm-sidebar-brand { padding: 1.75rem 1.25rem 1rem; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.nm-sidebar-brand-name { font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
.nm-sidebar-brand-sub { font-size: 11.5px; color: #94a3b8; }
.nm-sidebar-label { padding: 1.25rem 1.25rem 0.5rem; font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #94a3b8; font-weight: 700; }
.nm-sidebar-nav { flex: 1; padding: 0.5rem 0.75rem; display: flex; flex-direction: column; gap: 3px; }
.nm-nav-item { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 14px; background: none; border: none; color: #cbd5e1; cursor: pointer; transition: transform 180ms ease, background-color 180ms ease, color 180ms ease, box-shadow 180ms ease; text-align: left; }
.nm-nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; transform: translateX(4px); }
.nm-nav-item--active { background: rgba(255,255,255,0.1); color: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,0.08); }
.nm-nav-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background-color 180ms ease; }
.nm-nav-text { min-width: 0; }
.nm-nav-title { display: block; font-size: 13.5px; font-weight: 700; }
.nm-nav-sub { display: block; font-size: 11.5px; color: #94a3b8; }
.nm-sidebar-footer { padding: 1.25rem; border-top: 1px solid rgba(255,255,255,0.08); }
.nm-sidebar-footer-row { display: flex; align-items: center; gap: 12px; }
.nm-sidebar-footer-name { font-size: 13px; font-weight: 700; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nm-sidebar-footer-role { font-size: 11.5px; color: #94a3b8; }

.nm-avatar { border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
.nm-avatar--brand { width: 42px; height: 42px; background: linear-gradient(135deg, #2563eb, #3b82f6); color: #fff; font-size: 15px; }
.nm-avatar--sm { width: 32px; height: 32px; font-size: 13px; }
.nm-avatar--lg { width: 52px; height: 52px; font-size: 18px; }
.nm-avatar--user { width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #6366f1); color: #fff; font-size: 14px; }
.nm-avatar--small { width: 34px; height: 34px; font-size: 12px; box-shadow: none; }

.nm-main { flex: 1; min-height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
.nm-header { position: sticky; top: 0; z-index: 40; background: rgba(255,255,255,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(226,232,240,0.9); padding: 0 1.75rem; min-height: 72px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.nm-header-left { display: flex; align-items: center; gap: 14px; }
.nm-header-title { font-size: 17px; font-weight: 700; letter-spacing: -0.03em; }
.nm-header-subtitle { font-size: 12.5px; color: var(--nm-muted); margin-top: 2px; }
.nm-profile-btn { display: flex; align-items: center; gap: 12px; padding: 6px 10px 6px 14px; border: 2px solid #f97316; border-radius: 9999px; background: #fff; cursor: pointer; transition: transform 180ms ease, box-shadow 180ms ease; box-shadow: 0 2px 8px rgba(249, 115, 22, 0.15); }
.nm-profile-btn:hover { box-shadow: 0 8px 20px rgba(249, 115, 22, 0.22); transform: translateY(-1px) scale(1.01); }
.nm-header-user-text { display: none; text-align: right; }
@media (min-width: 640px) { .nm-header-user-text { display: block; font-size: 14px; font-weight: 700; color: #111827; } }

.nm-content { flex: 1; padding: 1.75rem; max-width: 1080px; width: 100%; margin: 0 auto; padding-bottom: 140px; }

.nm-hero-strip { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 1.25rem; padding: 1.25rem; background: linear-gradient(135deg, rgba(255,255,255,0.92), rgba(248,250,252,0.88)); border: 1px solid rgba(226,232,240,0.95); border-radius: 24px; box-shadow: var(--nm-shadow); animation: nm-rise 520ms cubic-bezier(.2,.8,.2,1) both; }
@media (min-width: 860px) { .nm-hero-strip { grid-template-columns: 1.4fr 0.9fr; align-items: center; } }
.nm-hero-strip-left h2 { font-size: 24px; line-height: 1.08; letter-spacing: -0.04em; margin-top: 8px; }
.nm-hero-strip-left p { color: var(--nm-muted); margin-top: 8px; max-width: 58ch; }
.nm-hero-kicker { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; background: rgba(37, 99, 235, 0.09); color: #1d4ed8; font-size: 12px; font-weight: 700; }
.nm-hero-strip-right { display: grid; gap: 10px; grid-template-columns: 1fr 1fr; }
.nm-stat-card { padding: 14px 16px; border-radius: 18px; background: #fff; border: 1px solid var(--nm-border); box-shadow: 0 4px 12px rgba(15,23,42,.05); }
.nm-stat-card span { display: block; font-size: 12px; color: var(--nm-muted); margin-bottom: 5px; }
.nm-stat-card strong { display: block; font-size: 14px; color: var(--nm-text); }

.nm-plan-section { opacity: 0; pointer-events: none; max-height: 0; overflow: hidden; transform: translateY(12px); transition: opacity 260ms ease, transform 260ms ease, max-height 320ms ease; }
.nm-plan-section--visible { opacity: 1; pointer-events: auto; max-height: 4000px; overflow: visible; transform: translateY(0); animation: nm-fade-in 360ms ease both; }

.nm-plan-hero { background: linear-gradient(135deg, #ffffff, #f8fafc); border: 1px solid var(--nm-border); border-radius: 24px 24px 0 0; padding: 1.5rem 1.75rem; display: flex; align-items: center; gap: 16px; box-shadow: var(--nm-shadow); }
.nm-plan-hero-icon { width: 48px; height: 48px; border-radius: 14px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.nm-plan-hero-title { font-size: 22px; font-weight: 800; letter-spacing: -0.04em; }
.nm-plan-hero-meta { font-size: 13.5px; color: var(--nm-muted); margin-top: 3px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.nm-dot { color: #cbd5e1; }

.nm-hero-badge, .nm-badge, .nm-pill, .nm-paid-label, .nm-form-error, .nm-payments-count { font-size: 10.5px; font-weight: 800; border-radius: 9999px; letter-spacing: 0.02em; }
.nm-hero-badge { padding: 5px 11px; flex-shrink: 0; }
.nm-badge { padding: 4px 10px; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

.nm-plan-body { background: #fff; border: 1px solid var(--nm-border); border-top: none; border-radius: 0 0 24px 24px; padding: 1.75rem; display: grid; grid-template-columns: 1fr; gap: 1.5rem; box-shadow: var(--nm-shadow); }
@media (min-width: 640px) { .nm-plan-body { grid-template-columns: 1fr 1fr; padding: 2rem; } }
.nm-plan-payments { background: #fff; border: 1px solid var(--nm-border); border-top: none; border-radius: 0 0 24px 24px; padding: 1.75rem; margin-top: -1px; box-shadow: var(--nm-shadow); }

.nm-section-heading { font-size: 12.5px; font-weight: 800; color: #334155; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.08em; }
.nm-feature-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
.nm-feature-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14.5px; color: #334155; line-height: 1.5; animation: nm-rise 360ms ease both; }

.nm-quick-actions { display: flex; flex-direction: column; gap: 6px; }
.nm-action-list { display: flex; flex-direction: column; gap: 8px; }
.nm-action-btn { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: 16px; background: #fff; border: 1px solid var(--nm-border); cursor: pointer; transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease; color: #111827; font-family: inherit; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
.nm-action-btn:hover { background: #f8fafc; border-color: #cbd5e1; transform: translateY(-2px); box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08); }
.nm-action-icon { width: 36px; height: 36px; border-radius: 10px; background: #f8fafc; border: 1px solid var(--nm-border); display: flex; align-items: center; justify-content: center; color: var(--btn-accent, #2563eb); flex-shrink: 0; }
.nm-action-label { font-size: 14.5px; font-weight: 700; }

.nm-chatbot { border: 1px solid var(--nm-border); border-radius: 22px; overflow: hidden; background: #fff; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06); }
.nm-chatbot-topbar { padding: 12px 14px; border-bottom: 1px solid var(--nm-border); background: linear-gradient(180deg, #fff, #f8fafc); display: flex; align-items: center; justify-content: space-between; }
.nm-chatbot-status { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #0f172a; }
.nm-chatbot-dot { width: 8px; height: 8px; border-radius: 999px; background: #10b981; box-shadow: 0 0 0 5px rgba(16,185,129,.15); }
.nm-chatbot-hint { font-size: 11px; color: var(--nm-muted); }
.nm-chatbot-messages { min-height: 260px; max-height: 260px; overflow: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); }
.nm-chat-msg { max-width: 84%; padding: 11px 14px; border-radius: 18px; font-size: 13.5px; line-height: 1.45; box-shadow: 0 1px 3px rgba(0,0,0,0.08); animation: nm-pop 220ms ease both; }
.nm-chat-msg--bot { align-self: flex-start; background: #fff; color: #111827; border-bottom-left-radius: 4px; }
.nm-chat-msg--user { align-self: flex-end; background: linear-gradient(135deg, #2563eb, #3b82f6); color: #fff; border-bottom-right-radius: 4px; }
.nm-chatbot-inputbar { padding: 14px; border-top: 1px solid var(--nm-border); display: flex; gap: 8px; background: #fff; }

.nm-payments-card { background: linear-gradient(180deg, #fff, #fbfdff); border: 1px solid var(--nm-border); border-radius: 22px; overflow: hidden; }
.nm-payments-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1rem 0.75rem; gap: 12px; }
.nm-payments-title { display: block; font-size: 14px; font-weight: 800; color: #111827; }
.nm-payments-sub { display: block; font-size: 12px; color: var(--nm-muted); margin-top: 3px; }
.nm-payments-count { background: #eff6ff; color: #1d4ed8; padding: 6px 10px; }

.nm-table-wrap { overflow: auto; border-top: 1px solid var(--nm-border); }
.nm-table-wrap--compact { border-top: none; }
.nm-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.nm-table thead th { position: sticky; top: 0; background: linear-gradient(180deg, #fff, #f8fafc); color: #334155; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.08em; text-align: left; padding: 12px 16px; border-bottom: 1px solid var(--nm-border); }
.nm-table tbody td { padding: 14px 16px; border-bottom: 1px solid #eef2f7; font-size: 13.5px; color: #0f172a; white-space: nowrap; }
.nm-table tbody tr { transition: background-color 160ms ease, transform 160ms ease; }
.nm-table tbody tr:hover { background: #f8fafc; }
.nm-booking-id { font-family: 'DM Mono', ui-monospace, monospace; font-size: 12px; color: #1d4ed8; font-weight: 700; }
.nm-user-id { font-size: 11.5px; color: #94a3b8; margin-top: 4px; }

.nm-pill { display: inline-flex; align-items: center; justify-content: center; padding: 6px 10px; }
.nm-pill--warning { background: #fefce8; color: #854d0e; }
.nm-pill--success { background: #ecfdf5; color: #065f46; }
.nm-pill--info { background: #f0f9ff; color: #0c4a6e; }
.nm-pill--neutral { background: #f8fafc; color: #334155; }
.nm-paid-label { background: #ecfdf5; color: #065f46; padding: 5px 10px; display: inline-flex; }

.nm-accept-btn { display: inline-flex; align-items: center; gap: 6px; border: none; background: linear-gradient(135deg, #2563eb, #3b82f6); color: #fff; border-radius: 999px; padding: 8px 12px; cursor: pointer; font-size: 12px; font-weight: 700; box-shadow: 0 8px 18px rgba(37, 99, 235, 0.22); transition: transform 160ms ease, box-shadow 160ms ease; }
.nm-accept-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 20px rgba(37, 99, 235, 0.28); }

.nm-modal-backdrop { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; overflow-y: auto; }
.nm-modal-scrim { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.62); backdrop-filter: blur(10px); animation: nm-fade-in 180ms ease both; }
.nm-modal { position: relative; width: 100%; max-width: 760px; background: #fff; border-radius: 28px; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); overflow: hidden; animation: nm-pop-modal 220ms ease both; }
.nm-modal--sm { max-width: 460px; }
.nm-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.75rem; border-bottom: 1px solid var(--nm-border); background: linear-gradient(180deg, #ffffff, #f8fafc); }
.nm-modal-title { font-size: 16px; font-weight: 800; }
.nm-modal-sub { font-size: 12px; color: var(--nm-muted); margin-top: 4px; }
.nm-modal-actions { display: flex; gap: 10px; margin-top: 1.5rem; flex-wrap: wrap; }

.nm-quote-amount { font-size: 32px; font-weight: 800; color: #111827; letter-spacing: -0.05em; }
.nm-quote-label { font-size: 13px; color: var(--nm-muted); margin: 6px 0 1.25rem; }
.nm-quote-breakdown { background: #f8fafc; border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.nm-quote-row { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #334155; }
.nm-quote-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg, #64748b, #94a3b8); flex-shrink: 0; }
.nm-quote-timestamp { font-size: 11.5px; color: var(--nm-muted); margin-top: 14px; }

.nm-steps { position: relative; display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 1.75rem; }
.nm-step-track { position: absolute; top: 16px; left: 20px; right: 20px; height: 3px; background: #e2e8f0; z-index: 0; border-radius: 9999px; overflow: hidden; }
.nm-step-fill { height: 100%; background: linear-gradient(90deg, #2563eb, #3b82f6); border-radius: 9999px; transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.nm-step { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; min-width: 0; flex: 1; }
.nm-step-circle { width: 32px; height: 32px; border-radius: 50%; background: #fff; border: 2px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #64748b; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.nm-step--active .nm-step-circle { border-color: #2563eb; color: #2563eb; box-shadow: 0 0 0 4px rgba(37,99,235,.1); }
.nm-step--done .nm-step-circle { background: linear-gradient(135deg, #2563eb, #3b82f6); border-color: transparent; color: #fff; }
.nm-step-label { font-size: 11px; color: #64748b; text-align: center; max-width: 84px; line-height: 1.3; }
.nm-step--active .nm-step-label { color: #0f172a; font-weight: 700; }

.nm-form-error { display: inline-flex; align-items: center; gap: 8px; background: #fef2f2; color: #b91c1c; padding: 10px 12px; margin-bottom: 1rem; }
.nm-form-body { display: grid; gap: 1rem; }
.nm-form-step { animation: nm-rise 220ms ease both; }
.nm-form-section { margin-bottom: 1rem; }
.nm-form-label { display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 8px; }
.nm-form-info { margin-top: 10px; background: linear-gradient(135deg, #eff6ff, #f8fafc); border: 1px solid #dbeafe; color: #1d4ed8; padding: 10px 12px; border-radius: 14px; font-size: 12.5px; }
.nm-toggle-group { display: flex; gap: 8px; flex-wrap: wrap; }
.nm-toggle-btn { appearance: none; border: 1px solid #cbd5e1; background: #fff; color: #0f172a; border-radius: 999px; padding: 10px 14px; font-weight: 700; font-size: 13px; cursor: pointer; transition: transform 160ms ease, background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease; }
.nm-toggle-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 14px rgba(15,23,42,.06); }
.nm-toggle-btn--active { background: linear-gradient(135deg, #2563eb, #3b82f6); border-color: transparent; color: #fff; box-shadow: 0 10px 20px rgba(37,99,235,.18); }
.nm-check-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
@media (min-width: 520px) { .nm-check-grid { grid-template-columns: 1fr 1fr; } }
.nm-check-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 14px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; transition: transform 160ms ease, border-color 160ms ease, background-color 160ms ease; }
.nm-check-item:hover { transform: translateY(-1px); border-color: #cbd5e1; }
.nm-check-item--checked { background: #eff6ff; border-color: #bfdbfe; }
.nm-check-box { width: 18px; height: 18px; border-radius: 5px; border: 1.5px solid #cbd5e1; display: flex; align-items: center; justify-content: center; color: #2563eb; background: #fff; }
.nm-check-item--checked .nm-check-box { border-color: #2563eb; }

.nm-input, .nm-select, .nm-textarea { width: 100%; border: 1px solid #cbd5e1; background: #fff; color: #0f172a; border-radius: 14px; padding: 12px 14px; font: inherit; transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease; }
.nm-input:focus, .nm-select:focus, .nm-textarea:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37,99,235,.12); }
.nm-textarea { resize: vertical; min-height: 120px; }

.nm-search-wrap { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #cbd5e1; border-radius: 14px; padding: 0 12px; min-width: 240px; }
.nm-search-wrap .nm-input { border: none; padding-left: 0; }
.nm-search-wrap .nm-input:focus { box-shadow: none; }

.nm-upload-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 14px; border: 1px dashed #cbd5e1; border-radius: 14px; background: #f8fafc; cursor: pointer; color: #0f172a; font-weight: 700; }
.nm-preview-wrap { margin-top: 12px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.nm-preview-img { width: 120px; height: 84px; object-fit: cover; border-radius: 14px; border: 1px solid #e2e8f0; }
.nm-remove-btn { display: inline-flex; align-items: center; gap: 6px; border: 1px solid #fecaca; background: #fff1f2; color: #be123c; border-radius: 999px; padding: 8px 12px; cursor: pointer; font-weight: 700; }

.nm-form-nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 1.25rem; }
.nm-form-disclaimer { font-size: 11px; color: #64748b; margin-top: 12px; }

.nm-btn { border: none; border-radius: 14px; padding: 12px 14px; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease, background-color 160ms ease; }
.nm-btn:hover { transform: translateY(-1px); }
.nm-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.nm-btn--primary { background: linear-gradient(135deg, #2563eb, #3b82f6); color: #fff; box-shadow: 0 10px 20px rgba(37,99,235,.2); }
.nm-btn--ghost { background: #fff; color: #0f172a; border: 1px solid #cbd5e1; }
.nm-btn--sm { padding: 10px 12px; border-radius: 12px; font-size: 12.5px; }

.nm-success { min-height: 320px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem 1rem; animation: nm-rise 260ms ease both; }
.nm-success-icon { width: 64px; height: 64px; border-radius: 999px; display: flex; align-items: center; justify-content: center; background: #ecfdf5; color: #059669; margin-bottom: 1rem; }
.nm-success-title { font-size: 22px; font-weight: 800; letter-spacing: -0.04em; }
.nm-success-body { color: var(--nm-muted); margin-top: 8px; max-width: 36ch; }

.nm-profile-sidebar { position: fixed; top: 0; right: 0; height: 100vh; width: min(380px, 94vw); background: #fff; z-index: 60; transform: translateX(100%); transition: transform 220ms ease; box-shadow: -20px 0 40px rgba(15,23,42,.18); display: flex; flex-direction: column; }
.nm-profile-sidebar--open { transform: translateX(0); }
.nm-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.0); pointer-events: none; z-index: 55; transition: background-color 220ms ease; }
.nm-overlay--visible { pointer-events: auto; background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(6px); }

.nm-sidebar-header { padding: 1.25rem 1.25rem 1rem; border-bottom: 1px solid var(--nm-border); display: flex; align-items: center; justify-content: space-between; }
.nm-profile-name { font-size: 15px; font-weight: 800; }
.nm-profile-role { font-size: 12px; color: var(--nm-muted); margin-top: 3px; }
.nm-icon-btn { width: 38px; height: 38px; border-radius: 999px; border: 1px solid var(--nm-border); background: #fff; display: grid; place-items: center; cursor: pointer; }
.nm-profile-body { padding: 1rem 1.25rem; display: grid; gap: 1rem; overflow: auto; }
.nm-profile-card, .nm-profile-section { border: 1px solid var(--nm-border); border-radius: 18px; background: linear-gradient(180deg, #fff, #fafafa); padding: 1rem; }
.nm-profile-card-label, .nm-profile-section-label { font-size: 11px; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
.nm-profile-address { font-size: 13px; line-height: 1.7; color: #0f172a; font-style: normal; }
.nm-profile-action { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 16px; border: 1px solid transparent; background: #fff; cursor: pointer; text-align: left; transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease; }
.nm-profile-action:hover { background: #f8fafc; border-color: #e2e8f0; transform: translateY(-1px); }
.nm-profile-action-icon { width: 36px; height: 36px; display: grid; place-items: center; border-radius: 12px; background: #eff6ff; color: #2563eb; flex-shrink: 0; }
.nm-profile-action-title { display: block; font-size: 13.5px; font-weight: 800; color: #0f172a; }
.nm-profile-action-sub { display: block; font-size: 11.5px; color: #64748b; margin-top: 2px; }
.nm-profile-signout { width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid #fecaca; background: #fff1f2; color: #be123c; border-radius: 14px; padding: 12px 14px; font-weight: 800; cursor: pointer; }
.nm-profile-footer { padding: 1rem 1.25rem 1.25rem; border-top: 1px solid var(--nm-border); display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: #64748b; }

/* ── Bookings toolbar ── */
.nm-bookings-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
.nm-toolbar-left { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.nm-toolbar-right { display: flex; align-items: center; gap: 8px; }
.nm-pagination { display: flex; align-items: center; justify-content: space-between; padding: 12px 0 2px; gap: 8px; }
.nm-page-info { font-size: 12.5px; color: var(--nm-muted); }
.nm-page-btns { display: flex; gap: 6px; }

/* ── Mobile footer ── */
.nm-mobile-footer { position: fixed; left: 0; right: 0; bottom: 0; z-index: 35; padding: 0.75rem; background: linear-gradient(180deg, rgba(248,250,252,0), rgba(248,250,252,0.92) 16%, rgba(248,250,252,1)); backdrop-filter: blur(14px); }
.nm-mobile-footer-inner { background: rgba(255,255,255,0.96); border: 1px solid rgba(226,232,240,0.9); border-radius: 22px; padding: 0.9rem; box-shadow: var(--nm-shadow); }
.nm-mobile-header-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 0.75rem; }
.nm-mobile-nav { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.nm-mobile-nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; border: 1px solid #e2e8f0; border-radius: 16px; background: #fff; padding: 10px 6px; font-size: 11px; font-weight: 800; color: #475569; }
.nm-mobile-nav-item--active { background: #eff6ff; color: #1d4ed8; }
@media (min-width: 768px) { .nm-mobile-footer { display: none; } }

/* ── Account Settings ── */
.nm-account-settings { padding: 1.75rem; max-width: 1080px; margin: 0 auto; }
.nm-account-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--nm-border); }
.nm-account-header h2 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.04em; }
.nm-settings-section { background: #fff; border: 1px solid var(--nm-border); border-radius: 24px; padding: 2rem; margin-bottom: 2rem; box-shadow: var(--nm-shadow); }
.nm-settings-section h3 { font-size: 15px; font-weight: 800; color: #334155; margin-bottom: 1.25rem; letter-spacing: 0.04em; text-transform: uppercase; }
.nm-profile-info label { display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 8px; }

/* ── Preferences toggle row ── */
.nm-pref-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--nm-border);
  border-radius: 18px;
  background: #f8fafc;
}
.nm-pref-text { min-width: 0; }
.nm-pref-title { display: block; font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.nm-pref-sub { display: block; font-size: 12.5px; color: var(--nm-muted); line-height: 1.5; }

/* Toggle switch */
.nm-toggle-switch {
  position: relative;
  width: 48px;
  height: 28px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 220ms ease, box-shadow 220ms ease;
  padding: 0;
}
.nm-toggle-switch--on {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  box-shadow: 0 4px 12px rgba(37,99,235,.3);
}
.nm-toggle-switch--off {
  background: #cbd5e1;
  box-shadow: none;
}
.nm-toggle-thumb {
  position: absolute;
  top: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,.18);
  transition: left 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.nm-toggle-switch--on .nm-toggle-thumb { left: 23px; }
.nm-toggle-switch--off .nm-toggle-thumb { left: 3px; }

@keyframes nm-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes nm-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes nm-pop { from { opacity: 0; transform: scale(.98) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes nm-pop-modal { from { opacity: 0; transform: translateY(18px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }

@media (max-width: 767px) {
  .nm-root { padding-bottom: 126px; }
  .nm-content { padding: 1rem; padding-bottom: 120px; }
  .nm-header { padding: 0 1rem; }
  .nm-header-title { font-size: 16px; }
  .nm-plan-hero, .nm-plan-body, .nm-plan-payments { border-radius: 20px; }
  .nm-plan-hero { flex-wrap: wrap; }
  .nm-modal-backdrop { padding: 0.8rem; align-items: flex-end; }
  .nm-modal { border-radius: 22px 22px 0 0; max-width: 100%; }
  .nm-modal-header { padding: 1rem 1.1rem; }
  .nm-form-nav { flex-direction: column; align-items: stretch; }
  .nm-form-nav > div { width: 100%; }
  .nm-btn { width: 100%; }
  .nm-hero-strip-right { grid-template-columns: 1fr; }
  .nm-search-wrap { min-width: 0; width: 100%; }
  .nm-bookings-toolbar { flex-direction: column; align-items: stretch; }
  .nm-toolbar-left, .nm-toolbar-right { width: 100%; }
  .nm-account-settings { padding: 1rem; }
  .nm-pref-row { flex-direction: row; }
}
`;
