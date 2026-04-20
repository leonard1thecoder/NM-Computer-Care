// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/newsletter', label: 'Newsletter' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
            NM
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">NM Computer Care</h1>
            <p className="text-xs text-gray-500 -mt-1">Fast • Reliable • Future-Ready</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blue-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors">
            Login
          </Link>
          <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors">
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-6 py-6 space-y-4 text-lg font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-blue-600 py-2">
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setIsOpen(false)} className="border border-gray-300 text-center py-3 rounded-xl font-medium">
              Login
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white text-center py-3 rounded-xl font-medium">
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}