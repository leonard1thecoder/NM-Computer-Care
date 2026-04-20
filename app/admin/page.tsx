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
type NewsletterRow = { id: string; title: string; status: 'Published' | 'Draft' | 'Scheduled'; audience: string; updated: string };

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

const NEWSLETTERS: NewsletterRow[] = [
  { id: 'N-001', title: 'Winter Service Promo', status: 'Published', audience: 'All Users', updated: '2 days ago' },
  { id: 'N-002', title: 'SSD Upgrade Campaign', status: 'Draft', audience: 'Performance Care', updated: '6 hours ago' },
  { id: 'N-003', title: 'Business Support Tips', status: 'Scheduled', audience: 'Business Care', updated: 'Tomorrow' },
  { id: 'N-004', title: 'Holiday Maintenance Reminder', status: 'Published', audience: 'Basic Care', updated: '1 week ago' },
];

export default function AdminPage(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>('overview');
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null);
  const [search, setSearch] = useState('');

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

  return (
    <div className="nm-root">
      <style>{styles}</style>
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
            <OverviewTab onOpenPlan={openPlan} />
          ) : tab === 'users' ? (
            <UsersTab filteredUsers={filteredUsers} search={search} setSearch={setSearch} />
          ) : (
            <NewsletterTab />
          )}
        </main>
      </main>
    </div>
  );
}

function SidebarButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return <button className={`nm-nav-item ${active ? 'nm-nav-item--active' : ''}`} onClick={onClick}><div className="nm-nav-icon">{icon}</div><div className="nm-nav-text"><span className="nm-nav-title">{label}</span></div><ChevronRight size={14} style={{ color: active ? '#fff' : '#94a3b8', marginLeft: 'auto' }} /></button>;
}

function OverviewTab({ onOpenPlan }: { onOpenPlan: (plan: PlanKey) => void }) {
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

    <section className="nm-settings-section"><div className="nm-section-head-row"><h3>Newsletter Activity</h3><span className="nm-subtext">Recent campaigns</span></div><div className="nm-news-mini-list">{NEWSLETTERS.slice(0, 3).map((item) => <div className="nm-news-mini-item" key={item.id}><div><strong>{item.title}</strong><span>{item.audience}</span></div><em>{item.status}</em></div>)}</div></section>
  </>;
}

function UsersTab({ filteredUsers, search, setSearch }: { filteredUsers: UserRow[]; search: string; setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  return <section className="nm-settings-section"><div className="nm-section-head-row"><h3>Registered Users</h3><div className="nm-search-wrap"><Search size={15} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="nm-input" /></div></div><div className="nm-table-wrap nm-table-wrap--compact"><table className="nm-table"><thead><tr><th>User ID</th><th>Name</th><th>Email</th><th>Plan</th></tr></thead><tbody>{filteredUsers.map((u) => <tr key={u.id}><td><span className="nm-booking-id">{u.id}</span></td><td>{u.name}</td><td>{u.email}</td><td><span className="nm-pill nm-pill--success">{PLANS[u.plan].title}</span></td></tr>)}</tbody></table></div></section>;
}

function NewsletterTab() {
  return <section className="nm-settings-section"><div className="nm-section-head-row"><div><h3>Newsletter</h3><p className="nm-subtext">Create, publish, and track campaigns</p></div><button className="nm-btn nm-btn--primary" type="button"><PencilLine size={16} /> Add Newsletter</button></div><div className="nm-newsletter-intro"><p className="nm-subtext">Newsletter management</p><p>Use this section to add, review, and publish newsletters for each audience segment.</p></div><div className="nm-table-wrap"><table className="nm-table"><thead><tr><th>ID</th><th>Title</th><th>Status</th><th>Audience</th><th>Updated</th></tr></thead><tbody>{NEWSLETTERS.map((n) => <tr key={n.id}><td><span className="nm-booking-id">{n.id}</span></td><td>{n.title}</td><td><span className={`nm-pill ${n.status === 'Published' ? 'nm-pill--success' : n.status === 'Scheduled' ? 'nm-pill--warning' : 'nm-pill--neutral'}`}>{n.status}</span></td><td>{n.audience}</td><td>{n.updated}</td></tr>)}</tbody></table></div></section>;
}

function PlanAdminView({ planKey, onBack }: { planKey: PlanKey; onBack: () => void }) {
  const plan = PLANS[planKey];
  const Icon = plan.icon;
  return <div className="nm-account-settings"><div className="nm-account-header"><button onClick={onBack} className="nm-btn nm-btn--ghost" type="button">← Back to Admin</button><h2>{plan.title} — Admin View</h2></div><section className="nm-plan-section nm-plan-section--visible"><div className="nm-plan-hero" style={{ '--plan-accent': plan.accent } as React.CSSProperties}><div className="nm-plan-hero-icon"><Icon size={22} style={{ color: plan.accent }} /></div><div><h2 className="nm-plan-hero-title">{plan.title}</h2><p className="nm-plan-hero-meta"><span style={{ color: plan.accent, fontWeight: 600 }}>{plan.price}</span></p></div></div><div className="nm-plan-body"><div className="nm-features"><h3 className="nm-section-heading">What’s included</h3><ul className="nm-feature-list">{plan.features.map((feature) => <li key={feature} className="nm-feature-item"><CheckCircle size={16} style={{ color: '#10B981' }} /><span>{feature}</span></li>)}</ul></div><div className="nm-quick-actions"><h3 className="nm-section-heading">Quick actions</h3><div className="nm-action-list"><button className="nm-action-btn" style={{ '--btn-accent': plan.accent } as React.CSSProperties} type="button"><span className="nm-action-icon"><Laptop size={16} /></span><span className="nm-action-label">Book a service</span><ChevronRight size={14} style={{ color: '#9CA3AF', marginLeft: 'auto' }} /></button><button className="nm-action-btn" style={{ '--btn-accent': plan.accent } as React.CSSProperties} type="button"><span className="nm-action-icon"><Layers size={16} /></span><span className="nm-action-label">View bookings</span><ChevronRight size={14} style={{ color: '#9CA3AF', marginLeft: 'auto' }} /></button></div></div></div></section></div>;
}

function MetricCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return <div className="nm-metric-card"><div className="nm-metric-icon">{icon}</div><div><span>{title}</span><strong>{value}</strong></div></div>;
}

