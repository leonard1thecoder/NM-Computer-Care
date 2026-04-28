// app/dashboard/account-settings/page.tsx
'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

/**
 * Account Settings page styled to match the "Book service" / booking UI style.
 * - Inputs use plain black text and black borders
 * - Hover on inputs shows orange border
 * - Validation uses red/green borders
 * - Form panels use sky-blue background (like Basic/Performance booking)
 * - Buttons and spacing follow the booking UI feel
 *
 * Drop this file into your Next.js app at: app/dashboard/account-settings/page.tsx
 * Replace API endpoints with your real endpoints as needed.
 */

export default function AccountSettingsPage() {
  /* --- Email state --- */
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  /* --- Password state --- */
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  /* --- Address state --- */
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postal, setPostal] = useState('');
  const [addressError, setAddressError] = useState<string | null>(null);
  const [addressSuccess, setAddressSuccess] = useState<string | null>(null);
  const [addressSubmitting, setAddressSubmitting] = useState(false);

  /* --- Helpers & validation --- */
  const emailIsValid = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  const validateEmailForm = () => {
    if (!email.trim()) return 'Email is required.';
    if (!emailIsValid(email)) return 'Enter a valid email address.';
    if (email !== emailConfirm) return 'Email and confirmation do not match.';
    return null;
  };

  const validatePasswordForm = () => {
    if (!currentPassword) return 'Current password is required.';
    if (!newPassword) return 'New password is required.';
    if (newPassword.length < 8) return 'New password must be at least 8 characters.';
    if (newPassword !== confirmPassword) return 'New password and confirmation do not match.';
    if (newPassword === currentPassword) return 'New password must be different from current password.';
    return null;
  };

  const validateAddressForm = () => {
    if (!street.trim()) return 'Street address is required.';
    if (!city.trim()) return 'City is required.';
    if (!province.trim()) return 'Province / State is required.';
    if (!postal.trim()) return 'Postal code is required.';
    return null;
  };

  /* --- Submit handlers (mocked) --- */
  const submitEmail = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setEmailError(null);
    setEmailSuccess(null);

    const err = validateEmailForm();
    if (err) {
      setEmailError(err);
      return;
    }

    setEmailSubmitting(true);
    try {
      await fetch('/api/account/update-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setEmailSuccess('Email updated. A confirmation link has been sent to the new address.');
      setEmail('');
      setEmailConfirm('');
    } catch {
      setEmailError('Failed to update email. Try again later.');
    } finally {
      setEmailSubmitting(false);
    }
  };

  const submitPassword = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    const err = validatePasswordForm();
    if (err) {
      setPasswordError(err);
      return;
    }

    setPasswordSubmitting(true);
    try {
      await fetch('/api/account/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setPasswordSuccess('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setPasswordError('Failed to change password. Check your current password and try again.');
    } finally {
      setPasswordSubmitting(false);
    }
  };

  const submitAddress = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setAddressError(null);
    setAddressSuccess(null);

    const err = validateAddressForm();
    if (err) {
      setAddressError(err);
      return;
    }

    setAddressSubmitting(true);
    try {
      await fetch('/api/account/update-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ street, city, province, postal }),
      });
      setAddressSuccess('Physical address updated.');
    } catch {
      setAddressError('Failed to update address. Try again later.');
    } finally {
      setAddressSubmitting(false);
    }
  };

  return (
    <div className="nm-root">
      <style>{bookingStyleOverrides}</style>

      <div className="nm-page-shell">
        <header className="nm-page-header">
          <div>
            <h1 className="nm-title">Account settings</h1>
            <p className="nm-sub">Styled to match the Book Service / Performance UI — inputs, hover, validation and panels.</p>
          </div>
        </header>

        <main className="nm-grid">
          {/* Email card (sky-blue panel like booking) */}
          <section className="nm-panel nm-panel--sky">
            <div className="nm-panel-head">
              <h2>Change email address</h2>
              <p className="nm-muted">Update the email used for notifications and sign-in.</p>
            </div>

            <form onSubmit={submitEmail} className="nm-form">
              {emailError && <div className="nm-alert nm-alert--error">{emailError}</div>}
              {emailSuccess && <div className="nm-alert nm-alert--success">{emailSuccess}</div>}

              <label className="nm-label">
                New email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass(email, email ? emailIsValid(email) : null)}
                  placeholder="you@example.com"
                  onBlur={() => {
                    if (email && !emailIsValid(email)) setEmailError('Enter a valid email address.');
                    else setEmailError(null);
                  }}
                />
              </label>

              <label className="nm-label">
                Confirm new email
                <input
                  type="email"
                  value={emailConfirm}
                  onChange={(e) => setEmailConfirm(e.target.value)}
                  className={inputClass(emailConfirm, emailConfirm ? (emailConfirm === email ? true : false) : null)}
                  placeholder="you@example.com"
                />
              </label>

              <div className="nm-actions">
                <button type="submit" className="nm-btn nm-btn--primary" disabled={emailSubmitting}>
                  {emailSubmitting ? 'Saving…' : 'Save email'}
                </button>
                <button type="button" className="nm-btn nm-btn--ghost" onClick={() => { setEmail(''); setEmailConfirm(''); setEmailError(null); }}>
                  Cancel
                </button>
              </div>
            </form>
          </section>

          {/* Password card (sky-blue panel) */}
          <section className="nm-panel nm-panel--sky">
            <div className="nm-panel-head">
              <h2>Change password</h2>
              <p className="nm-muted">Choose a strong password. Minimum 8 characters.</p>
            </div>

            <form onSubmit={submitPassword} className="nm-form">
              {passwordError && <div className="nm-alert nm-alert--error">{passwordError}</div>}
              {passwordSuccess && <div className="nm-alert nm-alert--success">{passwordSuccess}</div>}

              <label className="nm-label">
                Current password
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={inputClass(currentPassword, currentPassword ? true : null)}
                  placeholder="Current password"
                />
              </label>

              <label className="nm-label">
                New password
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={inputClass(newPassword, newPassword ? (newPassword.length >= 8 ? true : false) : null)}
                  placeholder="New password"
                />
              </label>

              <label className="nm-label">
                Confirm new password
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClass(confirmPassword, confirmPassword ? (confirmPassword === newPassword ? true : false) : null)}
                  placeholder="Confirm new password"
                />
              </label>

              <div className="nm-row nm-row--space">
                <label className="nm-checkbox">
                  <input type="checkbox" checked={showPasswords} onChange={() => setShowPasswords((s) => !s)} />
                  <span>Show passwords</span>
                </label>
                <div />
              </div>

              <div className="nm-actions">
                <button type="submit" className="nm-btn nm-btn--primary" disabled={passwordSubmitting}>
                  {passwordSubmitting ? 'Updating…' : 'Change password'}
                </button>
                <button type="button" className="nm-btn nm-btn--ghost" onClick={() => {
                  setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); setPasswordError(null);
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </section>

          {/* Address card (wide, sky-blue) */}
          <section className="nm-panel nm-panel--sky nm-panel--wide">
            <div className="nm-panel-head">
              <h2>Physical address</h2>
              <p className="nm-muted">Update the address we use for on-site visits and invoices.</p>
            </div>

            <form onSubmit={submitAddress} className="nm-form">
              {addressError && <div className="nm-alert nm-alert--error">{addressError}</div>}
              {addressSuccess && <div className="nm-alert nm-alert--success">{addressSuccess}</div>}

              <label className="nm-label">
                Street address
                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className={inputClass(street, street ? true : null)} placeholder="123 Market Street" />
              </label>

              <div className="nm-grid-2">
                <label className="nm-label">
                  City
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass(city, city ? true : null)} placeholder="Emalahleni" />
                </label>

                <label className="nm-label">
                  Province / State
                  <input type="text" value={province} onChange={(e) => setProvince(e.target.value)} className={inputClass(province, province ? true : null)} placeholder="Mpumalanga" />
                </label>
              </div>

              <label className="nm-label">
                Postal code
                <input type="text" value={postal} onChange={(e) => setPostal(e.target.value)} className={inputClass(postal, postal ? true : null)} placeholder="1234" />
              </label>

              <div className="nm-actions">
                <button type="submit" className="nm-btn nm-btn--primary" disabled={addressSubmitting}>
                  {addressSubmitting ? 'Saving…' : 'Save address'}
                </button>
                <button type="button" className="nm-btn nm-btn--ghost" onClick={() => { setStreet(''); setCity(''); setProvince(''); setPostal(''); setAddressError(null); }}>
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Helpers for input classes ---------------- */

