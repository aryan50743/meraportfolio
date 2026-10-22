import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface TerminalProps {
  onOpenResume: () => void;
  onSetThemeAccent: (color: string) => void;
  xp: number;
  onAddXp: (amount: number, reason: string) => void;
  isAudioMuted: boolean;
  onToggleAudio: (explicit?: boolean) => void;
}

interface CommandLog {
  id: string;
  command?: string;
  output: React.ReactNode;
}

export const Terminal: React.FC<TerminalProps> = ({
  onOpenResume,
  onSetThemeAccent,
  xp,
  onAddXp,
  isAudioMuted,
  onToggleAudio,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'welcome',
      output: (
        <div className="space-y-1 text-[#a1a1aa]">
          <div>
            Welcome to Aryan&apos;s interactive developer CLI.
          </div>
          <div>
            Type <span className="text-primary-accent font-bold">&apos;help&apos;</span> to inspect all available system directives.
          </div>
        </div>
      ),
    },
  ]);

  const outputEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || '');
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const raw = inputVal.trim();
      if (!raw) return;

      sounds.playClick();
      setHistory((prev) => [...prev, raw]);
      setHistoryIndex(-1);
      setInputVal('');

      const parts = raw.split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts[1]?.toLowerCase();

      // Clear directive
      if (cmd === 'clear') {
        setLogs([]);
        return;
      }

      let outputNode: React.ReactNode = null;

      switch (cmd) {
        case 'help':
          outputNode = (
            <div className="space-y-1.5 text-xs text-[#a1a1aa]">
              <div className="text-white font-bold mb-1">Available System Directives:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono">
                <div><span className="text-primary-accent">about</span> - Background &amp; profile summary</div>
                <div><span className="text-primary-accent">skills</span> - Technical competencies</div>
                <div><span className="text-primary-accent">projects</span> - Production work &amp; tools</div>
                <div><span className="text-primary-accent">education</span> - Academic credentials</div>
                <div><span className="text-primary-accent">contact</span> - Email &amp; social connectivity</div>
                <div><span className="text-primary-accent">neofetch</span> - Render system telemetry</div>
                <div><span className="text-primary-accent">theme [color]</span> - lime | green | blue | pink</div>
                <div><span className="text-primary-accent">resume</span> - Open complete curriculum vitae</div>
                <div><span className="text-primary-accent">play</span> - Jump to Arcade Playground</div>
                <div><span className="text-primary-accent">xp</span> - Inspect telemetry rank</div>
                <div><span className="text-primary-accent">date</span> - Real-time Jaipur timestamp</div>
                <div><span className="text-primary-accent">sound [on|off]</span> - Toggle audio effects</div>
                <div><span className="text-primary-accent">clear</span> - Flush terminal buffer</div>
              </div>
            </div>
          );
          onAddXp(5, 'Explored terminal commands');
          break;

        case 'about':
          outputNode = (
            <div className="space-y-1 text-xs text-[#a1a1aa]">
              <p className="text-white font-semibold">Aryan Gothwal — Data Science Graduate &amp; Developer</p>
              <p>Based in Jaipur, India. Specializes in Python algorithmic engineering, automated PDF/credential dispatchers, and reactive web telemetry.</p>
              <p className="text-primary-accent">Passionate about converting messy data into high-throughput systems.</p>
            </div>
          );
          break;

        case 'skills':
          outputNode = (
            <div className="space-y-1 text-xs text-[#a1a1aa]">
              <p className="text-white font-semibold">Technical Arsenal:</p>
              <p>• <span className="text-primary-accent">Python:</span> Pandas, NumPy, Scikit-learn, Flask, ReportLab</p>
              <p>• <span className="text-primary-accent">Web / JS:</span> React, TypeScript, TailwindCSS, HTML5 Canvas, REST APIs</p>
              <p>• <span className="text-primary-accent">Databases:</span> PostgreSQL, MySQL, SQLite, Data Modeling</p>
              <p>• <span className="text-primary-accent">Tooling:</span> Git, GitHub, Jupyter Notebook, Linux / Bash, Postman</p>
            </div>
          );
          break;

        case 'projects':
          outputNode = (
            <div className="space-y-1.5 text-xs text-[#a1a1aa]">
              <div className="text-white font-semibold">Featured Systems:</div>
              <div>1. <span className="text-primary-accent font-bold">Certificate Making Website</span> - High-throughput bulk certificate generator with automated PDF creation.</div>
              <div>2. <span className="text-primary-accent font-bold">Bookslet Smart Reader Hub</span> - Digital library engine with search indexing &amp; reading analytics.</div>
              <div>3. <span className="text-primary-accent font-bold">Predictive Analytics Suite</span> - Multi-variable exploratory data science pipelines.</div>
            </div>
          );
          break;

        case 'education':
          outputNode = (
            <div className="space-y-1 text-xs text-[#a1a1aa]">
              <p className="text-white font-semibold">Bachelor of Computer Applications (BCA)</p>
              <p>Specialization: Data Science</p>
              <p>Alma Mater: JECRC University, Jaipur (2021 – 2024)</p>
              <p className="text-primary-accent">Focus: Statistical computing, algorithm architecture, database engineering.</p>
            </div>
          );
          break;

        case 'contact':
          outputNode = (
            <div className="space-y-1 text-xs text-[#a1a1aa]">
              <p>Direct Email: <span className="text-primary-accent font-mono">aryangothwal6@gmail.com</span></p>
              <p>GitHub: <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white underline">github.com</a></p>
              <p>LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white underline">linkedin.com</a></p>
              <p>Location: Jaipur, Rajasthan, India</p>
            </div>
          );
          break;

        case 'neofetch':
        case 'fetch':
          outputNode = (
            <div className="font-mono text-xs text-[#a1a1aa] flex flex-col sm:flex-row gap-4 items-start py-1">
              <pre className="text-primary-accent leading-tight select-none">
{`   _____   ______ 
  /  _  \\ /  ___/ 
 /  /_\\  \\\\___ \\  
/    |    \\____ \\ 
\\____|__  /_____ >
        \\/      \\/ `}
              </pre>
              <div className="space-y-0.5">
                <div><span className="text-white font-bold">aryan@portfolio-terminal</span></div>
                <div className="text-[#a1a1aa]">-------------------------</div>
                <div><span className="text-primary-accent font-semibold">OS:</span> AryanLab OS v2.4 (x86_64)</div>
                <div><span className="text-primary-accent font-semibold">Host:</span> JECRC Data Science Engine</div>
                <div><span className="text-primary-accent font-semibold">Kernel:</span> 6.12.0-custom-python</div>
                <div><span className="text-primary-accent font-semibold">Uptime:</span> 3 years (2021–2024 Graduation)</div>
                <div><span className="text-primary-accent font-semibold">Packages:</span> 18 (Flask, Pandas, NumPy, React, Vite)</div>
                <div><span className="text-primary-accent font-semibold">Shell:</span> bash 5.2.15</div>
                <div><span className="text-primary-accent font-semibold">Memory:</span> 512MB / 16384MB</div>
              </div>
            </div>
          );
          onAddXp(15, 'Discovered neofetch');
          break;

        case 'theme':
          if (arg === 'lime' || arg === '#ccff00') {
            onSetThemeAccent('#ccff00');
            outputNode = <span className="text-emerald-400">Accent updated to Volt Lime (#ccff00).</span>;
          } else if (arg === 'green' || arg === '#22c55e') {
            onSetThemeAccent('#22c55e');
            outputNode = <span className="text-emerald-400">Accent updated to Emerald Green (#22c55e).</span>;
          } else if (arg === 'blue' || arg === '#3b82f6') {
            onSetThemeAccent('#3b82f6');
            outputNode = <span className="text-blue-400">Accent updated to Electric Blue (#3b82f6).</span>;
          } else if (arg === 'pink' || arg === '#ec4899') {
            onSetThemeAccent('#ec4899');
            outputNode = <span className="text-pink-400">Accent updated to Hot Pink (#ec4899).</span>;
          } else {
            outputNode = (
              <span className="text-yellow-400">
                Usage: theme [lime | green | blue | pink]
              </span>
            );
          }
          break;

        case 'resume':
        case 'cv':
          sounds.playSuccess();
          onOpenResume();
          outputNode = <span className="text-primary-accent">Launching Curriculum Vitae modal...</span>;
          break;

        case 'play':
        case 'game':
        case 'snake':
          document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
          outputNode = <span className="text-primary-accent">Navigating to The Playground...</span>;
          break;

        case 'xp':
          outputNode = (
            <div className="text-xs text-[#a1a1aa]">
              Current XP: <strong className="text-primary-accent">{xp} points</strong> (Level {Math.floor(xp / 100) + 1})
            </div>
          );
          break;

        case 'date':
          outputNode = (
            <span className="text-xs text-[#a1a1aa]">
              {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST - Jaipur, India)
            </span>
          );
          break;

        case 'sound':
        case 'audio':
          if (arg === 'on' || arg === 'enable') {
            onToggleAudio(false);
            outputNode = <span className="text-emerald-400">Audio sound effects enabled (persisted to localStorage).</span>;
          } else if (arg === 'off' || arg === 'mute' || arg === 'disable') {
            onToggleAudio(true);
            outputNode = <span className="text-yellow-400">Audio sound effects muted (persisted to localStorage).</span>;
          } else if (arg === 'toggle') {
            onToggleAudio();
            outputNode = (
              <span className="text-primary-accent">
                Audio sound effects toggled to {isAudioMuted ? 'ENABLED' : 'MUTED'}.
              </span>
            );
          } else {
            outputNode = (
              <div className="space-y-1 text-xs">
                <div>
                  Global Audio Status:{' '}
                  <strong className={isAudioMuted ? 'text-red-400' : 'text-emerald-400'}>
                    {isAudioMuted ? 'MUTED' : 'ENABLED'}
                  </strong>
                </div>
                <div className="text-[#a1a1aa]">
                  Usage: <span className="text-primary-accent">sound on</span> |{' '}
                  <span className="text-primary-accent">sound off</span> |{' '}
                  <span className="text-primary-accent">sound toggle</span>
                </div>
              </div>
            );
          }
          break;

        case 'sudo':
          outputNode = (
            <span className="text-red-400 text-xs">
              Nice try! guest is not in the sudoers file. This incident will be reported.
            </span>
          );
          break;

        case 'echo':
          outputNode = <span className="text-xs text-white">{parts.slice(1).join(' ')}</span>;
          break;

        case 'matrix':
          outputNode = (
            <div className="text-emerald-500 font-mono text-xs animate-pulse">
              Wake up, Neo... The Matrix has you. Follow the white rabbit. 01000001 01010010 01011001 01000001 01001110
            </div>
          );
          onAddXp(10, 'Triggered Matrix protocol');
          break;

        default:
          outputNode = (
            <span className="text-red-400/90 text-xs">
              bash: command not found: {cmd}. Type &apos;<span className="text-primary-accent">help</span>&apos; to view all directives.
            </span>
          );
          break;
      }

      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          command: raw,
          output: outputNode,
        },
      ]);
    }
  };

  return (
    <section className="py-24 px-6 border-t border-white/10 bg-[#121216]/40" id="terminal">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
            // 02. DEV INTERFACE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">
            Interactive Terminal
          </h2>
        </div>

        {/* Terminal Window Box */}
        <div className="bg-[#0a0a0c] border border-white/20 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
          {/* Top Window Bar */}
          <div className="bg-[#121216] px-4 py-3 border-b border-white/10 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="text-[#a1a1aa] ml-2 font-mono text-xs">
                bash - aryan@portfolio:~
              </span>
            </div>
            <span className="text-[#a1a1aa] hidden sm:inline text-[11px]">
              Type &apos;help&apos; for commands
            </span>
          </div>

          {/* Terminal Console Buffer */}
          <div className="p-6 h-80 overflow-y-auto space-y-3 font-mono text-xs leading-relaxed">
            {logs.map((log) => (
              <div key={log.id} className="space-y-1">
                {log.command && (
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-primary-accent font-bold">guest@aryan:~$</span>
                    <span>{log.command}</span>
                  </div>
                )}
                <div>{log.output}</div>
              </div>
            ))}
            <div ref={outputEndRef} />
          </div>

          {/* Active Command Input Line */}
          <div className="p-4 bg-[#121216] border-t border-white/10 flex items-center gap-2">
            <span className="text-primary-accent font-bold shrink-0">guest@aryan:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                sounds.playKeypress();
                setInputVal(e.target.value);
              }}
              onKeyDown={handleCommand}
              placeholder="type 'help', 'neofetch', 'projects', 'resume'..."
              className="w-full bg-transparent border-none text-[#f4f4f5] focus:outline-none font-mono text-xs"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
