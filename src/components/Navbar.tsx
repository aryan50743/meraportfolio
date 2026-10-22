import React, { useState } from 'react';
import { Search, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  onOpenCommand: () => void;
  onOpenResume: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommand,
  onOpenResume,
  isMuted,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Playground', href: '#playground' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Lab', href: '#lab' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0c]/85 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Lockup */}
        <a 
          href="#hero" 
          onClick={() => sounds.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary-accent/10 border border-primary-accent/30 flex items-center justify-center font-display font-bold text-primary-accent group-hover:scale-105 transition-transform">
            AG
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tight text-white group-hover:text-primary-accent transition-colors">
              Aryan Gothwal
            </span>
            <span className="font-mono text-[10px] text-primary-accent tracking-wider">
              DATA SCIENTIST &amp; DEV
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs text-[#a1a1aa]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => sounds.playClick()}
              className="hover:text-primary-accent transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={isMuted ? 'Unmute procedural sound effects' : 'Mute sound effects'}
            className="p-2 rounded-lg bg-[#121216] border border-white/10 text-[#a1a1aa] hover:text-primary-accent hover:border-primary-accent transition-all"
            aria-label="Toggle audio effects"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-primary-accent" />}
          </button>

          {/* Quick Search */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenCommand();
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121216] border border-white/10 font-mono text-xs text-[#a1a1aa] hover:border-primary-accent hover:text-white transition-all"
          >
            <Search className="w-3.5 h-3.5 text-primary-accent" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-[#f4f4f5]">⌘K</kbd>
          </button>

          {/* Resume CTA */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenResume();
            }}
            className="px-4 py-2 bg-primary-accent text-black font-display font-bold rounded-lg text-xs hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_var(--primary-accent-glow)]"
          >
            Resume
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#121216] border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121216] border-b border-white/10 px-6 py-4 space-y-3 font-mono text-xs animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-[#1a1a20] border border-white/5 text-[#a1a1aa] hover:text-primary-accent hover:border-primary-accent"
              >
                {link.name}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCommand();
            }}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#1a1a20] border border-white/10 text-white"
          >
            <Search className="w-3.5 h-3.5 text-primary-accent" />
            <span>Search Command Palette (⌘K)</span>
          </button>
        </div>
      )}
    </header>
  );
};
