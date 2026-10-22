import React, { useState, useRef } from 'react';
import { Sliders, Sparkles, Layers, Palette } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LabProps {
  currentAccent: string;
  onSetThemeAccent: (color: string) => void;
  onAddXp: (amount: number, reason: string) => void;
}

export const Lab: React.FC<LabProps> = ({ currentAccent, onSetThemeAccent, onAddXp }) => {
  // Tilt Card State
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const tiltCardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltCardRef.current) return;
    const rect = tiltCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 30;
    const rotateY = (x / rect.width) * 30;

    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.05s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out',
    });
  };

  // Slider State
  const [sliderVal, setSliderVal] = useState<number>(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderVal(val);
    sounds.playTone(300 + val * 6, 'sine', 0.02, 0.03);
  };

  const accents = [
    { name: 'Volt Lime', color: '#ccff00' },
    { name: 'Emerald', color: '#22c55e' },
    { name: 'Cobalt Blue', color: '#3b82f6' },
    { name: 'Vivid Pink', color: '#ec4899' },
  ];

  return (
    <section className="py-24 px-6 border-t border-white/10" id="lab">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
            // 03. EXPERIMENTAL LAB
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">
            Small Experiments. Big Curiosity.
          </h2>
        </div>

        {/* 3 Lab Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1: 3D Tilt Card */}
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
            <div className="space-y-2">
              <span className="font-mono text-xs text-primary-accent flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                01 // 3D TILT OBJECT
              </span>
              <h3 className="font-display font-bold text-lg text-white">
                Interactive CSS Tilt
              </h3>
            </div>

            <div
              ref={tiltCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={tiltStyle}
              onClick={() => {
                sounds.playSuccess();
                onAddXp(10, 'Interacted with 3D CSS Tilt card');
              }}
              className="w-full h-44 bg-[#0a0a0c] border border-white/20 rounded-xl flex flex-col items-center justify-center font-mono text-primary-accent font-bold cursor-pointer select-none shadow-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <Sparkles className="w-6 h-6 mb-2 text-primary-accent animate-pulse" />
              <span>Hover &amp; Tilt Me</span>
              <span className="text-[10px] text-[#a1a1aa] font-normal mt-1">
                Click for +10 XP
              </span>
            </div>

            <p className="font-mono text-xs text-[#a1a1aa] leading-relaxed">
              Dynamic 3D perspective transformation based on cursor relative coordinates.
            </p>
          </div>

          {/* Module 2: Accent Lab */}
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
            <div className="space-y-2">
              <span className="font-mono text-xs text-primary-accent flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                02 // ACCENT LAB
              </span>
              <h3 className="font-display font-bold text-lg text-white">
                Color Theme Switcher
              </h3>
            </div>

            <div className="py-6 flex items-center justify-center gap-4 bg-[#0a0a0c] rounded-xl border border-white/10">
              {accents.map((item) => {
                const isSelected = currentAccent.toLowerCase() === item.color.toLowerCase();
                return (
                  <button
                    key={item.color}
                    onClick={() => {
                      sounds.playClick();
                      onSetThemeAccent(item.color);
                      onAddXp(10, `Switched theme to ${item.name}`);
                    }}
                    title={item.name}
                    style={{ backgroundColor: item.color }}
                    className={`w-11 h-11 rounded-full border-2 transition-all cursor-pointer shadow-lg ${
                      isSelected
                        ? 'border-white scale-110 ring-4 ring-white/20'
                        : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                  />
                );
              })}
            </div>

            <p className="font-mono text-xs text-[#a1a1aa] leading-relaxed">
              Instantly toggle primary highlight accents across the entire DOM root.
            </p>
          </div>

          {/* Module 3: Parameter Model V1 */}
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
            <div className="space-y-2">
              <span className="font-mono text-xs text-primary-accent flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                03 // DATA SLIDER
              </span>
              <h3 className="font-display font-bold text-lg text-white">
                Parameter Model V1
              </h3>
            </div>

            <div className="space-y-4 bg-[#0a0a0c] p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-center font-mono text-xs">
                <span className="text-[#a1a1aa]">Value Multiplier:</span>
                <span className="text-primary-accent font-bold text-sm tabular-nums">
                  {sliderVal}
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="100"
                value={sliderVal}
                onChange={handleSliderChange}
                className="w-full accent-primary-custom cursor-pointer"
              />

              <div className="w-full h-7 bg-[#121216] rounded-lg overflow-hidden flex border border-white/10">
                <div
                  className="h-full bg-primary-accent transition-all duration-100 shadow-[0_0_10px_var(--primary-accent-glow)]"
                  style={{ width: `${sliderVal}%` }}
                />
              </div>

              <div className="flex justify-between font-mono text-[10px] text-[#a1a1aa]">
                <span>Variance: {(sliderVal * 0.42).toFixed(1)}</span>
                <span>Confidence: {(90 + sliderVal * 0.09).toFixed(1)}%</span>
              </div>
            </div>

            <p className="font-mono text-xs text-[#a1a1aa] leading-relaxed">
              Simulated interactive statistical estimator with real-time DOM telemetry updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
