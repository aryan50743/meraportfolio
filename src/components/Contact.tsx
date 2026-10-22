import React, { useState } from 'react';
import { Copy, Check, Send, ArrowUpRight, Mail } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ContactProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onAddXp }) => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    sounds.playSuccess();
    navigator.clipboard.writeText('aryangothwal6@gmail.com');
    setCopied(true);
    onAddXp(10, 'Copied email address');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    setFormSubmitted(true);
    onAddXp(25, 'Transmitted contact dispatch message');
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 6000);
  };

  return (
    <section className="py-24 px-6 border-t border-white/10" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
              // 07. GET IN TOUCH
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">
              Have an idea? Let&apos;s build it.
            </h2>
          </div>

          <p className="text-[#a1a1aa] text-base leading-relaxed">
            Whether you have an internship opportunity, a project to collaborate on, or just want to discuss data science — my inbox is always open.
          </p>

          {/* Email Copy Card */}
          <div className="p-6 bg-[#121216] border border-white/10 rounded-2xl space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#a1a1aa] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary-accent" />
                Direct Email:
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1 bg-primary-accent text-black font-mono text-xs font-bold rounded hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
            </div>

            <div className="font-mono text-sm text-[#f4f4f5] select-all font-semibold">
              aryangothwal6@gmail.com
            </div>

            {copied && (
              <div className="font-mono text-xs text-[#22c55e] flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>✓ Email copied to clipboard!</span>
              </div>
            )}
          </div>

          {/* External Social Links */}
          <div className="flex gap-4 font-mono text-xs">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="px-4 py-2 bg-[#121216] border border-white/10 rounded-xl hover:border-primary-accent hover:text-white text-[#a1a1aa] transition-all flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="px-4 py-2 bg-[#121216] border border-white/10 rounded-xl hover:border-primary-accent hover:text-white text-[#a1a1aa] transition-all flex items-center gap-1.5"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-[#121216] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-mono text-xs text-[#a1a1aa] block">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Elena Rostova"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0a0a0c] border border-white/20 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-primary-accent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-[#a1a1aa] block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0a0a0c] border border-white/20 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-primary-accent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs text-[#a1a1aa] block">Subject / Opportunity</label>
              <input
                type="text"
                required
                placeholder="Data Analyst Internship"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[#0a0a0c] border border-white/20 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-primary-accent transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs text-[#a1a1aa] block">Message Body</label>
              <textarea
                required
                rows={4}
                placeholder="Hello Aryan, I would love to connect regarding..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#0a0a0c] border border-white/20 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-primary-accent resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary-accent text-black font-display font-bold rounded-xl text-sm hover:opacity-90 active:scale-98 transition-all shadow-[0_0_20px_var(--primary-accent-glow)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 fill-black" />
              <span>Send Message</span>
            </button>

            {formSubmitted && (
              <div className="font-mono text-xs text-[#22c55e] text-center p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl animate-in fade-in flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Message prepared and transmitted successfully! Aryan will reply shortly.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
