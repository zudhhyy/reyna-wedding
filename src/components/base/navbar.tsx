'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="w-full px-6 py-4 sticky top-0 z-50 bg-background">
      <nav className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-honeymoon text-primary">Reyna & Wasiq</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-5 text-sm font-lucy">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-secondary transition">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button onClick={toggleMenu} className="md:hidden">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-background/90 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4'
        }`}
      >
        <div className="px-6 pb-6">
          <ul className="flex flex-col gap-4 text-base font-lucy pt-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link 
                  href={href} 
                  className="block hover:text-secondary transition-colors duration-200" 
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// Nav Links
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/attire', label: 'Attire' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/registry', label: 'Registry' },
  { href: '/location', label: 'Location' },
  { href: '/rsvp', label: 'RSVP' },
  { href: '/thankyou', label: 'Thank You' },
];
