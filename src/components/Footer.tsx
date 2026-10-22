import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sounds } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-[#121216]/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-accent/10 border border-primary-accent/30 flex items-center justify-center font-display font-bold text-primary-accent text-xs">
            AG
          </div>
          <span className="font-mono text-xs text-[#a1a1aa]">
            Designed with curiosity. Built with code.
          </span>
        </div>

        {/* Copyright */}
        <div className="font-mono text-xs text-[#a1a1aa]">
          © 2025 Aryan Gothwal. All rights reserved.
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="font-mono text-xs text-primary-accent hover:underline flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
