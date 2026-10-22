import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onSetThemeAccent: (color: string) => void;
  onAddXp: (amount: number, reason: string) => void;
  isAudioMuted: boolean;
  onToggleAudio: (explicit?: boolean) => void;
}

interface CommandItem {
  id: string;
  label: string;
  badge: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onSetThemeAccent,
  onAddXp,
  isAudioMuted,
  onToggleAudio,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    sounds.playClick();
    onClose();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const commands: CommandItem[] = [
    {
      id: 'hero',
      label: 'Go to Hero & Live Telemetry',
      badge: 'Home',
      action: () => scrollTo('hero'),
    },
    {
      id: 'about',
      label: 'Go to About & Journey Timeline',
      badge: 'About',
      action: () => scrollTo('about'),
    },
    {
      id: 'projects',
      label: 'Go to Projects & Systems',
      badge: 'Projects',
      action: () => scrollTo('projects'),
    },
    {
      id: 'playground',
      label: 'Play Snake & Mini-Games',
      badge: 'Playground',
      action: () => scrollTo('playground'),
    },
    {
      id: 'terminal',
      label: 'Open Developer CLI Terminal',
      badge: 'Terminal',
      action: () => scrollTo('terminal'),
    },
    {
      id: 'lab',
      label: 'Interactive Web Lab Experiments',
      badge: 'Lab',
      action: () => scrollTo('lab'),
    },
    {
      id: 'skills',
      label: 'Technical Skills Matrix',
      badge: 'Skills',
      action: () => scrollTo('skills'),
    },
    {
      id: 'contact',
      label: 'Contact Aryan Directly',
      badge: 'Contact',
      action: () => scrollTo('contact'),
    },
    {
      id: 'resume',
      label: 'Open Curriculum Vitae (CV / Resume)',
      badge: 'Resume',
      action: () => {
        sounds.playSuccess();
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'audio-toggle',
      label: `Audio Settings: ${isAudioMuted ? 'Enable Sound Effects (Currently Muted)' : 'Mute Sound Effects (Currently Active)'}`,
      badge: 'Audio',
      action: () => {
        onToggleAudio();
        onAddXp(10, 'Toggled Audio Settings via Command Palette');
        onClose();
      },
    },
    {
      id: 'audio-enable',
      label: 'Audio Settings: Turn Sound Effects ON (Terminal & Games)',
      badge: 'Audio',
      action: () => {
        onToggleAudio(false);
        onAddXp(10, 'Enabled Sound Effects via Command Palette');
        onClose();
      },
    },
    {
      id: 'audio-disable',
      label: 'Audio Settings: Turn Sound Effects OFF / Mute (Terminal & Games)',
      badge: 'Audio',
      action: () => {
        onToggleAudio(true);
        onAddXp(10, 'Muted Sound Effects via Command Palette');
        onClose();
      },
    },
    {
      id: 'theme-lime',
      label: 'Switch Accent: Volt Lime',
      badge: 'Theme',
      action: () => {
        sounds.playClick();
        onSetThemeAccent('#ccff00');
        onAddXp(10, 'Switched theme via Command Palette');
        onClose();
      },
    },
    {
      id: 'theme-green',
      label: 'Switch Accent: Emerald Green',
      badge: 'Theme',
      action: () => {
        sounds.playClick();
        onSetThemeAccent('#22c55e');
        onAddXp(10, 'Switched theme via Command Palette');
        onClose();
      },
    },
    {
      id: 'theme-blue',
      label: 'Switch Accent: Electric Blue',
      badge: 'Theme',
      action: () => {
        sounds.playClick();
        onSetThemeAccent('#3b82f6');
        onAddXp(10, 'Switched theme via Command Palette');
        onClose();
      },
    },
    {
      id: 'theme-pink',
      label: 'Switch Accent: Vivid Pink',
      badge: 'Theme',
      action: () => {
        sounds.playClick();
        onSetThemeAccent('#ec4899');
        onAddXp(10, 'Switched theme via Command Palette');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.badge.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121216] border border-white/20 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-primary-accent shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search sections (e.g. projects, snake, skills)..."
            className="w-full bg-transparent border-none text-[#f4f4f5] focus:outline-none font-mono text-sm placeholder-[#a1a1aa]"
          />
          <button
            onClick={onClose}
            className="text-xs font-mono px-2 py-1 bg-white/10 hover:bg-white/20 text-[#a1a1aa] hover:text-white rounded transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1 font-mono text-xs">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-[#a1a1aa]">
              No directives matching &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-white/10 text-primary-accent shadow-sm'
                      : 'text-[#a1a1aa] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-primary-accent">→</span>
                    <span className={isSelected ? 'text-white font-medium' : ''}>
                      {cmd.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 border border-white/5 text-[#a1a1aa]">
                      {cmd.badge}
                    </span>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-primary-accent" />}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
