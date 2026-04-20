// app/forgot-password/page.tsx
'use client';

import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
      setTimeout(() => {
        alert('✅ Password reset link has been sent to your email!');
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      <div className="pt-28 pb-16 bg-gradient-to-br from-blue-700 to-indigo-700 text-white">
        <div className="max-w-md mx-auto px-6 text-center">
          <h1 className="text-5xl font-semibold tracking-tight mb-4">Forgot Password?</h1>
          <p className="text-blue-100 text-xl">No worries! We&apos;ll send you a reset link.</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="w-full border-2 border-gray-300 focus:border-green-500 hover:border-yellow-400 rounded-3xl px-6 py-4 text-base focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-3xl font-semibold text-lg transition-all"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-6">📧</div>
              <h3 className="text-2xl font-semibold text-green-700 mb-2">Link Sent!</h3>
              <p className="text-gray-600">Check your email for the password reset link.</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/login" className="text-blue-600 hover:underline">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Same Footer as Index */}
      <footer className="bg-white text-gray-700 py-12 border-t mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-2">NM Computer Care</p>
          <p className="text-gray-600 mb-8">South Africa • Professional Tech Support</p>
          <div className="flex justify-center gap-10 mb-8">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" className="w-9 h-9" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png" alt="Instagram" className="w-9 h-9" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" alt="X" className="w-9 h-9" />
            </a>
          </div>
          <p className="text-sm text-gray-500">© 2026 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}