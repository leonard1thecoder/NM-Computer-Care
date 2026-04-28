'use client';

import React, { useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {
  Menu,
  X,
  Settings,
  Rocket,
  Building2,
  Users,
  Mail,
  BarChart3,
  Search,
  Download,
  ChevronRight,
  CheckCircle,
  Layers,
  Laptop,
  Bell,
  PencilLine,
  PieChart,
  TrendingUp,
  Activity,
  UserCheck,
  FileText,
  AlignLeft,
  MessageCircle,
  Reply,
  Send,
  Clock,
  MailOpen,
  Inbox,
} from 'lucide-react';

type PlanKey = 'basic' | 'performance' | 'business';
type TabKey = 'overview' | 'users' | 'newsletter';

type PlanConfig = {
  title: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  accent: string;
  price: string;
  features: string[];
};

type UserRow = { id: string; name: string; email: string; plan: PlanKey };
type NewsletterRow = { id: string; title: string; shortDesc: string; description: string; status: 'Published' | 'Draft' | 'Scheduled'; audience: string; updated: string };

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  received: string;
  read: boolean;
  reply?: string;
};

const INITIAL_MESSAGES: ContactMessage[] = [
  { id: 'MSG-001', name: 'Sipho Zulu', email: 'sipho@agency.co.za', subject: 'Laptop screen replacement', message: 'Hi there, I have a cracked screen on my Dell XPS 15. Could you give me a quote for a replacement and how long it would take?', received: '10 min ago', read: false },
  { id: 'MSG-002', name: 'Fatima Osman', email: 'fatima@gmail.com', subject: 'Business Care inquiry', message: 'We are a small business with 8 computers. Does your Business Care plan cover all machines or is it per device? Looking to sign up ASAP.', received: '45 min ago', read: false },
  { id: 'MSG-003', name: 'Bongani Moyo', email: 'bongani@moyo.co.za', subject: 'Windows 11 upgrade issue', message: 'I tried upgrading to Windows 11 myself and now my PC is very slow. Can you help fix this? I am in Pretoria East.', received: '2 hours ago', read: false },
  { id: 'MSG-004', name: 'Taryn Louw', email: 'taryn.louw@email.com', subject: 'Data recovery urgent', message: 'My external hard drive stopped working and I have important project files on it. Is data recovery something you do and how much does it cost?', received: '5 hours ago', read: true },
  { id: 'MSG-005', name: 'Kabelo Sithole', email: 'kabelo@startup.co.za', subject: 'RAM upgrade for MacBook', message: 'Is it possible to upgrade RAM on a 2019 MacBook Pro? Or would you recommend a different solution for better performance?', received: 'Yesterday', read: true },
  { id: 'MSG-006', name: 'Yusuf Hendricks', email: 'yusuf.h@webcraft.co.za', subject: 'Virus removal & cleanup', message: 'My PC has been running really slowly and I keep getting pop-up ads. I think I have a virus. How quickly can I bring it in?', received: '2 days ago', read: true },
];

const PLANS: Record<PlanKey, PlanConfig> = {
  basic: { title: 'Basic Care', icon: Settings, accent: '#2563EB', price: 'R299 – R399', features: ['Troubleshooting & diagnostics', 'Software fixes & virus removal', 'Windows 7/10 → 11 upgrades', 'Basic performance tune-up'] },
  performance: { title: 'Performance Care', icon: Rocket, accent: '#7C3AED', price: 'R499 – R699', features: ['Everything in Basic Care', 'Hardware diagnosis & upgrades (RAM, SSD)', 'Data backup & recovery', 'Full system optimisation'] },
  business: { title: 'Business Care', icon: Building2, accent: '#D97706', price: 'R899 – R1,299', features: ['Everything in Performance Care', 'On-site or remote support (2 hrs/month)', 'Network setup & Wi-Fi optimisation', 'Preventive maintenance'] },
};

const USERS: UserRow[] = [
  { id: 'U-001', name: 'John Doe', email: 'john@example.com', plan: 'basic' },
  { id: 'U-002', name: 'Sarah Chen', email: 'sarah@business.co.za', plan: 'business' },
  { id: 'U-003', name: 'Themba Nkosi', email: 'themba@gmail.com', plan: 'performance' },
  { id: 'U-004', name: 'Priya Patel', email: 'priya@consult.co.za', plan: 'basic' },
  { id: 'U-005', name: 'Ayesha Mokoena', email: 'ayesha@office.co.za', plan: 'performance' },
  { id: 'U-006', name: 'Musa Khumalo', email: 'musa@gmail.com', plan: 'business' },
];

const SUBSCRIBERS = [
  { id: 'S-001', name: 'John Doe', email: 'john@example.com', plan: 'Basic Care', since: 'Jan 2024' },
  { id: 'S-002', name: 'Sarah Chen', email: 'sarah@business.co.za', plan: 'Business Care', since: 'Feb 2024' },
  { id: 'S-003', name: 'Themba Nkosi', email: 'themba@gmail.com', plan: 'Performance Care', since: 'Mar 2024' },
  { id: 'S-004', name: 'Priya Patel', email: 'priya@consult.co.za', plan: 'Basic Care', since: 'Mar 2024' },
  { id: 'S-005', name: 'Ayesha Mokoena', email: 'ayesha@office.co.za', plan: 'Performance Care', since: 'Apr 2024' },
  { id: 'S-006', name: 'Musa Khumalo', email: 'musa@gmail.com', plan: 'Business Care', since: 'Apr 2024' },
  { id: 'S-007', name: 'Lindiwe Dube', email: 'lindiwe@gmail.com', plan: 'Basic Care', since: 'May 2024' },
  { id: 'S-008', name: 'Sipho Zulu', email: 'sipho@agency.co.za', plan: 'Business Care', since: 'Jun 2024' },
];

const INITIAL_NEWSLETTERS: NewsletterRow[] = [
  { id: 'N-001', title: 'Winter Service Promo', shortDesc: 'Seasonal discounts on all PC repairs.', description: 'Get your PC winter-ready with our exclusive seasonal repair packages. Limited time offer for all plan holders.', status: 'Published', audience: 'All Users', updated: '2 days ago' },
  { id: 'N-002', title: 'SSD Upgrade Campaign', shortDesc: 'Boost your speed with a fast SSD.', description: 'Upgrade your existing HDD to a lightning-fast SSD this month. Includes free data migration for Performance Care members.', status: 'Draft', audience: 'Performance Care', updated: '6 hours ago' },
  { id: 'N-003', title: 'Business Support Tips', shortDesc: 'Monthly tips for business clients.', description: 'This month we share our top 5 tips to keep your office network running smoothly, written for our Business Care subscribers.', status: 'Scheduled', audience: 'Business Care', updated: 'Tomorrow' },
  { id: 'N-004', title: 'Holiday Maintenance Reminder', shortDesc: 'Year-end service reminder.', description: 'Don\'t let the holidays catch you off-guard. Book your year-end PC maintenance session before December 20th.', status: 'Published', audience: 'Basic Care', updated: '1 week ago' },
];

// ─── Add Newsletter Modal ────────────────────────────────────────────────────
type AddNewsletterModalProps = {
  onClose: () => void;
  onSave: (entry: NewsletterRow) => void;
};