const styles = `
:root{--nm-bg:#f8fafc;--nm-surface:#ffffff;--nm-border:#e2e8f0;--nm-text:#0f172a;--nm-muted:#64748b;--nm-shadow:0 10px 30px rgba(15,23,42,0.08)}
*{box-sizing:border-box}body{margin:0;background:var(--nm-bg);color:var(--nm-text);font-family:Inter,Arial,sans-serif}button,input{font:inherit}
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
.nm-grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem}.nm-settings-section{background:#fff;border:1px solid var(--nm-border);border-radius:24px;padding:2rem;margin-bottom:2rem;box-shadow:var(--nm-shadow)}.nm-settings-section h3{font-size:15px;font-weight:800;color:#334155;margin:0;letter-spacing:0.04em;text-transform:uppercase}.nm-section-head-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:1.25rem;flex-wrap:wrap}.nm-search-wrap{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid #cbd5e1;border-radius:14px;padding:0 12px;min-width:240px;flex:1;max-width:360px}.nm-input{width:100%;border:none;background:transparent;color:#0f172a;border-radius:14px;padding:12px 0;font:inherit;outline:none}.nm-btn{border:none;border-radius:14px;padding:12px 14px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px}.nm-btn--ghost{background:#fff;color:#0f172a;border:1px solid #cbd5e1}.nm-btn--primary{background:#2563eb;color:#fff;box-shadow:0 10px 24px rgba(37,99,235,.2)}
.nm-table-wrap{overflow:auto;border-top:1px solid var(--nm-border)}.nm-table-wrap--compact{border-top:none}.nm-table{width:100%;border-collapse:separate;border-spacing:0}.nm-table thead th{position:sticky;top:0;background:linear-gradient(180deg,#fff,#f8fafc);color:#334155;font-size:11.5px;text-transform:uppercase;letter-spacing:0.08em;text-align:left;padding:12px 16px;border-bottom:1px solid var(--nm-border)}.nm-table tbody td{padding:14px 16px;border-bottom:1px solid #eef2f7;font-size:13.5px;color:#0f172a;white-space:nowrap}.nm-booking-id{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:#1d4ed8;font-weight:700}.nm-pill{display:inline-flex;align-items:center;justify-content:center;padding:6px 10px;font-size:10.5px;font-weight:800;border-radius:9999px}.nm-pill--warning{background:#fefce8;color:#854d0e}.nm-pill--success{background:#ecfdf5;color:#065f46}.nm-pill--neutral{background:#f8fafc;color:#334155}
.nm-plan-summary-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:1rem}.nm-summary-card{border:1px solid var(--nm-border);border-radius:18px;padding:18px;background:#fff;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease;text-align:left}.nm-summary-card:hover{transform:translateY(-2px);box-shadow:0 14px 26px rgba(15,23,42,.08)}.nm-summary-top{display:flex;align-items:center;gap:12px;margin-bottom:12px}.nm-summary-top strong{display:block;font-size:14px}.nm-summary-top span{display:block;color:var(--nm-muted);font-size:12px;margin-top:3px}.nm-summary-card p{margin:0;color:#334155;font-size:13px}.nm-summary-icon{width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0}.nm-news-mini-list{display:flex;flex-direction:column;gap:10px;margin-top:1rem}.nm-news-mini-item{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border:1px solid var(--nm-border);border-radius:16px;background:#fff}.nm-news-mini-item strong{display:block;font-size:13px}.nm-news-mini-item span{display:block;font-size:12px;color:var(--nm-muted);margin-top:3px}.nm-news-mini-item em{font-style:normal;font-size:12px;font-weight:700;color:#1d4ed8}.nm-subtext{margin:0;color:var(--nm-muted);font-size:13px}.nm-newsletter-intro{margin-bottom:1rem;padding:14px 16px;border-radius:18px;background:#f8fafc;border:1px solid var(--nm-border)}
.nm-account-settings{padding:0}.nm-account-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 18px 0}.nm-account-header h2{margin:0;font-size:17px;font-weight:800;letter-spacing:-0.02em}.nm-plan-section{background:#fff;border:1px solid var(--nm-border);border-radius:24px;padding:0;margin:18px;overflow:hidden}.nm-plan-section--visible{box-shadow:0 10px 30px rgba(15,23,42,.08)}.nm-plan-hero{--plan-accent:#2563EB;background:linear-gradient(135deg,#ffffff,#f8fafc);border-bottom:1px solid var(--nm-border);padding:1.5rem;display:flex;align-items:center;gap:16px}.nm-plan-hero-icon{width:48px;height:48px;border-radius:14px;background:color-mix(in srgb,var(--plan-accent) 10%,white);display:flex;align-items:center;justify-content:center;flex-shrink:0}.nm-plan-hero-title{font-size:22px;font-weight:800;letter-spacing:-0.04em;margin:0}.nm-plan-hero-meta{font-size:13.5px;color:var(--nm-muted);margin-top:4px;display:flex;align-items:center;gap:8px}.nm-plan-body{padding:1.5rem;display:grid;gap:1.5rem}.nm-section-heading{font-size:12.5px;font-weight:800;color:#334155;margin:0 0 1rem;text-transform:uppercase;letter-spacing:0.08em}.nm-feature-list{list-style:none;display:flex;flex-direction:column;gap:14px;padding:0;margin:0}.nm-feature-item{display:flex;align-items:flex-start;gap:12px;font-size:14.5px;color:#334155}.nm-quick-actions{display:flex;flex-direction:column;gap:6px}.nm-action-list{display:flex;flex-direction:column;gap:10px}.nm-action-btn{display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:16px;background:#fff;border:1px solid var(--nm-border);cursor:pointer;transition:transform 180ms ease,box-shadow 180ms ease,border-color 180ms ease;color:#111827;font-family:inherit;box-shadow:0 2px 6px rgba(0,0,0,.04);text-align:left}.nm-action-btn:hover{transform:translateY(-1px);box-shadow:0 10px 18px rgba(15,23,42,.07)}.nm-action-icon{width:36px;height:36px;border-radius:10px;background:#f8fafc;border:1px solid var(--nm-border);display:flex;align-items:center;justify-content:center;color:var(--btn-accent,#2563eb);flex-shrink:0}.nm-action-label{font-size:14.5px;font-weight:700}
.nm-menu-btn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border:1px solid #cbd5e1;border-radius:12px;background:#fff;cursor:pointer}.nm-sidebar-close{display:none;margin-left:auto;width:40px;height:40px;border:1px solid rgba(255,255,255,0.1);border-radius:12px;background:transparent;color:#fff;align-items:center;justify-content:center;cursor:pointer}.nm-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:45}
@media (min-width:768px){.nm-menu-btn{display:none}}
@media (max-width:767px){.nm-root{display:block}.nm-sidebar{position:fixed;left:0;top:0;bottom:0;z-index:50;transform:translateX(-100%);transition:transform .28s ease;width:84vw;max-width:290px}.nm-sidebar--open{transform:translateX(0)}.nm-sidebar-close{display:inline-flex}.nm-content{padding:1rem;padding-bottom:120px}.nm-header{padding:0 1rem}.nm-header-title{font-size:18px}.nm-search-wrap{width:100%;max-width:none}.nm-grid-2{grid-template-columns:1fr}.nm-metrics-row{grid-template-columns:1fr 1fr}.nm-hero-strip{grid-template-columns:1fr}.nm-hero-strip-right{grid-template-columns:1fr 1fr}}
`;
