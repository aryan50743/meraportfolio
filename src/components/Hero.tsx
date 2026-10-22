import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Terminal, Gamepad2, FileText } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeroProps {
  xp: number;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ xp, onOpenResume }) => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      // Jaipur time formatted (Asia/Kolkata timezone)
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        setTimeString(formatter.format(now));
      } catch {
        setTimeString(now.toTimeString().split(' ')[0]);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute Level based on XP
  const level = Math.floor(xp / 100) + 1;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6" id="hero">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Typographic Pitch & Action buttons */}
        <div className="lg:col-span-8 flex flex-col items-start gap-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121216] border border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_#22c55e]"></span>
            <span className="font-mono text-xs text-primary-accent font-medium tracking-wide">
              OPEN TO OPPORTUNITIES // SYSTEM ONLINE
            </span>
          </div>

          {/* Main Display Headline */}
          <div className="space-y-3">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight uppercase leading-none text-white">
              HEY, I&apos;M <span className="text-primary-accent drop-shadow-[0_0_20px_var(--primary-accent-glow)]">ARYAN.</span>
            </h1>
            <p className="font-display text-xl sm:text-2xl text-[#a1a1aa] font-medium tracking-tight">
              I build things with code, data &amp; curiosity.
            </p>
          </div>

          {/* Summary Lead */}
          <p className="text-[#a1a1aa] text-base md:text-lg max-w-xl leading-relaxed">
            Data Science graduate. Developer. Experimenter. Always building something new, optimizing analytical pipelines, and crafting experimental web labs.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              onClick={() => sounds.playClick()}
              className="px-6 py-3.5 bg-primary-accent text-black font-display font-bold rounded-xl text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_25px_var(--primary-accent-glow)]"
            >
              <span>Explore My World</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#playground"
              onClick={() => sounds.playClick()}
              className="px-6 py-3.5 bg-[#121216] border border-white/10 rounded-xl text-sm font-mono text-white hover:border-primary-accent hover:text-primary-accent active:scale-95 transition-all flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4 text-primary-accent" />
              <span>Arcade Playground</span>
            </a>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenResume();
              }}
              className="px-4 py-3 text-[#a1a1aa] hover:text-white font-mono text-sm transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Skip the fun → View Resume</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Telemetry Card */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full max-w-sm bg-[#121216] border border-white/10 rounded-3xl p-6 shadow-2xl relative group hover:border-primary-accent/40 transition-all">
            {/* Live Clock Tag */}
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-primary-accent text-black font-mono text-[10px] font-bold rounded-full shadow-[0_0_10px_var(--primary-accent-glow)]">
              LIVE CLOCK
            </div>

            {/* Header with City & Realtime Clock */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <span className="font-mono text-xs text-[#a1a1aa] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-accent"></span>
                JAIPUR, IND
              </span>
              <span className="font-mono text-xl font-bold text-primary-accent tracking-wider tabular-nums">
                {timeString || '00:00:00'}
              </span>
            </div>

            {/* Credential Metrics */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center p-3.5 bg-[#0a0a0c] rounded-xl border border-white/5">
                <span className="text-[#a1a1aa]">Degree:</span>
                <span className="text-[#f4f4f5] font-semibold">BCA Data Science</span>
              </div>

              <div className="flex justify-between items-center p-3.5 bg-[#0a0a0c] rounded-xl border border-white/5">
                <span className="text-[#a1a1aa]">Alma Mater:</span>
                <span className="text-[#f4f4f5] font-semibold">JECRC University</span>
              </div>

              <div className="flex justify-between items-center p-3.5 bg-[#0a0a0c] rounded-xl border border-white/5">
                <span className="text-[#a1a1aa]">XP Level:</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary-accent" />
                  <span className="text-primary-accent font-bold tabular-nums">
                    Level {level} ({xp} XP)
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive hint */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-[#a1a1aa]">
              <span>Interactive Status:</span>
              <span className="text-[#22c55e] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping"></span>
                Ready to Deploy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