function AddNewsletterModal({ onClose, onSave }: AddNewsletterModalProps) {
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('All Users');
  const [status, setStatus] = useState<'Published' | 'Draft' | 'Scheduled'>('Draft');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'Title is required.';
    if (!shortDesc.trim()) e.shortDesc = 'Short description is required.';
    if (!description.trim()) e.description = 'Newsletter description is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const now = new Date();
    const updated = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}`;
    onSave({
      id: `N-${String(Math.floor(Math.random() * 900) + 100)}`,
      title: title.trim(),
      shortDesc: shortDesc.trim(),
      description: description.trim(),
      status,
      audience,
      updated,
    });
    onClose();
  };

  return (
    <div className="nm-modal-backdrop" onClick={(e) => { if ((e.target as HTMLElement).classList.contains('nm-modal-backdrop')) onClose(); }}>
      <div className="nm-modal">
        {/* Header */}
        <div className="nm-modal-header">
          <div className="nm-modal-header-left">
            <div className="nm-modal-icon"><PencilLine size={18} /></div>
            <div>
              <h2 className="nm-modal-title">New Newsletter</h2>
              <p className="nm-modal-subtitle">Fill in the details below to create a campaign</p>
            </div>
          </div>
          <button className="nm-modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>

        {/* Body */}
        <div className="nm-modal-body">
          {/* Title */}
          <div className="nm-field">
            <label className="nm-label">
              <FileText size={13} /> Campaign Title
            </label>
            <input
              className={`nm-field-input ${errors.title ? 'nm-field-input--error' : ''}`}
              placeholder="e.g. Winter Service Promo"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: '' })); }}
            />
            {errors.title && <span className="nm-field-error">{errors.title}</span>}
          </div>

          {/* Short Description */}
          <div className="nm-field">
            <label className="nm-label">
              <AlignLeft size={13} /> Short Description
            </label>
            <input
              className={`nm-field-input ${errors.shortDesc ? 'nm-field-input--error' : ''}`}
              placeholder="One-liner shown in campaign list (max 100 chars)"
              maxLength={100}
              value={shortDesc}
              onChange={(e) => { setShortDesc(e.target.value); setErrors((prev) => ({ ...prev, shortDesc: '' })); }}
            />
            <span className="nm-field-hint">{shortDesc.length}/100</span>
            {errors.shortDesc && <span className="nm-field-error">{errors.shortDesc}</span>}
          </div>

          {/* Full Description */}
          <div className="nm-field">
            <label className="nm-label">
              <Mail size={13} /> Newsletter Description
            </label>
            <textarea
              className={`nm-field-textarea ${errors.description ? 'nm-field-input--error' : ''}`}
              placeholder="Write the full newsletter body here…"
              rows={5}
              value={description}
              onChange={(e) => { setDescription(e.target.value); setErrors((prev) => ({ ...prev, description: '' })); }}
            />
            {errors.description && <span className="nm-field-error">{errors.description}</span>}
          </div>

          {/* Audience + Status row */}
          <div className="nm-field-row">
            <div className="nm-field nm-field--half">
              <label className="nm-label"><Users size={13} /> Audience</label>
              <select className="nm-field-input nm-field-select" value={audience} onChange={(e) => setAudience(e.target.value)}>
                <option>All Users</option>
                <option>Basic Care</option>
                <option>Performance Care</option>
                <option>Business Care</option>
              </select>
            </div>
            <div className="nm-field nm-field--half">
              <label className="nm-label"><Activity size={13} /> Status</label>
              <select className="nm-field-input nm-field-select" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="nm-modal-footer">
          <button className="nm-btn nm-btn--ghost" onClick={onClose} type="button">Cancel</button>
          <button className="nm-btn nm-btn--primary" onClick={handleSave} type="button">
            <CheckCircle size={15} /> Save Newsletter
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── View Subscribers Modal ──────────────────────────────────────────────────
function ViewSubscribersModal({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return SUBSCRIBERS;
    return SUBSCRIBERS.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.plan.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="nm-modal-backdrop" onClick={(e) => { if ((e.target as HTMLElement).classList.contains('nm-modal-backdrop')) onClose(); }}>
      <div className="nm-modal nm-modal--wide">
        <div className="nm-modal-header">
          <div className="nm-modal-header-left">
            <div className="nm-modal-icon nm-modal-icon--teal"><UserCheck size={18} /></div>
            <div>
              <h2 className="nm-modal-title">Newsletter Subscribers</h2>
              <p className="nm-modal-subtitle">{SUBSCRIBERS.length} active subscribers across all plans</p>
            </div>
          </div>
          <button className="nm-modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>

        <div className="nm-modal-body">
          {/* Search */}
          <div className="nm-search-wrap nm-search-wrap--modal">
            <Search size={14} />
            <input
              className="nm-input"
              placeholder="Search subscribers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Stats pills */}
          <div className="nm-sub-stats">
            <div className="nm-sub-stat"><span className="nm-sub-stat-dot" style={{ background: '#2563EB' }} />Basic Care <strong>{SUBSCRIBERS.filter(s => s.plan === 'Basic Care').length}</strong></div>
            <div className="nm-sub-stat"><span className="nm-sub-stat-dot" style={{ background: '#7C3AED' }} />Performance <strong>{SUBSCRIBERS.filter(s => s.plan === 'Performance Care').length}</strong></div>
            <div className="nm-sub-stat"><span className="nm-sub-stat-dot" style={{ background: '#D97706' }} />Business <strong>{SUBSCRIBERS.filter(s => s.plan === 'Business Care').length}</strong></div>
          </div>

          {/* Table */}
          <div className="nm-table-wrap">
            <table className="nm-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Plan</th>
                  <th>Since</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: '24px' }}>No subscribers found.</td></tr>
                ) : filtered.map((s) => (
                  <tr key={s.id}>
                    <td><span className="nm-booking-id">{s.id}</span></td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>
                      <span className={`nm-pill ${s.plan === 'Basic Care' ? 'nm-pill--blue' : s.plan === 'Performance Care' ? 'nm-pill--purple' : 'nm-pill--amber'}`}>
                        {s.plan}
                      </span>
                    </td>
                    <td style={{ color: '#64748b', fontSize: '13px' }}>{s.since}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="nm-modal-footer">
          <button className="nm-btn nm-btn--ghost" onClick={onClose} type="button">Close</button>
          <button className="nm-btn nm-btn--primary" type="button"><Download size={15} /> Export List</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>('overview');
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null);
  const [search, setSearch] = useState('');
  const [newsletters, setNewsletters] = useState<NewsletterRow[]>(INITIAL_NEWSLETTERS);
  const [showAddNewsletter, setShowAddNewsletter] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>(INITIAL_MESSAGES);
  const [showMessages, setShowMessages] = useState(false);

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return USERS;
    return USERS.filter((user) =>
      user.id.toLowerCase().includes(q) ||
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      PLANS[user.plan].title.toLowerCase().includes(q)
    );
  }, [search]);

  const openPlan = (plan: PlanKey) => { setSelectedPlan(plan); setTab('overview'); setMobileOpen(false); };
  const closePlan = () => setSelectedPlan(null);
  const navigate = (nextTab: TabKey) => { setSelectedPlan(null); setTab(nextTab); setMobileOpen(false); };

  const handleAddNewsletter = (entry: NewsletterRow) => {
    setNewsletters((prev) => [entry, ...prev]);
  };

  return (
    <div className="nm-root">
      <style>{styles}</style>

      {/* Modals */}
      {showMessages && (
        <MessagesModal
          messages={messages}
          onClose={() => setShowMessages(false)}
          onUpdate={setMessages}
        />
      )}
      {showAddNewsletter && (
        <AddNewsletterModal onClose={() => setShowAddNewsletter(false)} onSave={handleAddNewsletter} />
      )}
      {showSubscribers && (
        <ViewSubscribersModal onClose={() => setShowSubscribers(false)} />
      )}

      {mobileOpen && <div className="nm-overlay" onClick={() => setMobileOpen(false)} />}

      <aside className={`nm-sidebar ${mobileOpen ? 'nm-sidebar--open' : ''}`}>
        <div className="nm-sidebar-brand">
          <div className="nm-avatar nm-avatar--brand">NM</div>
          <div>
            <p className="nm-sidebar-brand-name">NM Computer Care</p>
            <p className="nm-sidebar-brand-sub">Admin Portal</p>
          </div>
          <button className="nm-sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>

        <p className="nm-sidebar-label">MANAGE</p>
        <nav className="nm-sidebar-nav">
          <SidebarButton active={tab === 'overview' && !selectedPlan} icon={<BarChart3 size={18} />} label="Overview" onClick={() => navigate('overview')} />
          <SidebarButton active={tab === 'users'} icon={<Users size={18} />} label="Registered Users" onClick={() => navigate('users')} />
          <SidebarButton active={tab === 'newsletter'} icon={<Mail size={18} />} label="Newsletter" onClick={() => navigate('newsletter')} />
        </nav>

        <p className="nm-sidebar-label">PLANS</p>
        <nav className="nm-sidebar-nav">
          {(Object.keys(PLANS) as PlanKey[]).map((key) => {
            const plan = PLANS[key];
            const Icon = plan.icon;
            const active = selectedPlan === key;
            return (
              <button key={key} className={`nm-nav-item ${active ? 'nm-nav-item--active' : ''}`} onClick={() => openPlan(key)}>
                <div className="nm-nav-icon" style={{ background: active ? `${plan.accent}18` : undefined }}>
                  <Icon size={18} style={{ color: active ? plan.accent : undefined }} />
                </div>
                <div className="nm-nav-text"><span className="nm-nav-title">{plan.title}</span></div>
                <ChevronRight size={14} style={{ color: active ? plan.accent : '#94a3b8', marginLeft: 'auto' }} />
              </button>
            );
          })}
        </nav>

        <div className="nm-sidebar-footer">
          <div className="nm-sidebar-footer-row">
            <div className="nm-avatar nm-avatar--small nm-avatar--user">AD</div>
            <div style={{ minWidth: 0 }}>
              <p className="nm-sidebar-footer-name">Admin</p>
              <p className="nm-sidebar-footer-role">Super Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="nm-main">
        <header className="nm-header">
          <div className="nm-header-left">
            <button className="nm-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={18} /></button>
            <div>
              <h1 className="nm-header-title">Admin Dashboard</h1>
              <p className="nm-header-subtitle">Full control • Real-time insights</p>
            </div>
          </div>
          <div className="nm-header-right">
            <button className="nm-btn nm-btn--ghost" type="button"><Download size={16} /> Export CSV</button>
            <div className="nm-avatar nm-avatar--user">AD</div>
          </div>
        </header>

        <main className="nm-content">
          {selectedPlan ? (
            <PlanAdminView planKey={selectedPlan} onBack={closePlan} />
          ) : tab === 'overview' ? (
            <OverviewTab onOpenPlan={openPlan} messages={messages} onViewMessages={() => setShowMessages(true)} />
          ) : tab === 'users' ? (
            <UsersTab filteredUsers={filteredUsers} search={search} setSearch={setSearch} />
          ) : (
            <NewsletterTab
              newsletters={newsletters}
              onAddNewsletter={() => setShowAddNewsletter(true)}
              onViewSubscribers={() => setShowSubscribers(true)}
            />
          )}
        </main>
      </main>
    </div>
  );
}

function SidebarButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return <button className={`nm-nav-item ${active ? 'nm-nav-item--active' : ''}`} onClick={onClick}><div className="nm-nav-icon">{icon}</div><div className="nm-nav-text"><span className="nm-nav-title">{label}</span></div><ChevronRight size={14} style={{ color: active ? '#fff' : '#94a3b8', marginLeft: 'auto' }} /></button>;
}

function OverviewTab({ onOpenPlan, messages, onViewMessages }: { onOpenPlan: (plan: PlanKey) => void; messages: ContactMessage[]; onViewMessages: () => void }) {
  const unread = messages.filter(m => !m.read).length;
  const planPie: ApexOptions = { chart: { type: 'pie', toolbar: { show: false } }, labels: ['Basic', 'Performance', 'Business'], colors: [PLANS.basic.accent, PLANS.performance.accent, PLANS.business.accent], legend: { position: 'bottom' }, dataLabels: { enabled: true }, stroke: { width: 2, colors: ['#fff'] }, tooltip: { theme: 'light' } };
  const statusPie: ApexOptions = { chart: { type: 'pie', toolbar: { show: false } }, labels: ['Pending', 'Approved', 'Completed'], colors: ['#F59E0B', '#10B981', '#3B82F6'], legend: { position: 'bottom' }, dataLabels: { enabled: true }, stroke: { width: 2, colors: ['#fff'] }, tooltip: { theme: 'light' } };
  const bookingsTrend: ApexOptions = { chart: { type: 'bar', toolbar: { show: false } }, plotOptions: { bar: { borderRadius: 10, columnWidth: '40%' } }, dataLabels: { enabled: false }, xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], labels: { style: { colors: '#64748b' } } }, yaxis: { labels: { style: { colors: '#64748b' } } }, grid: { borderColor: '#e2e8f0' }, tooltip: { theme: 'light' }, colors: ['#2563EB'] };
  const revenueLine: ApexOptions = { chart: { type: 'line', toolbar: { show: false } }, stroke: { curve: 'smooth', width: 3 }, dataLabels: { enabled: false }, xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], labels: { style: { colors: '#64748b' } } }, yaxis: { labels: { style: { colors: '#64748b' } } }, grid: { borderColor: '#e2e8f0' }, tooltip: { theme: 'light' }, colors: ['#7C3AED'] };

  return <>
    <div className="nm-hero-strip"><div className="nm-hero-strip-left"><div className="nm-hero-kicker"><Bell size={14} /> Admin Overview</div><h2>Business at a glance</h2><p>Real-time metrics, user growth, service plans, and newsletter activity.</p></div><div className="nm-hero-strip-right"><div className="nm-stat-card"><span>Total Users</span><strong>1,284</strong></div><div className="nm-stat-card"><span>Total Subscribers</span><strong>856</strong></div></div></div>

    <div className="nm-metrics-row"><MetricCard title="Open Bookings" value="214" icon={<Activity size={16} />} /><MetricCard title="Published Newsletters" value="48" icon={<Mail size={16} />} /><MetricCard title="Monthly Growth" value="+18.4%" icon={<TrendingUp size={16} />} /><MetricCard title="Active Plans" value="3" icon={<PieChart size={16} />} /></div>

    <div className="nm-grid-2">
      <section className="nm-settings-section"><div className="nm-section-head-row"><h3>Users by Plan</h3><span className="nm-subtext">Distribution overview</span></div><ReactApexChart options={planPie} series={[48, 32, 20]} type="pie" height={320} /></section>
      <section className="nm-settings-section"><div className="nm-section-head-row"><h3>Booking Status</h3><span className="nm-subtext">Current workflow</span></div><ReactApexChart options={statusPie} series={[42, 35, 23]} type="pie" height={320} /></section>
      <section className="nm-settings-section"><div className="nm-section-head-row"><h3>Bookings Trend</h3><span className="nm-subtext">Last 7 days</span></div><ReactApexChart options={bookingsTrend} series={[{ name: 'Bookings', data: [14, 19, 12, 22, 25, 18, 30] }]} type="bar" height={320} /></section>
      <section className="nm-settings-section"><div className="nm-section-head-row"><h3>Revenue Growth</h3><span className="nm-subtext">Last 7 months</span></div><ReactApexChart options={revenueLine} series={[{ name: 'Revenue', data: [18, 24, 20, 29, 33, 37, 42] }]} type="line" height={320} /></section>
    </div>

    <section className="nm-settings-section"><div className="nm-section-head-row"><h3>Service Plans</h3><span className="nm-subtext">Open any plan admin view</span></div><div className="nm-plan-summary-grid">{(Object.keys(PLANS) as PlanKey[]).map((key) => { const plan = PLANS[key]; const Icon = plan.icon; return <button key={key} className="nm-summary-card" onClick={() => onOpenPlan(key)}><div className="nm-summary-top"><div className="nm-summary-icon" style={{ background: plan.accent }}><Icon size={18} /></div><div><strong>{plan.title}</strong><span>{plan.price}</span></div></div><p>{plan.features[0]}</p></button>; })}</div></section>

    <section className="nm-settings-section nm-messages-card">
      <div className="nm-section-head-row">
        <div className="nm-messages-title-wrap">
          <div className="nm-messages-icon-wrap"><Inbox size={18} /></div>
          <div>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>Messages</h3>
            <p className="nm-subtext" style={{ marginTop: 3 }}>Contact form requests from clients</p>
          </div>
        </div>
        <button className="nm-btn nm-btn--messages" type="button" onClick={onViewMessages}>
          <MailOpen size={15} /> View Messages
        </button>
      </div>
      <div className="nm-msg-stats-row">
        <div className="nm-msg-stat nm-msg-stat--unread">
          <div className="nm-msg-stat-icon"><MessageCircle size={20} /></div>
          <div>
            <span>Unread</span>
            <strong>{unread}</strong>
          </div>
          {unread > 0 && <span className="nm-msg-badge">{unread} new</span>}
        </div>
        <div className="nm-msg-stat">
          <div className="nm-msg-stat-icon nm-msg-stat-icon--grey"><MailOpen size={20} /></div>
          <div>
            <span>Total Messages</span>
            <strong>{messages.length}</strong>
          </div>
        </div>
        <div className="nm-msg-stat">
          <div className="nm-msg-stat-icon nm-msg-stat-icon--green"><Reply size={20} /></div>
          <div>
            <span>Replied</span>
            <strong>{messages.filter(m => m.reply).length}</strong>
          </div>
        </div>
      </div>
      <div className="nm-msg-preview-list">
        {messages.slice(0, 3).map(m => (
          <div key={m.id} className={`nm-msg-preview-item ${!m.read ? 'nm-msg-preview-item--unread' : ''}`}>
            <div className="nm-msg-avatar">{m.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
            <div className="nm-msg-preview-body">
              <div className="nm-msg-preview-top">
                <strong>{m.name}</strong>
                <span className="nm-msg-preview-time"><Clock size={11} /> {m.received}</span>
              </div>
              <div className="nm-msg-preview-subject">{m.subject}</div>
              <div className="nm-msg-preview-snippet">{m.message.slice(0, 80)}…</div>
            </div>
            {!m.read && <span className="nm-unread-dot" />}
          </div>
        ))}
      </div>
    </section>

    <section className="nm-settings-section"><div className="nm-section-head-row"><h3>Newsletter Activity</h3><span className="nm-subtext">Recent campaigns</span></div><div className="nm-news-mini-list">{INITIAL_NEWSLETTERS.slice(0, 3).map((item) => <div className="nm-news-mini-item" key={item.id}><div><strong>{item.title}</strong><span>{item.audience}</span></div><em>{item.status}</em></div>)}</div></section>
  </>;
}

function UsersTab({ filteredUsers, search, setSearch }: { filteredUsers: UserRow[]; search: string; setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  return <section className="nm-settings-section"><div className="nm-section-head-row"><h3>Registered Users</h3><div className="nm-search-wrap"><Search size={15} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="nm-input" /></div></div><div className="nm-table-wrap nm-table-wrap--compact"><table className="nm-table"><thead><tr><th>User ID</th><th>Name</th><th>Email</th><th>Plan</th></tr></thead><tbody>{filteredUsers.map((u) => <tr key={u.id}><td><span className="nm-booking-id">{u.id}</span></td><td>{u.name}</td><td>{u.email}</td><td><span className="nm-pill nm-pill--success">{PLANS[u.plan].title}</span></td></tr>)}</tbody></table></div></section>;
}

// ─── Newsletter Tab ──────────────────────────────────────────────────────────
function NewsletterTab({
  newsletters,
  onAddNewsletter,
  onViewSubscribers,
}: {
  newsletters: NewsletterRow[];
  onAddNewsletter: () => void;
  onViewSubscribers: () => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="nm-settings-section">
      {/* Header row */}
      <div className="nm-section-head-row">
        <div>
          <h3>Newsletter</h3>
          <p className="nm-subtext">Create, publish, and track campaigns</p>
        </div>
        <div className="nm-newsletter-actions">
          <button className="nm-btn nm-btn--ghost nm-btn--subscribers" type="button" onClick={onViewSubscribers}>
            <UserCheck size={16} /> View Subscribers
          </button>
          <button className="nm-btn nm-btn--primary" type="button" onClick={onAddNewsletter}>
            <PencilLine size={16} /> Add Newsletter
          </button>
        </div>
      </div>

      {/* Intro banner */}
      <div className="nm-newsletter-intro">
        <p className="nm-subtext">Newsletter management — {newsletters.length} campaign{newsletters.length !== 1 ? 's' : ''} total</p>
        <p>Add, review, and publish newsletters for each audience segment. Click any row to read the full description.</p>
      </div>

      {/* Table */}
      <div className="nm-table-wrap">
        <table className="nm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Short Description</th>
              <th>Status</th>
              <th>Audience</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {newsletters.map((n) => (
              <React.Fragment key={n.id}>
                <tr
                  className="nm-table-row--clickable"
                  onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}
                >
                  <td><span className="nm-booking-id">{n.id}</span></td>
                  <td style={{ fontWeight: 700 }}>{n.title}</td>
                  <td style={{ color: '#64748b', maxWidth: 240 }}>{n.shortDesc}</td>
                  <td>
                    <span className={`nm-pill ${n.status === 'Published' ? 'nm-pill--success' : n.status === 'Scheduled' ? 'nm-pill--warning' : 'nm-pill--neutral'}`}>
                      {n.status}
                    </span>
                  </td>
                  <td>{n.audience}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ color: '#64748b', fontSize: '13px' }}>{n.updated}</span>
                      <ChevronRight size={14} style={{ color: '#94a3b8', transform: expandedId === n.id ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }} />
                    </div>
                  </td>
                </tr>
                {expandedId === n.id && (
                  <tr className="nm-expand-row">
                    <td colSpan={6}>
                      <div className="nm-expand-body">
                        <p className="nm-expand-label">Full Description</p>
                        <p className="nm-expand-text">{n.description}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Messages Modal ──────────────────────────────────────────────────────────

function MessagesModal({
  messages,
  onClose,
  onUpdate,
}: {
  messages: ContactMessage[];
  onClose: () => void;
  onUpdate: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sent, setSent] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [isReplyComposerOpen, setIsReplyComposerOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const filtered = messages.filter(m =>
    filter === 'all' ? true : filter === 'unread' ? !m.read : m.read
  );

  const selected = messages.find(m => m.id === selectedId) ?? null;
  const isAlreadyReplied = Boolean(selected?.reply || sent);
  const replyButtonLabel = isAlreadyReplied
    ? 'Replied'
    : isReplyComposerOpen
      ? 'Hide reply'
      : 'Reply message';

  const openMessage = (id: string) => {
    setSelectedId(id);
    setReplyText('');
    setSent(null);
    setIsReplyComposerOpen(false);
    setIsSending(false);
    // mark as read
    onUpdate(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const toggleReplyComposer = () => {
    if (!selectedId || isAlreadyReplied || isSending) return;
    setIsReplyComposerOpen((prev) => !prev);
  };

  const sendReply = async () => {
    if (!replyText.trim() || !selectedId || isSending) return;

    const reply = replyText.trim();
    setIsSending(true);

    await new Promise((resolve) => setTimeout(resolve, 650));

    onUpdate(prev => prev.map(m => m.id === selectedId ? { ...m, reply } : m));
    setSent(reply);
    setReplyText('');
    setIsReplyComposerOpen(false);
    setIsSending(false);
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="nm-modal-backdrop" onClick={(e) => { if ((e.target as HTMLElement).classList.contains('nm-modal-backdrop')) onClose(); }}>
      <div className="nm-modal nm-modal--messages">
        {/* Header */}
        <div className="nm-modal-header">
          <div className="nm-modal-header-left">
            <div className="nm-modal-icon"><Inbox size={18} /></div>
            <div>
              <h2 className="nm-modal-title">Messages</h2>
              <p className="nm-modal-subtitle">{messages.length} total · <strong style={{ color: unreadCount > 0 ? '#dc2626' : '#64748b' }}>{unreadCount} unread</strong></p>
            </div>
          </div>
          <button className="nm-modal-close" onClick={onClose} type="button" aria-label="Close"><X size={18} /></button>
        </div>

        <div className="nm-msg-modal-body">
          {/* Left panel — message list */}
          <div className="nm-msg-list-panel">
            <div className="nm-msg-filter-tabs">
              {(['all', 'unread', 'read'] as const).map(f => (
                <button
                  key={f}
                  className={`nm-msg-filter-tab ${filter === f ? 'nm-msg-filter-tab--active' : ''}`}
                  onClick={() => setFilter(f)}
                  type="button"
                >
                  {f === 'all' ? `All (${messages.length})` : f === 'unread' ? `Unread (${messages.filter(m => !m.read).length})` : `Read (${messages.filter(m => m.read).length})`}
                </button>
              ))}
            </div>
            <div className="nm-msg-list">
              {filtered.length === 0 && (
                <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No messages here.</div>
              )}
              {filtered.map(m => (
                <button
                  key={m.id}
                  className={`nm-msg-list-item ${selectedId === m.id ? 'nm-msg-list-item--active' : ''} ${!m.read ? 'nm-msg-list-item--unread' : ''}`}
                  onClick={() => openMessage(m.id)}
                  type="button"
                >
                  <div className="nm-msg-list-avatar">{m.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                  <div className="nm-msg-list-text">
                    <div className="nm-msg-list-top">
                      <span className="nm-msg-list-name">{m.name}</span>
                      <span className="nm-msg-list-time">{m.received}</span>
                    </div>
                    <div className="nm-msg-list-subject">{m.subject}</div>
                    <div className="nm-msg-list-snippet">{m.message.slice(0, 55)}…</div>
                  </div>
                  {!m.read && <span className="nm-unread-dot nm-unread-dot--sm" />}
                </button>
              ))}
            </div>
          </div>

          {/* Right panel — message detail + reply */}
          <div className="nm-msg-detail-panel">
            {!selected ? (
              <div className="nm-msg-empty">
                <MessageCircle size={36} style={{ color: '#cbd5e1', marginBottom: 12 }} />
                <p>Select a message to read and reply</p>
              </div>
            ) : (
              <>
                <div className="nm-msg-detail-header">
                  <div className="nm-msg-detail-avatar">{selected.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                  <div>
                    <div className="nm-msg-detail-name">{selected.name}</div>
                    <div className="nm-msg-detail-email">{selected.email}</div>
                  </div>
                  <div className="nm-msg-detail-actions">
                    {isAlreadyReplied && (
                      <span className="nm-pill nm-pill--success nm-reply-state-pill">
                        <CheckCircle size={12} /> Replied
                      </span>
                    )}
                    <button
                      className={`nm-btn nm-reply-action-btn ${isAlreadyReplied ? 'nm-reply-action-btn--replied' : isReplyComposerOpen ? 'nm-reply-action-btn--open' : ''}`}
                      type="button"
                      onClick={toggleReplyComposer}
                      disabled={isAlreadyReplied || isSending}
                      aria-pressed={isReplyComposerOpen}
                    >
                      <Reply size={14} />
                      <span>{replyButtonLabel}</span>
                    </button>
                  </div>
                </div>

                <div className="nm-msg-detail-subject">{selected.subject}</div>
                <div className="nm-msg-detail-body">{selected.message}</div>

                {/* Previous reply (if any) */}
                {(selected.reply || sent) && (
                  <div className="nm-msg-replied-box">
                    <div className="nm-msg-replied-label"><Reply size={12} /> Your reply</div>
                    <p>{selected.reply || sent}</p>
                  </div>
                )}

                {/* Reply composer */}
                {isReplyComposerOpen && !isAlreadyReplied && (
                  <div className="nm-reply-composer nm-reply-composer--open">
                    <div className="nm-reply-composer-top">
                      <Reply size={14} style={{ color: '#2563eb' }} />
                      <span>Reply to {selected.name}</span>
                    </div>
                    <textarea
                      className="nm-reply-textarea"
                      placeholder={`Write your reply to ${selected.name}…`}
                      rows={4}
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                    />
                    <div className="nm-reply-footer">
                      <span className="nm-reply-to-addr">{selected.email}</span>
                      <button
                        className="nm-btn nm-btn--primary nm-reply-send-btn"
                        type="button"
                        onClick={sendReply}
                        disabled={!replyText.trim() || isSending}
                        aria-busy={isSending}
                      >
                        <Send size={14} />
                        {isSending ? 'Sending…' : 'Send Reply'}
                      </button>
                    </div>
                  </div>
                )}

                {!isReplyComposerOpen && !isAlreadyReplied && (
                  <div className="nm-reply-hint">
                    Click <strong>Reply message</strong> to open the composer and send a response.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanAdminView({ planKey, onBack }: { planKey: PlanKey; onBack: () => void }) {
  const plan = PLANS[planKey];
  const Icon = plan.icon;
  return <div className="nm-account-settings"><div className="nm-account-header"><button onClick={onBack} className="nm-btn nm-btn--ghost" type="button">← Back to Admin</button><h2>{plan.title} — Admin View</h2></div><section className="nm-plan-section nm-plan-section--visible"><div className="nm-plan-hero" style={{ '--plan-accent': plan.accent } as React.CSSProperties}><div className="nm-plan-hero-icon"><Icon size={22} style={{ color: plan.accent }} /></div><div><h2 className="nm-plan-hero-title">{plan.title}</h2><p className="nm-plan-hero-meta"><span style={{ color: plan.accent, fontWeight: 600 }}>{plan.price}</span></p></div></div><div className="nm-plan-body"><div className="nm-features"><h3 className="nm-section-heading">What's included</h3><ul className="nm-feature-list">{plan.features.map((feature) => <li key={feature} className="nm-feature-item"><CheckCircle size={16} style={{ color: '#10B981' }} /><span>{feature}</span></li>)}</ul></div><div className="nm-quick-actions"><h3 className="nm-section-heading">Quick actions</h3><div className="nm-action-list"><button className="nm-action-btn" style={{ '--btn-accent': plan.accent } as React.CSSProperties} type="button"><span className="nm-action-icon"><Laptop size={16} /></span><span className="nm-action-label">Book a service</span><ChevronRight size={14} style={{ color: '#9CA3AF', marginLeft: 'auto' }} /></button><button className="nm-action-btn" style={{ '--btn-accent': plan.accent } as React.CSSProperties} type="button"><span className="nm-action-icon"><Layers size={16} /></span><span className="nm-action-label">View bookings</span><ChevronRight size={14} style={{ color: '#9CA3AF', marginLeft: 'auto' }} /></button></div></div></div></section></div>;
}

function MetricCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return <div className="nm-metric-card"><div className="nm-metric-icon">{icon}</div><div><span>{title}</span><strong>{value}</strong></div></div>;
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = `
:root{--nm-bg:#f8fafc;--nm-surface:#ffffff;--nm-border:#e2e8f0;--nm-text:#0f172a;--nm-muted:#64748b;--nm-shadow:0 10px 30px rgba(15,23,42,0.08)}
*{box-sizing:border-box}body{margin:0;background:var(--nm-bg);color:var(--nm-text);font-family:Inter,Arial,sans-serif}button,input,select,textarea{font:inherit}
.nm-root{display:flex;min-height:100vh;background:linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)}
.nm-sidebar{width:284px;background:linear-gradient(180deg,#0f172a 0%,#111827 100%);color:#fff;flex-direction:column;height:100vh;position:sticky;top:0;flex-shrink:0;box-shadow:4px 0 20px rgba(0,0,0,0.12);display:flex}
.nm-sidebar-brand{padding:1.75rem 1.25rem 1rem;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(255,255,255,0.08)}
.nm-sidebar-brand-name{font-size:15px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin:0}.nm-sidebar-brand-sub{font-size:11.5px;color:#94a3b8;margin:2px 0 0}.nm-sidebar-label{padding:1.25rem 1.25rem 0.5rem;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#94a3b8;font-weight:700;margin:0}
.nm-sidebar-nav{padding:0.5rem 0.75rem;display:flex;flex-direction:column;gap:3px}.nm-nav-item{width:100%;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;background:none;border:none;color:#cbd5e1;cursor:pointer;transition:transform 180ms ease,background-color 180ms ease,color 180ms ease,box-shadow 180ms ease;text-align:left}
.nm-nav-item:hover{background:rgba(255,255,255,0.08);color:#fff;transform:translateX(4px)}.nm-nav-item--active{background:rgba(255,255,255,0.1);color:#fff;box-shadow:0 0 0 3px rgba(255,255,255,0.08)}
.nm-nav-icon{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background-color 180ms ease}.nm-nav-text{min-width:0}.nm-nav-title{display:block;font-size:13.5px;font-weight:700}
.nm-sidebar-footer{padding:1.25rem;border-top:1px solid rgba(255,255,255,0.08);margin-top:auto}.nm-sidebar-footer-row{display:flex;align-items:center;gap:12px}.nm-sidebar-footer-name{font-size:13px;font-weight:700;color:#e2e8f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0}.nm-sidebar-footer-role{font-size:11.5px;color:#94a3b8;margin:2px 0 0}.nm-sidebar-close{display:none;margin-left:auto;width:40px;height:40px;border:1px solid rgba(255,255,255,0.1);border-radius:12px;background:transparent;color:#fff;align-items:center;justify-content:center;cursor:pointer}
.nm-avatar{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,0.1)}.nm-avatar--brand{width:42px;height:42px;background:linear-gradient(135deg,#2563eb,#3b82f6);color:#fff;font-size:15px}.nm-avatar--sm{width:32px;height:32px;font-size:13px}.nm-avatar--user{width:40px;height:40px;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;font-size:14px}.nm-avatar--small{width:34px;height:34px;font-size:12px;box-shadow:none}
.nm-main{flex:1;min-height:100vh;display:flex;flex-direction:column;overflow:hidden}
.nm-header{position:sticky;top:0;z-index:40;background:rgba(255,255,255,0.9);backdrop-filter:blur(16px);border-bottom:1px solid rgba(226,232,240,0.9);padding:0 1.75rem;min-height:72px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.04)}
.nm-header-left{display:flex;align-items:center;gap:14px}.nm-header-title{font-size:17px;font-weight:700;letter-spacing:-0.03em;margin:0}.nm-header-subtitle{font-size:12.5px;color:var(--nm-muted);margin-top:2px}.nm-header-right{display:flex;align-items:center;gap:12px}
.nm-content{flex:1;padding:1.75rem;max-width:1280px;width:100%;margin:0 auto;padding-bottom:140px}
.nm-hero-strip{display:grid;grid-template-columns:1fr;gap:1rem;margin-bottom:1.25rem;padding:1.25rem;background:linear-gradient(135deg,rgba(255,255,255,0.92),rgba(248,250,252,0.88));border:1px solid rgba(226,232,240,0.95);border-radius:24px;box-shadow:var(--nm-shadow)}
.nm-hero-strip-left h2{font-size:24px;line-height:1.08;letter-spacing:-0.04em;margin:8px 0 0}.nm-hero-strip-left p{margin:10px 0 0;color:var(--nm-muted)}
.nm-hero-kicker{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;background:rgba(37,99,235,0.09);color:#1d4ed8;font-size:12px;font-weight:700}.nm-hero-strip-right{display:grid;gap:10px;grid-template-columns:1fr 1fr}.nm-stat-card{padding:14px 16px;border-radius:18px;background:#fff;border:1px solid var(--nm-border);box-shadow:0 4px 12px rgba(15,23,42,.05)}.nm-stat-card span{display:block;font-size:12px;color:var(--nm-muted);margin-bottom:5px}.nm-stat-card strong{display:block;font-size:14px;color:var(--nm-text)}
.nm-metrics-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin:1rem 0 1.5rem}.nm-metric-card{background:#fff;border:1px solid var(--nm-border);border-radius:18px;padding:16px;display:flex;align-items:center;gap:12px;box-shadow:var(--nm-shadow)}.nm-metric-card span{display:block;font-size:12px;color:var(--nm-muted);margin-bottom:4px}.nm-metric-card strong{font-size:20px;letter-spacing:-.03em}.nm-metric-icon{width:40px;height:40px;border-radius:14px;background:#f8fafc;border:1px solid var(--nm-border);display:flex;align-items:center;justify-content:center;color:#2563eb;flex-shrink:0}
.nm-grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem}.nm-settings-section{background:#fff;border:1px solid var(--nm-border);border-radius:24px;padding:2rem;margin-bottom:2rem;box-shadow:var(--nm-shadow)}.nm-settings-section h3{font-size:15px;font-weight:800;color:#334155;margin:0;letter-spacing:0.04em;text-transform:uppercase}.nm-section-head-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:1.25rem;flex-wrap:wrap}.nm-search-wrap{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid #cbd5e1;border-radius:14px;padding:0 12px;min-width:240px;flex:1;max-width:360px}.nm-search-wrap--modal{max-width:100%;margin-bottom:1rem;flex:none;width:100%}.nm-input{width:100%;border:none;background:transparent;color:#0f172a;border-radius:14px;padding:12px 0;font:inherit;outline:none}.nm-btn{border:none;border-radius:14px;padding:12px 14px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:all .18s ease}.nm-btn--ghost{background:#fff;color:#0f172a;border:1px solid #cbd5e1}.nm-btn--ghost:hover{background:#f8fafc;border-color:#94a3b8}.nm-btn--primary{background:#2563eb;color:#fff;box-shadow:0 10px 24px rgba(37,99,235,.2)}.nm-btn--primary:hover{background:#1d4ed8;transform:translateY(-1px)}.nm-btn--subscribers{color:#0f766e;border-color:#99f6e4;background:#f0fdfa}.nm-btn--subscribers:hover{background:#ccfbf1;border-color:#5eead4}
.nm-newsletter-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.nm-table-wrap{overflow:auto;border-top:1px solid var(--nm-border)}.nm-table-wrap--compact{border-top:none}.nm-table{width:100%;border-collapse:separate;border-spacing:0}.nm-table thead th{position:sticky;top:0;background:linear-gradient(180deg,#fff,#f8fafc);color:#334155;font-size:11.5px;text-transform:uppercase;letter-spacing:0.08em;text-align:left;padding:12px 16px;border-bottom:1px solid var(--nm-border)}.nm-table tbody td{padding:14px 16px;border-bottom:1px solid #eef2f7;font-size:13.5px;color:#0f172a;white-space:nowrap}.nm-table-row--clickable{cursor:pointer;transition:background .15s ease}.nm-table-row--clickable:hover{background:#f8fafc}.nm-booking-id{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:#1d4ed8;font-weight:700}.nm-pill{display:inline-flex;align-items:center;justify-content:center;padding:6px 10px;font-size:10.5px;font-weight:800;border-radius:9999px}.nm-pill--warning{background:#fefce8;color:#854d0e}.nm-pill--success{background:#ecfdf5;color:#065f46}.nm-pill--neutral{background:#f8fafc;color:#334155}.nm-pill--blue{background:#eff6ff;color:#1e40af}.nm-pill--purple{background:#f5f3ff;color:#5b21b6}.nm-pill--amber{background:#fffbeb;color:#92400e}
.nm-expand-row td{padding:0!important}.nm-expand-body{padding:16px 20px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0}.nm-expand-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin:0 0 8px}.nm-expand-text{font-size:14px;color:#334155;line-height:1.65;margin:0;white-space:normal}
.nm-plan-summary-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:1rem}.nm-summary-card{border:1px solid var(--nm-border);border-radius:18px;padding:18px;background:#fff;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease;text-align:left}.nm-summary-card:hover{transform:translateY(-2px);box-shadow:0 14px 26px rgba(15,23,42,.08)}.nm-summary-top{display:flex;align-items:center;gap:12px;margin-bottom:12px}.nm-summary-top strong{display:block;font-size:14px}.nm-summary-top span{display:block;color:var(--nm-muted);font-size:12px;margin-top:3px}.nm-summary-card p{margin:0;color:#334155;font-size:13px}.nm-summary-icon{width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0}.nm-news-mini-list{display:flex;flex-direction:column;gap:10px;margin-top:1rem}.nm-news-mini-item{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border:1px solid var(--nm-border);border-radius:16px;background:#fff}.nm-news-mini-item strong{display:block;font-size:13px}.nm-news-mini-item span{display:block;font-size:12px;color:var(--nm-muted);margin-top:3px}.nm-news-mini-item em{font-style:normal;font-size:12px;font-weight:700;color:#1d4ed8}.nm-subtext{margin:0;color:var(--nm-muted);font-size:13px}.nm-newsletter-intro{margin-bottom:1rem;padding:14px 16px;border-radius:18px;background:#f8fafc;border:1px solid var(--nm-border)}
.nm-account-settings{padding:0}.nm-account-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 18px 0}.nm-account-header h2{margin:0;font-size:17px;font-weight:800;letter-spacing:-0.02em}.nm-plan-section{background:#fff;border:1px solid var(--nm-border);border-radius:24px;padding:0;margin:18px;overflow:hidden}.nm-plan-section--visible{box-shadow:0 10px 30px rgba(15,23,42,.08)}.nm-plan-hero{--plan-accent:#2563EB;background:linear-gradient(135deg,#ffffff,#f8fafc);border-bottom:1px solid var(--nm-border);padding:1.5rem;display:flex;align-items:center;gap:16px}.nm-plan-hero-icon{width:48px;height:48px;border-radius:14px;background:color-mix(in srgb,var(--plan-accent) 10%,white);display:flex;align-items:center;justify-content:center;flex-shrink:0}.nm-plan-hero-title{font-size:22px;font-weight:800;letter-spacing:-0.04em;margin:0}.nm-plan-hero-meta{font-size:13.5px;color:var(--nm-muted);margin-top:4px;display:flex;align-items:center;gap:8px}.nm-plan-body{padding:1.5rem;display:grid;gap:1.5rem}.nm-section-heading{font-size:12.5px;font-weight:800;color:#334155;margin:0 0 1rem;text-transform:uppercase;letter-spacing:0.08em}.nm-feature-list{list-style:none;display:flex;flex-direction:column;gap:14px;padding:0;margin:0}.nm-feature-item{display:flex;align-items:flex-start;gap:12px;font-size:14.5px;color:#334155}.nm-quick-actions{display:flex;flex-direction:column;gap:6px}.nm-action-list{display:flex;flex-direction:column;gap:10px}.nm-action-btn{display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:16px;background:#fff;border:1px solid var(--nm-border);cursor:pointer;transition:transform 180ms ease,box-shadow 180ms ease,border-color 180ms ease;color:#111827;font-family:inherit;box-shadow:0 2px 6px rgba(0,0,0,.04);text-align:left}.nm-action-btn:hover{transform:translateY(-1px);box-shadow:0 10px 18px rgba(15,23,42,.07)}.nm-action-icon{width:36px;height:36px;border-radius:10px;background:#f8fafc;border:1px solid var(--nm-border);display:flex;align-items:center;justify-content:center;color:var(--btn-accent,#2563eb);flex-shrink:0}.nm-action-label{font-size:14.5px;font-weight:700}
.nm-menu-btn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border:1px solid #cbd5e1;border-radius:12px;background:#fff;cursor:pointer}.nm-sidebar-close{display:none;margin-left:auto;width:40px;height:40px;border:1px solid rgba(255,255,255,0.1);border-radius:12px;background:transparent;color:#fff;align-items:center;justify-content:center;cursor:pointer}.nm-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:45}

/* ── Modal ── */
.nm-modal-backdrop{position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:60;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(4px);animation:nm-fade-in .18s ease}
@keyframes nm-fade-in{from{opacity:0}to{opacity:1}}
.nm-modal{background:#fff;border-radius:24px;width:100%;max-width:560px;box-shadow:0 24px 60px rgba(15,23,42,.18),0 0 0 1px rgba(15,23,42,.06);display:flex;flex-direction:column;max-height:90vh;animation:nm-slide-up .22s ease}
.nm-modal--wide{max-width:720px}
@keyframes nm-slide-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.nm-modal-header{padding:1.5rem 1.5rem 1.25rem;border-bottom:1px solid var(--nm-border);display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-shrink:0}
.nm-modal-header-left{display:flex;align-items:center;gap:14px}
.nm-modal-icon{width:44px;height:44px;border-radius:14px;background:#eff6ff;border:1px solid #bfdbfe;display:flex;align-items:center;justify-content:center;color:#2563eb;flex-shrink:0}
.nm-modal-icon--teal{background:#f0fdfa;border-color:#99f6e4;color:#0f766e}
.nm-modal-title{font-size:16px;font-weight:800;margin:0;letter-spacing:-0.02em;color:#0f172a}
.nm-modal-subtitle{font-size:12.5px;color:#64748b;margin:3px 0 0}
.nm-modal-close{width:36px;height:36px;border-radius:10px;border:1px solid var(--nm-border);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;flex-shrink:0;transition:all .15s ease}
.nm-modal-close:hover{background:#f8fafc;color:#0f172a}
.nm-modal-body{padding:1.5rem;overflow-y:auto;flex:1}
.nm-modal-footer{padding:1.25rem 1.5rem;border-top:1px solid var(--nm-border);display:flex;align-items:center;justify-content:flex-end;gap:10px;flex-shrink:0}

/* ── Form fields ── */
.nm-field{display:flex;flex-direction:column;gap:6px;margin-bottom:1.25rem}
.nm-field:last-child{margin-bottom:0}
.nm-field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.nm-field--half{}
.nm-label{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:#475569}
.nm-field-input{padding:12px 14px;border:1.5px solid #e2e8f0;border-radius:14px;color:#0f172a;background:#fafafa;font-size:14px;outline:none;transition:border-color .15s ease,box-shadow .15s ease;width:100%}
.nm-field-input:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.1);background:#fff}
.nm-field-input--error{border-color:#ef4444}
.nm-field-textarea{padding:12px 14px;border:1.5px solid #e2e8f0;border-radius:14px;color:#0f172a;background:#fafafa;font-size:14px;outline:none;transition:border-color .15s ease,box-shadow .15s ease;width:100%;resize:vertical;line-height:1.6}
.nm-field-textarea:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.1);background:#fff}
.nm-field-select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px;cursor:pointer}
.nm-field-error{font-size:12px;color:#ef4444;font-weight:600}
.nm-field-hint{font-size:11.5px;color:#94a3b8;text-align:right;margin-top:-2px}

/* ── Subscriber stats pills ── */
.nm-sub-stats{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:1rem}
.nm-sub-stat{display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border-radius:999px;background:#f8fafc;border:1px solid var(--nm-border);font-size:12.5px;color:#334155}
.nm-sub-stat-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.nm-sub-stat strong{font-size:13.5px;color:#0f172a}

/* ── Messages card (overview) ── */
.nm-messages-card{border-color:#e0e7ff}
.nm-messages-title-wrap{display:flex;align-items:center;gap:12px}
.nm-messages-icon-wrap{width:40px;height:40px;border-radius:13px;background:#eff6ff;border:1px solid #bfdbfe;display:flex;align-items:center;justify-content:center;color:#2563eb;flex-shrink:0}
.nm-btn--messages{color:#7c3aed;border-color:#ddd6fe;background:#f5f3ff}.nm-btn--messages:hover{background:#ede9fe;border-color:#c4b5fd}
.nm-msg-stats-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:1.25rem}
.nm-msg-stat{background:#f8fafc;border:1px solid var(--nm-border);border-radius:18px;padding:16px 18px;display:flex;align-items:center;gap:14px;position:relative}
.nm-msg-stat--unread{border-color:#bfdbfe;background:#eff6ff}
.nm-msg-stat-icon{width:40px;height:40px;border-radius:14px;background:#dbeafe;display:flex;align-items:center;justify-content:center;color:#2563eb;flex-shrink:0}
.nm-msg-stat-icon--grey{background:#f1f5f9;color:#64748b}
.nm-msg-stat-icon--green{background:#dcfce7;color:#16a34a}
.nm-msg-stat span{display:block;font-size:12px;color:#64748b;margin-bottom:4px}
.nm-msg-stat strong{font-size:22px;font-weight:800;letter-spacing:-.04em;color:#0f172a}
.nm-msg-badge{position:absolute;top:12px;right:14px;background:#dc2626;color:#fff;font-size:10px;font-weight:800;padding:3px 8px;border-radius:999px}
.nm-msg-preview-list{display:flex;flex-direction:column;gap:8px}
.nm-msg-preview-item{display:flex;align-items:flex-start;gap:12px;padding:14px 16px;border-radius:16px;border:1px solid var(--nm-border);background:#fff;cursor:default;position:relative;transition:box-shadow .15s ease}
.nm-msg-preview-item--unread{border-color:#bfdbfe;background:#f0f7ff}
.nm-msg-avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.nm-msg-preview-body{flex:1;min-width:0}
.nm-msg-preview-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:3px}
.nm-msg-preview-top strong{font-size:13.5px;color:#0f172a}
.nm-msg-preview-time{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;color:#94a3b8}
.nm-msg-preview-subject{font-size:13px;font-weight:700;color:#334155;margin-bottom:3px}
.nm-msg-preview-snippet{font-size:12.5px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nm-unread-dot{width:9px;height:9px;border-radius:50%;background:#2563eb;flex-shrink:0;margin-top:6px}
.nm-unread-dot--sm{width:8px;height:8px;margin-top:4px;flex-shrink:0}

/* ── Messages Modal ── */
.nm-modal--messages{max-width:900px;height:82vh;max-height:82vh}
.nm-msg-modal-body{display:grid;grid-template-columns:300px 1fr;flex:1;overflow:hidden;min-height:0}
.nm-msg-list-panel{border-right:1px solid var(--nm-border);display:flex;flex-direction:column;overflow:hidden}
.nm-msg-filter-tabs{display:flex;gap:0;border-bottom:1px solid var(--nm-border);flex-shrink:0}
.nm-msg-filter-tab{flex:1;padding:11px 8px;border:none;background:none;font-size:12px;font-weight:700;color:#64748b;cursor:pointer;transition:all .15s;border-bottom:2px solid transparent;font-family:inherit}
.nm-msg-filter-tab:hover{color:#0f172a;background:#f8fafc}
.nm-msg-filter-tab--active{color:#2563eb;border-bottom-color:#2563eb;background:#fff}
.nm-msg-list{overflow-y:auto;flex:1}
.nm-msg-list-item{width:100%;display:flex;align-items:flex-start;gap:10px;padding:13px 14px;background:none;border:none;border-bottom:1px solid #f1f5f9;cursor:pointer;text-align:left;transition:background .12s;position:relative}
.nm-msg-list-item:hover{background:#f8fafc}
.nm-msg-list-item--active{background:#eff6ff}
.nm-msg-list-item--unread .nm-msg-list-name{font-weight:800;color:#0f172a}
.nm-msg-list-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.nm-msg-list-text{flex:1;min-width:0}
.nm-msg-list-top{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:2px}
.nm-msg-list-name{font-size:13px;color:#334155;font-weight:600}
.nm-msg-list-time{font-size:11px;color:#94a3b8;white-space:nowrap}
.nm-msg-list-subject{font-size:12.5px;font-weight:700;color:#0f172a;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nm-msg-list-snippet{font-size:12px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nm-msg-detail-panel{display:flex;flex-direction:column;overflow-y:auto;padding:1.5rem;gap:14px}
.nm-msg-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#94a3b8;font-size:14px;gap:0}
.nm-msg-detail-header{display:flex;align-items:center;gap:12px;padding-bottom:14px;border-bottom:1px solid var(--nm-border)}
.nm-msg-detail-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;font-size:15px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.nm-msg-detail-name{font-size:15px;font-weight:800;color:#0f172a}
.nm-msg-detail-email{font-size:12.5px;color:#64748b;margin-top:2px}
.nm-msg-detail-time{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:#94a3b8;margin-left:auto;white-space:nowrap}.nm-msg-detail-actions{display:flex;align-items:center;gap:10px;margin-left:auto;flex-wrap:wrap;justify-content:flex-end}.nm-reply-action-btn{background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;font-weight:800;min-width:150px}.nm-reply-action-btn:hover:not(:disabled){background:#dbeafe;border-color:#93c5fd;transform:translateY(-1px)}.nm-reply-action-btn--open{background:#1d4ed8;color:#fff;border-color:#1d4ed8;box-shadow:0 10px 20px rgba(29,78,216,.18)}.nm-reply-action-btn--open:hover:not(:disabled){background:#1e40af;border-color:#1e40af}.nm-reply-action-btn--replied{background:#f1f5f9;color:#64748b;border-color:#e2e8f0;cursor:not-allowed}.nm-reply-action-btn:disabled{opacity:.72;cursor:not-allowed;transform:none}.nm-reply-state-pill{white-space:nowrap}.nm-reply-composer--open{animation:nm-fade-in .18s ease}.nm-reply-hint{padding:14px 16px;border:1px dashed #bfdbfe;border-radius:16px;background:#f8fbff;color:#64748b;font-size:13px;line-height:1.5}@keyframes nm-fade-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.nm-msg-detail-subject{font-size:16px;font-weight:800;color:#0f172a;letter-spacing:-.02em}
.nm-msg-detail-body{font-size:14.5px;color:#334155;line-height:1.7;padding:16px;background:#f8fafc;border-radius:14px;border:1px solid var(--nm-border)}
.nm-msg-replied-box{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:14px 16px}
.nm-msg-replied-label{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:#16a34a;margin-bottom:8px}
.nm-msg-replied-box p{margin:0;font-size:14px;color:#166534;line-height:1.65}
.nm-reply-composer{border:1.5px solid #bfdbfe;border-radius:18px;overflow:hidden;background:#fff;margin-top:4px}
.nm-reply-composer-top{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid #e0e7ff;font-size:13px;font-weight:700;color:#1e40af;background:#eff6ff}
.nm-reply-textarea{width:100%;padding:14px;border:none;outline:none;font:inherit;font-size:14px;color:#0f172a;resize:none;line-height:1.6;background:#fff}
.nm-reply-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:10px 14px;border-top:1px solid #e0e7ff;background:#f8fafc}
.nm-reply-to-addr{font-size:12px;color:#64748b;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}
.nm-reply-send-btn{margin-left:auto;flex-shrink:0;min-width:132px}

@media (max-width:767px){
  .nm-msg-stats-row{grid-template-columns:1fr}
  .nm-modal--messages{max-width:100%;height:92vh;max-height:92vh}
  .nm-msg-modal-body{grid-template-columns:1fr;grid-template-rows:auto 1fr}
  .nm-msg-list-panel{max-height:220px;border-right:none;border-bottom:1px solid var(--nm-border)}
  .nm-reply-footer{flex-direction:column;align-items:stretch}
  .nm-reply-to-addr{white-space:normal}
  .nm-reply-send-btn{width:100%;margin-left:0}
}

@media (min-width:768px){.nm-menu-btn{display:none}}
@media (max-width:767px){.nm-root{display:block}.nm-sidebar{position:fixed;left:0;top:0;bottom:0;z-index:50;transform:translateX(-100%);transition:transform .28s ease;width:84vw;max-width:290px}.nm-sidebar--open{transform:translateX(0)}.nm-sidebar-close{display:inline-flex}.nm-content{padding:1rem;padding-bottom:120px}.nm-header{padding:0 1rem}.nm-header-title{font-size:18px}.nm-search-wrap{width:100%;max-width:none}.nm-grid-2{grid-template-columns:1fr}.nm-metrics-row{grid-template-columns:1fr 1fr}.nm-hero-strip{grid-template-columns:1fr}.nm-hero-strip-right{grid-template-columns:1fr 1fr}.nm-field-row{grid-template-columns:1fr}.nm-newsletter-actions{width:100%;justify-content:flex-end}}
`;
