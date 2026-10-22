import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Playground } from './components/Playground';
import { Terminal } from './components/Terminal';
import { Lab } from './components/Lab';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { XpMilestoneBar } from './components/XpMilestoneBar';
import { Sparkles } from 'lucide-react';
import { sounds } from './utils/audio';

export default function App() {
  const [xp, setXp] = useState<number>(() => {
    return Number(localStorage.getItem('aryan_user_xp') || 0);
  });
  const [currentAccent, setCurrentAccent] = useState<string>(() => {
    return localStorage.getItem('aryan_theme_accent') || '#ccff00';
  });
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('aryan_audio_muted');
      if (stored !== null) return stored === 'true';
    }
    return false;
  });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [xpNotification, setXpNotification] = useState<{ amount: number; reason: string } | null>(null);

  const toggleAudio = (explicitMute?: boolean) => {
    const nextMuted = explicitMute !== undefined ? explicitMute : !isAudioMuted;
    setIsAudioMuted(nextMuted);
    sounds.setMuted(nextMuted);
    if (!nextMuted) {
      sounds.playClick();
    }
  };

  // Apply accent color to document root CSS variables
  const setThemeAccent = (color: string) => {
    setCurrentAccent(color);
    localStorage.setItem('aryan_theme_accent', color);
    document.documentElement.style.setProperty('--primary-accent', color);
    // Darker variant
    let darkColor = '#b3e600';
    let glow = 'rgba(204, 255, 0, 0.25)';
    if (color === '#22c55e') {
      darkColor = '#16a34a';
      glow = 'rgba(34, 197, 94, 0.25)';
    } else if (color === '#3b82f6') {
      darkColor = '#2563eb';
      glow = 'rgba(59, 130, 246, 0.25)';
    } else if (color === '#ec4899') {
      darkColor = '#db2777';
      glow = 'rgba(236, 72, 153, 0.25)';
    }
    document.documentElement.style.setProperty('--primary-accent-dark', darkColor);
    document.documentElement.style.setProperty('--primary-accent-glow', glow);
  };

  useEffect(() => {
    setThemeAccent(currentAccent);
  }, []);

  // Award XP with notification
  const addXp = (amount: number, reason: string) => {
    setXp((prev) => {
      const updated = prev + amount;
      localStorage.setItem('aryan_user_xp', String(updated));
      return updated;
    });
    setXpNotification({ amount, reason });
    setTimeout(() => {
      setXpNotification(null);
    }, 3200);
  };

  // Mouse cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
        setIsResumeOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f5] relative selection:bg-primary-accent selection:text-black">
      {/* Background grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Custom responsive glow cursor */}
      <div
        className={`custom-cursor hidden lg:block ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />

      {/* Floating XP Notification Toast */}
      {xpNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121216] border border-primary-accent rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <div className="w-9 h-9 rounded-xl bg-primary-accent/10 border border-primary-accent/40 flex items-center justify-center text-primary-accent">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="font-mono text-xs">
            <div className="text-primary-accent font-bold">
              +{xpNotification.amount} XP Earned!
            </div>
            <div className="text-[#a1a1aa] text-[11px]">{xpNotification.reason}</div>
          </div>
        </div>
      )}

      {/* Fixed Sticky Header */}
      <Navbar
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        isMuted={isAudioMuted}
        onToggleSound={() => toggleAudio()}
      />

      {/* Main Grid-Background Content Area */}
      <main className="grid-bg pt-20">
        <Hero xp={xp} onOpenResume={() => setIsResumeOpen(true)} />
        <XpMilestoneBar xp={xp} />
        <Playground onAddXp={addXp} />
        <Terminal
          onOpenResume={() => setIsResumeOpen(true)}
          onSetThemeAccent={setThemeAccent}
          xp={xp}
          onAddXp={addXp}
          isAudioMuted={isAudioMuted}
          onToggleAudio={toggleAudio}
        />
        <Lab
          currentAccent={currentAccent}
          onSetThemeAccent={setThemeAccent}
          onAddXp={addXp}
        />
        <Projects onAddXp={addXp} />
        <About />
        <Skills onAddXp={addXp} />
        <Contact onAddXp={addXp} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onSetThemeAccent={setThemeAccent}
        onAddXp={addXp}
        isAudioMuted={isAudioMuted}
        onToggleAudio={toggleAudio}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onAddXp={addXp}
      />
    </div>
  );
}
