'use client';

import { useState } from 'react';
import Link from 'next/link';
/* Inline SVG icons — no lucide-react dependency needed */
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" stroke="none">
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Our Mission', href: '/our-mission' },
    { label: 'Community', href: '/community' },
    {
      label: 'How It Works',
      href: '#',
      dropdown: [
        { label: 'For Donors', href: '/how-it-works/donors' },
        { label: 'For Those We Help', href: '/how-it-works/recipients' },
      ],
    },
    { label: 'Transparency', href: '/transparency' },
    { label: 'Where to Spend', href: '/where-to-spend' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-light-gray shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-brand-dark hover:opacity-80 transition-opacity"
          >
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-brand-warm to-brand-warm-dark">
              <HeartIcon className="w-6 h-6 text-white" />
            </div>
            <span className="hidden sm:inline">Homeless Hand Up</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <button
                  className="px-3 py-2 text-sm font-medium text-brand-dark hover:text-brand-warm transition-colors rounded-md hover:bg-brand-cream flex items-center gap-1"
                  onClick={() => {
                    if (link.dropdown) {
                      setIsHowItWorksOpen(!isHowItWorksOpen);
                    }
                  }}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-warm transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/community"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white text-sm font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Give Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-brand-dark hover:bg-brand-cream transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-light-gray">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
                      className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-brand-dark hover:bg-brand-cream flex items-center justify-between"
                    >
                      {link.label}
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform ${
                          isHowItWorksOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isHowItWorksOpen && (
                      <div className="pl-4 space-y-1 mt-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-warm transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-brand-dark hover:bg-brand-cream hover:text-brand-warm transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA Button */}
            <div className="pt-4 border-t border-brand-light-gray">
              <Link
                href="/community"
                className="block w-full text-center px-6 py-2.5 bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Give Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
