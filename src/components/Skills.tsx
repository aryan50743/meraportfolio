import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code2, Database, Globe, Cpu } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SkillItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  summary: string;
  proficiency: number;
  tools: string[];
}

interface SkillsProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onAddXp }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const skills: SkillItem[] = [
    {
      id: 'python',
      name: 'PYTHON',
      icon: <Code2 className="w-4 h-4 text-primary-accent" />,
      summary: 'Advanced data wrangling, Pandas, NumPy, and Flask micro-services.',
      proficiency: 95,
      tools: ['Jupyter', 'Poetry', 'Matplotlib', 'Scikit-learn'],
    },
    {
      id: 'javascript',
      name: 'JAVASCRIPT',
      icon: <Cpu className="w-4 h-4 text-primary-accent" />,
      summary: 'ES6+, DOM manipulation, canvas game rendering, and REST APIs.',
      proficiency: 88,
      tools: ['Node.js', 'Vite', 'React', 'Web Audio API'],
    },
    {
      id: 'sql',
      name: 'SQL & DATABASES',
      icon: <Database className="w-4 h-4 text-primary-accent" />,
      summary: 'Relational modeling, complex queries, PostgreSQL and MySQL.',
      proficiency: 85,
      tools: ['pgAdmin', 'SQLite', 'PostgreSQL', 'Drizzle'],
    },
    {
      id: 'web',
      name: 'WEB & TAILWIND',
      icon: <Globe className="w-4 h-4 text-primary-accent" />,
      summary: 'Semantic HTML5, responsive CSS grids, and Tailwind utility classes.',
      proficiency: 92,
      tools: ['PostCSS', 'Figma', 'Responsive Grids', 'UI/UX'],
    },
  ];

  const toggleSkill = (id: string) => {
    sounds.playClick();
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      onAddXp(5, `Inspected ${id} skill details`);
    }
  };

  return (
    <section className="py-24 px-6 border-t border-white/10 bg-[#121216]/40" id="skills">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
            // 06. TECHNICAL ARSENAL
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">
            Interactive Skills Matrix
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => {
            const isExpanded = expandedId === skill.id;
            return (
              <div
                key={skill.id}
                onClick={() => toggleSkill(skill.id)}
                className={`bg-[#121216] border rounded-2xl p-6 cursor-pointer transition-all duration-200 space-y-4 select-none ${
                  isExpanded
                    ? 'border-primary-accent shadow-[0_0_20px_var(--primary-accent-glow)] scale-[1.02]'
                    : 'border-white/10 hover:border-primary-accent/60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {skill.icon}
                    <span className="font-mono text-primary-accent font-bold tracking-wider text-sm">
                      {skill.name}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-primary-accent" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#a1a1aa]" />
                  )}
                </div>

                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  {skill.summary}
                </p>

                {/* Expandable Accordion Panel */}
                {isExpanded && (
                  <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-[#a1a1aa] space-y-2.5 animate-in fade-in duration-150">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Proficiency</span>
                        <span className="text-primary-accent font-bold">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#0a0a0c] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-accent"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-1">
                      <span className="text-white block mb-1">Tooling:</span>
                      <div className="flex flex-wrap gap-1">
                        {skill.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-0.5 bg-[#0a0a0c] text-[10px] rounded border border-white/5 text-[#f4f4f5]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
