import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useUIStore } from '../store';

export const Header: React.FC = () => {
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-navy transition-colors">Services</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-navy transition-colors">Pricing</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-navy transition-colors">Process</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-navy transition-colors">About</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-navy transition-colors">FAQ</a>
            <a href="#apply" className="btn-primary">
              Apply Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-3">
            <a href="#services" onClick={toggleMobileMenu} className="block text-sm font-medium text-slate-600 hover:text-navy py-2">Services</a>
            <a href="#pricing" onClick={toggleMobileMenu} className="block text-sm font-medium text-slate-600 hover:text-navy py-2">Pricing</a>
            <a href="#how-it-works" onClick={toggleMobileMenu} className="block text-sm font-medium text-slate-600 hover:text-navy py-2">Process</a>
            <a href="#about" onClick={toggleMobileMenu} className="block text-sm font-medium text-slate-600 hover:text-navy py-2">About</a>
            <a href="#faq" onClick={toggleMobileMenu} className="block text-sm font-medium text-slate-600 hover:text-navy py-2">FAQ</a>
            <a href="#apply" onClick={toggleMobileMenu} className="btn-primary block text-center">
              Apply Now
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
