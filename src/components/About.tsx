import React from 'react';
import { GraduationCap, Award, Compass, BookOpen } from 'lucide-react';
import { sounds } from '../utils/audio';

export const About: React.FC = () => {
  return (
    <section className="py-24 px-6 border-t border-white/10" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Bio & Core Specs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
              // 05. ABOUT ME
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">
              Curious by nature. Builder by choice.
            </h2>
          </div>

          <p className="text-[#a1a1aa] text-base leading-relaxed">
            I am a recent BCA Data Science graduate from JECRC University, Jaipur. My journey is driven by a deep fascination with transforming messy, raw telemetry into pristine predictive pipelines and clean web interfaces.
          </p>

          <div className="p-6 bg-[#121216] border border-white/10 rounded-2xl space-y-3.5 font-mono text-xs shadow-md">
            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-white/5">
              <span className="text-[#a1a1aa]">Degree:</span>
              <span className="text-white font-semibold">BCA - Specialization in Data Science</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-white/5">
              <span className="text-[#a1a1aa]">Institution:</span>
              <span className="text-white font-semibold">JECRC University, Jaipur</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1">
              <span className="text-[#a1a1aa]">Core Focus:</span>
              <span className="text-primary-accent font-semibold">
                Python, ML Pipelines &amp; Frontend Engineering
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Journey Timeline */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary-accent" />
            <span>My Journey So Far</span>
          </h3>

          <div className="space-y-6 border-l border-white/10 pl-6 ml-3 font-mono text-xs">
            {/* 2024 Milestone */}
            <div 
              className="relative space-y-1.5 group cursor-pointer"
              onClick={() => sounds.playClick()}
            >
              <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary-accent border-4 border-[#0a0a0c] shadow-[0_0_10px_var(--primary-accent-glow)] group-hover:scale-125 transition-transform"></span>
              <span className="text-primary-accent font-bold">2024</span>
              <h4 className="font-display text-base font-bold text-white group-hover:text-primary-accent transition-colors">
                BCA Data Science Graduation
              </h4>
              <p className="text-[#a1a1aa] leading-relaxed">
                Graduated from JECRC University with 10+ completed projects and deep algorithmic expertise across predictive models and batch processing.
              </p>
            </div>

            {/* 2023 Milestone */}
            <div 
              className="relative space-y-1.5 group cursor-pointer"
              onClick={() => sounds.playClick()}
            >
              <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white/30 border-4 border-[#0a0a0c] group-hover:bg-primary-accent group-hover:scale-125 transition-all"></span>
              <span className="text-[#a1a1aa] font-bold">2023</span>
              <h4 className="font-display text-base font-bold text-white group-hover:text-primary-accent transition-colors">
                Advanced Python &amp; Web Tooling
              </h4>
              <p className="text-[#a1a1aa] leading-relaxed">
                Developed automated certificate dispatchers and Bookslet digital library architecture, mastering high-throughput document generators.
              </p>
            </div>

            {/* 2021 Milestone */}
            <div 
              className="relative space-y-1.5 group cursor-pointer"
              onClick={() => sounds.playClick()}
            >
              <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white/20 border-4 border-[#0a0a0c] group-hover:bg-primary-accent group-hover:scale-125 transition-all"></span>
              <span className="text-[#a1a1aa] font-bold">2021</span>
              <h4 className="font-display text-base font-bold text-white group-hover:text-primary-accent transition-colors">
                Began University Studies
              </h4>
              <p className="text-[#a1a1aa] leading-relaxed">
                Started formal education in computer applications, statistical modeling, algorithmic structures, and relational databases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
