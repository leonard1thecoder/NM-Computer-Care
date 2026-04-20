// app/login/page.tsx
'use client';

import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ Login successful! (Demo)');
    // In real app you would redirect to dashboard
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      <div className="pt-28 pb-16 bg-gradient-to-br from-blue-700 to-indigo-700 text-white">
        <div className="max-w-md mx-auto px-6 text-center">
          <h1 className="text-5xl font-semibold tracking-tight mb-4">Welcome Back</h1>
          <p className="text-blue-100 text-xl">Sign in to manage your devices and bookings</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
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

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border-2 border-gray-300 focus:border-green-500 hover:border-yellow-400 rounded-3xl px-6 py-4 text-base focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-3xl font-semibold text-lg transition-all"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Same footer as index */}
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