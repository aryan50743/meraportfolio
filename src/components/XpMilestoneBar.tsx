import React from 'react';
import { Sparkles, Trophy, Zap, Terminal, Gamepad2, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface XpMilestoneBarProps {
  xp: number;
}

export const XpMilestoneBar: React.FC<XpMilestoneBarProps> = ({ xp }) => {
  const XP_PER_LEVEL = 100;
  const currentLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
  const nextLevel = currentLevel + 1;
  const currentLevelBaseXp = (currentLevel - 1) * XP_PER_LEVEL;
  const xpInCurrentLevel = xp - currentLevelBaseXp;
  const xpNeededForNext = XP_PER_LEVEL - xpInCurrentLevel;
  const progressPercent = Math.min(
    Math.max(Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100), 0),
    100
  );

  const levelTitles: Record<number, string> = {
    1: 'Curious Explorer',
    2: 'Algorithmic Developer',
    3: 'Data Science Engineer',
    4: 'Pipeline Architect',
    5: 'System Synthesizer',
  };

  const currentTitle = levelTitles[currentLevel] || 'Distinguished Engineer';
  const nextTitle = levelTitles[nextLevel] || 'Distinguished Engineer';

  return (
    <div className="max-w-7xl mx-auto px-6 -mt-8 mb-12">
      <div 
        onClick={() => sounds.playClick()}
        className="bg-[#121216]/90 border border-white/10 hover:border-primary-accent/40 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all cursor-default relative overflow-hidden group"
      >
        {/* Subtle background glow */}
        <div 
          className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-primary-accent/5 blur-3xl pointer-events-none group-hover:bg-primary-accent/10 transition-colors"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          {/* Level Info & Titles */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-primary-accent/10 border border-primary-accent/30 flex items-center justify-center text-primary-accent font-display font-bold text-lg shadow-[0_0_15px_var(--primary-accent-glow)]">
              L{currentLevel}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-white text-base sm:text-lg">
                  {currentTitle}
                </span>
                <span className="font-mono text-[10px] text-primary-accent px-2 py-0.5 rounded-full bg-primary-accent/10 border border-primary-accent/20">
                  Level {currentLevel}
                </span>
              </div>
              <p className="font-mono text-xs text-[#a1a1aa] flex items-center gap-1.5">
                <span>Next Milestone:</span>
                <span className="text-white font-medium">Level {nextLevel} ({nextTitle})</span>
              </p>
            </div>
          </div>

          {/* Central Progress Bar */}
          <div className="flex-1 w-full max-w-2xl space-y-2">
            <div className="flex justify-between items-center font-mono text-xs text-[#a1a1aa]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-accent" />
                <span>Level Progress</span>
              </span>
              <span className="text-[#f4f4f5] font-semibold tabular-nums">
                <strong className="text-primary-accent font-bold">{xpInCurrentLevel}</strong> / {XP_PER_LEVEL} XP ({progressPercent}%)
              </span>
            </div>

            {/* Visual Bar Track */}
            <div className="w-full h-3.5 bg-[#0a0a0c] border border-white/10 rounded-full p-0.5 overflow-hidden relative shadow-inner">
              <div
                className="h-full bg-primary-accent rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_var(--primary-accent-glow)] relative overflow-hidden"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Light shimmer animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>

            {/* Quick XP Earning Tips */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#a1a1aa] pt-0.5">
              <span className="text-primary-accent">
                {xpNeededForNext === 0
                  ? 'Milestone ready to advance!'
                  : `${xpNeededForNext} XP needed to reach Level ${nextLevel}`}
              </span>
              <div className="hidden sm:flex items-center gap-3 text-[10px]">
                <a href="#playground" className="hover:text-primary-accent transition-colors">Arcade +10-30 XP</a>
                <span>·</span>
                <a href="#terminal" className="hover:text-primary-accent transition-colors">CLI +5-15 XP</a>
                <span>·</span>
                <a href="#lab" className="hover:text-primary-accent transition-colors">Lab +10 XP</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