function inputClass(value: string, valid: boolean | null) {
  // returns className string used by inputs to reflect validation state
  // valid === true -> green border; valid === false -> red border; null -> default black border
  const base = 'nm-input';
  if (valid === true) return `${base} nm-input--valid`;
  if (valid === false) return `${base} nm-input--invalid`;
  return base;
}

/* ---------------- Styles (booking-like overrides) ---------------- */

const bookingStyleOverrides = `
:root{
  --sky-bg: #e6f6ff; /* light sky */
  --gold-bg: #fff4e6;
  --accent: #2563eb;
  --muted: #6b7280;
  --danger: #ef4444;
  --success: #10b981;
}

/* Page shell */
.nm-root { padding: 24px; font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; color:#0f172a; background: #f8fafc; min-height:100vh; }
.nm-page-shell { max-width:1100px; margin:0 auto; }
.nm-page-header { margin-bottom:18px; display:flex; align-items:center; gap:16px; }
.nm-title { margin:0; font-size:20px; }
.nm-sub { color:var(--muted); margin-top:4px; font-size:13px; }

/* Grid layout */
.nm-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:18px; align-items:start; }
.nm-panel { border-radius:14px; padding:16px; border:1px solid rgba(15,23,42,0.04); box-shadow: 0 6px 18px rgba(2,6,23,0.04); background: white; }
.nm-panel--wide { grid-column: 1 / -1; }

/* Booking-like sky background for panels */
.nm-panel--sky { background: var(--sky-bg); border: 1px solid rgba(37,99,235,0.08); }

/* Panel head */
.nm-panel-head h2 { margin:0; font-size:16px; }
.nm-muted { color:var(--muted); font-size:13px; margin-top:6px; }

/* Form layout */
.nm-form { margin-top:12px; display:flex; flex-direction:column; gap:12px; }
.nm-label { display:flex; flex-direction:column; gap:8px; font-size:13px; color:#0f172a; }

/* Inputs: plain black text, black border; hover orange; validation colors */
.nm-input {
  padding:10px 12px;
  border:1px solid #000;
  border-radius:10px;
  font-size:14px;
  color:#000;
  background:#fff;
  transition: border-color .12s, box-shadow .12s, transform .06s;
}
.nm-input:hover { border-color:#fb923c; transform: translateY(-1px); }
.nm-input:focus { outline:none; box-shadow: 0 6px 18px rgba(37,99,235,0.08); border-color: var(--accent); }

/* Validation states */
.nm-input--valid { border-color: var(--success) !important; box-shadow: 0 0 0 4px rgba(16,185,129,0.06); }
.nm-input--invalid { border-color: var(--danger) !important; box-shadow: 0 0 0 4px rgba(239,68,68,0.06); }

/* Buttons styled like booking UI */
.nm-actions { display:flex; gap:10px; margin-top:6px; }
.nm-btn {
  padding:10px 14px;
  border-radius:10px;
  font-size:14px;
  cursor:pointer;
  border:1px solid rgba(15,23,42,0.06);
  background:#fff;
  color:#0f172a;
  transition: transform .08s, box-shadow .08s;
}
.nm-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(2,6,23,0.06); }
.nm-btn--primary { background: linear-gradient(180deg, #2563eb, #1e40af); color:#fff; border: none; box-shadow: 0 8px 24px rgba(37,99,235,0.12); }
.nm-btn--ghost { background: #fff; border:1px solid rgba(15,23,42,0.04); }

/* Alerts */
.nm-alert { padding:10px 12px; border-radius:10px; font-size:13px; }
.nm-alert--error { background: #fff1f2; color: var(--danger); border:1px solid rgba(239,68,68,0.06); }
.nm-alert--success { background: #ecfdf5; color: var(--success); border:1px solid rgba(16,185,129,0.06); }

/* Small utilities */
.nm-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.nm-row { display:flex; align-items:center; gap:10px; }
.nm-row--space { justify-content:space-between; }
.nm-checkbox { display:flex; align-items:center; gap:8px; font-size:13px; color:var(--muted); }

/* Responsive */
@media (max-width: 880px) {
  .nm-grid { grid-template-columns: 1fr; }
  .nm-panel--wide { grid-column: auto; }
}
`;