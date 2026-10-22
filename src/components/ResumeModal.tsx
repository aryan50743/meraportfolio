import React, { useState } from 'react';
import { Download, X, Award, CheckCircle2, FileText, GraduationCap, Code } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXp: (amount: number, reason: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onAddXp }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    sounds.playSuccess();
    setDownloadSuccess(true);
    onAddXp(20, 'Downloaded Resume PDF');
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121216] border border-white/20 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-accent" />
              Aryan Gothwal — Resume
            </h3>
            <p className="text-xs font-mono text-[#a1a1aa] mt-0.5">
              BCA Data Science Graduate | Python &amp; Data Developer
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none px-4 py-2 bg-primary-accent text-black font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_var(--primary-accent-glow)] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-[#f4f4f5] rounded-lg text-xs font-mono transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* Download Success Notice */}
        {downloadSuccess && (
          <div className="bg-emerald-950/60 border-b border-emerald-500/30 px-6 py-2.5 font-mono text-xs text-[#22c55e] flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Resume package exported successfully! Ready for technical review.</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#a1a1aa]">
          {/* Professional Summary */}
          <div>
            <h4 className="font-mono text-primary-accent text-xs uppercase tracking-wider mb-2">
              // Professional Summary
            </h4>
            <p className="text-white text-base leading-relaxed">
              Dedicated Data Science graduate from JECRC University with deep expertise in Python engineering, algorithmic modeling, and reactive frontend experiences. Proven track record of building production-ready automated systems and interactive web tools.
            </p>
          </div>

          {/* 2-Column Grid: Education & Areas of Interest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-mono text-primary-accent text-xs uppercase tracking-wider mb-2">
                // Education
              </h4>
              <div className="p-4 bg-[#1a1a20] rounded-xl border border-white/5 space-y-1">
                <h5 className="font-bold text-white">Bachelor of Computer Applications (BCA)</h5>
                <p className="text-xs text-primary-accent font-mono">Specialization in Data Science</p>
                <p className="text-xs text-[#a1a1aa]">JECRC University, Jaipur (2021 – 2024)</p>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-primary-accent text-xs uppercase tracking-wider mb-2">
                // Areas of Interest
              </h4>
              <div className="p-4 bg-[#1a1a20] rounded-xl border border-white/5 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-primary-accent border border-white/5">
                  Data Science &amp; EDA
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-primary-accent border border-white/5">
                  Python Development
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-primary-accent border border-white/5">
                  Full-Stack Web
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-primary-accent border border-white/5">
                  Algorithmic Automation
                </span>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h4 className="font-mono text-primary-accent text-xs uppercase tracking-wider mb-2">
              // Key Projects
            </h4>
            <ul className="space-y-3 font-mono text-xs">
              <li className="p-4 bg-[#1a1a20] rounded-xl border border-white/5 leading-relaxed">
                <strong className="text-white block text-sm font-sans mb-1">
                  Automated Certificate Generation Platform
                </strong>
                Python, Flask, ReportLab, TailwindCSS. High-throughput bulk credential dispatch generating personalized, tamper-evident certificates with automated PDF export.
              </li>
              <li className="p-4 bg-[#1a1a20] rounded-xl border border-white/5 leading-relaxed">
                <strong className="text-white block text-sm font-sans mb-1">
                  Bookslet – Smart Digital Library &amp; Reader Hub
                </strong>
                JavaScript, REST APIs, SQL. 1,200+ indexed books with sub-50ms search, real-time filtering, and reading progress telemetry.
              </li>
              <li className="p-4 bg-[#1a1a20] rounded-xl border border-white/5 leading-relaxed">
                <strong className="text-white block text-sm font-sans mb-1">
                  Predictive Analytics Suite
                </strong>
                Pandas, NumPy, Seaborn, Jupyter. Multi-variable exploratory data analysis pipeline with outlier detection and distribution curve visualizations.
              </li>
            </ul>
          </div>

          {/* Technical Skills Map */}
          <div>
            <h4 className="font-mono text-primary-accent text-xs uppercase tracking-wider mb-2">
              // Technical Competencies
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#1a1a20] rounded-xl border border-white/5">
                <span className="text-white font-bold block mb-1">Languages</span>
                <span className="text-[#a1a1aa]">Python, JavaScript, SQL, HTML/CSS</span>
              </div>
              <div className="p-3 bg-[#1a1a20] rounded-xl border border-white/5">
                <span className="text-white font-bold block mb-1">Data Tools</span>
                <span className="text-[#a1a1aa]">Pandas, NumPy, Seaborn, Jupyter</span>
              </div>
              <div className="p-3 bg-[#1a1a20] rounded-xl border border-white/5">
                <span className="text-white font-bold block mb-1">Web Tech</span>
                <span className="text-[#a1a1aa]">React, Flask, Node.js, TailwindCSS</span>
              </div>
              <div className="p-3 bg-[#1a1a20] rounded-xl border border-white/5">
                <span className="text-white font-bold block mb-1">Databases</span>
                <span className="text-[#a1a1aa]">PostgreSQL, MySQL, SQLite</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
