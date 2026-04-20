// app/register/page.tsx
'use client';

import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert('✅ Account created successfully! (Demo)');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      <div className="pt-28 pb-16 bg-gradient-to-br from-blue-700 to-indigo-700 text-white">
        <div className="max-w-md mx-auto px-6 text-center">
          <h1 className="text-5xl font-semibold tracking-tight mb-4">Create Account</h1>
          <p className="text-blue-100 text-xl">Join NM Computer Care and manage your tech easily</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" placeholder="Full Name" required className="w-full border-2 border-gray-300 focus:border-green-500 hover:border-yellow-400 rounded-3xl px-6 py-4 text-base focus:outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="email" placeholder="Email Address" required className="w-full border-2 border-gray-300 focus:border-green-500 hover:border-yellow-400 rounded-3xl px-6 py-4 text-base focus:outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="tel" placeholder="Phone / WhatsApp" required className="w-full border-2 border-gray-300 focus:border-green-500 hover:border-yellow-400 rounded-3xl px-6 py-4 text-base focus:outline-none" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <input type="password" placeholder="Password" required className="w-full border-2 border-gray-300 focus:border-green-500 hover:border-yellow-400 rounded-3xl px-6 py-4 text-base focus:outline-none" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <input type="password" placeholder="Confirm Password" required className="w-full border-2 border-gray-300 focus:border-green-500 hover:border-yellow-400 rounded-3xl px-6 py-4 text-base focus:outline-none" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-3xl font-semibold text-lg transition-all">
              Create Account
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
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