import React, { useState } from 'react';
import { ExternalLink, Eye, ArrowUpRight, Check, Search, Download, BarChart2, Award, BookOpen, X } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ProjectsProps {
  onAddXp: (amount: number, reason: string) => void;
}

type Category = 'all' | 'data' | 'web' | 'tools';

interface Project {
  id: string;
  category: 'data' | 'web' | 'tools';
  categoryLabel: string;
  year: string;
  title: string;
  description: string;
  technologies: string[];
  demoType: 'certificate' | 'bookslet' | 'analytics';
  githubUrl: string;
}

export const Projects: React.FC<ProjectsProps> = ({ onAddXp }) => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Sandbox states
  const [certName, setCertName] = useState('Elena Rostova');
  const [certCourse, setCertCourse] = useState('Data Science Specialization');
  const [certGenerated, setCertGenerated] = useState(false);

  const [bookQuery, setBookQuery] = useState('');
  const [bookResults, setBookResults] = useState([
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', genre: 'Architecture', rating: '4.9/5' },
    { title: 'Python for Data Analysis', author: 'Wes McKinney', genre: 'Data Science', rating: '4.8/5' },
    { title: 'Hands-On Machine Learning', author: 'Aurélien Géron', genre: 'Machine Learning', rating: '4.9/5' },
  ]);

  const [analyticsParam, setAnalyticsParam] = useState<'correlation' | 'distribution' | 'outliers'>('correlation');

  const projects: Project[] = [
    {
      id: 'cert-maker',
      category: 'tools',
      categoryLabel: 'PYTHON & FLASK',
      year: '2024',
      title: 'Certificate Making Website',
      description:
        'A high-throughput web tool generating personalized, tamper-evident certificates in bulk from CSV data with automated PDF export.',
      technologies: ['Python', 'Flask', 'ReportLab'],
      demoType: 'certificate',
      githubUrl: 'https://github.com',
    },
    {
      id: 'bookslet',
      category: 'web',
      categoryLabel: 'JAVASCRIPT & REST API',
      year: '2024',
      title: 'Bookslet Smart Reader Hub',
      description:
        'Modern book exploration platform featuring search algorithms, genre indexing, and reading progress telemetry.',
      technologies: ['JavaScript', 'REST API', 'SQL'],
      demoType: 'bookslet',
      githubUrl: 'https://github.com',
    },
    {
      id: 'analytics-suite',
      category: 'data',
      categoryLabel: 'DATA SCIENCE & EDA',
      year: '2024',
      title: 'Predictive Analytics Suite',
      description:
        'Comprehensive data science workflow analyzing multi-variable datasets with EDA, outlier detection, and Seaborn visualizations.',
      technologies: ['Pandas', 'NumPy', 'Jupyter'],
      demoType: 'analytics',
      githubUrl: 'https://github.com',
    },
  ];

  const filteredProjects = projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  const openSandbox = (proj: Project) => {
    sounds.playClick();
    setActiveModalProject(proj);
    onAddXp(15, `Tested ${proj.title} sandbox`);
  };

  const closeSandbox = () => {
    sounds.playClick();
    setActiveModalProject(null);
  };

  return (
    <section className="py-24 px-6 border-t border-white/10 bg-[#121216]/40" id="projects">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
              // 04. FEATURED WORK
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">
              Projects &amp; Systems
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {(['all', 'data', 'web', 'tools'] as Category[]).map((cat) => {
              const labelMap: Record<Category, string> = {
                all: 'All',
                data: 'Data Science',
                web: 'Web Apps',
                tools: 'Tools',
              };
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sounds.playClick();
                    setActiveFilter(cat);
                  }}
                  className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary-accent text-black shadow-[0_0_15px_var(--primary-accent-glow)]'
                      : 'bg-[#121216] border border-white/10 text-[#a1a1aa] hover:border-primary-accent hover:text-white'
                  }`}
                >
                  {labelMap[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#121216] border border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-primary-accent/80 transition-all duration-200 group shadow-lg"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-primary-accent font-semibold">
                    {project.categoryLabel}
                  </span>
                  <span className="text-[#a1a1aa]">{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold text-white group-hover:text-primary-accent transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#0a0a0c] text-[#a1a1aa] rounded-full border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs">
                <button
                  onClick={() => openSandbox(project)}
                  className="text-primary-accent hover:underline flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  {project.category === 'data' ? (
                    <>
                      <span>View Notebook</span>
                      <Eye className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  className="text-[#a1a1aa] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== INTERACTIVE SANDBOX MODAL ===================== */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121216] border border-white/20 w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-primary-accent uppercase">
                  {activeModalProject.categoryLabel} // LIVE SANDBOX
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={closeSandbox}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Custom Interactive Sandbox per demoType */}
            <div className="p-6 overflow-y-auto space-y-6 font-mono text-xs">
              {/* 1. CERTIFICATE MAKER SANDBOX */}
              {activeModalProject.demoType === 'certificate' && (
                <div className="space-y-4">
                  <p className="text-[#a1a1aa]">
                    Test the Flask &amp; ReportLab certificate generation engine. Fill in candidate details to generate a verified, serial-tracked certificate.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#a1a1aa] block mb-1">Recipient Name</label>
                      <input
                        type="text"
                        value={certName}
                        onChange={(e) => setCertName(e.target.value)}
                        className="w-full bg-[#0a0a0c] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-accent font-sans text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[#a1a1aa] block mb-1">Curriculum / Program</label>
                      <input
                        type="text"
                        value={certCourse}
                        onChange={(e) => setCertCourse(e.target.value)}
                        className="w-full bg-[#0a0a0c] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-accent font-sans text-sm"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      setCertGenerated(true);
                      onAddXp(15, 'Generated verified sample certificate');
                    }}
                    className="w-full py-3 bg-primary-accent text-black font-display font-bold rounded-xl text-xs hover:opacity-90 active:scale-98 transition-all shadow-[0_0_15px_var(--primary-accent-glow)] cursor-pointer"
                  >
                    Generate Tamper-Evident Certificate
                  </button>

                  {/* Certificate Preview Card */}
                  <div className="p-6 bg-[#0a0a0c] border-2 border-primary-accent/40 rounded-2xl space-y-4 relative shadow-inner text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-primary-accent/10 border border-primary-accent/30 flex items-center justify-center text-primary-accent">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="font-display text-lg font-bold tracking-wider uppercase text-white">
                      Certificate of Achievement
                    </div>
                    <p className="text-[#a1a1aa] text-xs">This verifies that</p>
                    <div className="font-display text-2xl font-bold text-primary-accent">
                      {certName || 'Recipient Name'}
                    </div>
                    <p className="text-[#a1a1aa] text-xs">has successfully completed all rigorous modules of</p>
                    <div className="font-semibold text-white text-sm">{certCourse || 'Program Name'}</div>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-[#a1a1aa]">
                      <span>Issued: 2024-10-22</span>
                      <span>Serial: AG-JECRC-88921-VERIFIED</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. BOOKSLET SMART READER SANDBOX */}
              {activeModalProject.demoType === 'bookslet' && (
                <div className="space-y-4">
                  <p className="text-[#a1a1aa]">
                    Search through indexed digital books in Aryan&apos;s digital library engine using sub-50ms REST API retrieval.
                  </p>

                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-[#a1a1aa]" />
                    <input
                      type="text"
                      value={bookQuery}
                      onChange={(e) => setBookQuery(e.target.value)}
                      placeholder="Search by title, author, or discipline..."
                      className="w-full bg-[#0a0a0c] border border-white/20 rounded-xl pl-9 pr-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-primary-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    {bookResults
                      .filter(
                        (b) =>
                          !bookQuery ||
                          b.title.toLowerCase().includes(bookQuery.toLowerCase()) ||
                          b.author.toLowerCase().includes(bookQuery.toLowerCase())
                      )
                      .map((book, i) => (
                        <div
                          key={i}
                          className="p-3.5 bg-[#0a0a0c] border border-white/10 rounded-xl flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-primary-accent" />
                            <div>
                              <div className="text-white font-bold font-sans text-xs">{book.title}</div>
                              <div className="text-[11px] text-[#a1a1aa]">{book.author} · {book.genre}</div>
                            </div>
                          </div>
                          <span className="text-primary-accent font-bold">{book.rating}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 3. PREDICTIVE ANALYTICS NOTEBOOK SANDBOX */}
              {activeModalProject.demoType === 'analytics' && (
                <div className="space-y-4">
                  <p className="text-[#a1a1aa]">
                    Interactive exploratory data analysis (EDA) pipeline running statistical distributions, outlier quantiles, and Seaborn correlation matrix simulations.
                  </p>

                  <div className="flex gap-2">
                    {(['correlation', 'distribution', 'outliers'] as const).map((param) => (
                      <button
                        key={param}
                        onClick={() => {
                          sounds.playClick();
                          setAnalyticsParam(param);
                        }}
                        className={`px-3 py-1.5 rounded-lg capitalize font-mono text-xs cursor-pointer ${
                          analyticsParam === param
                            ? 'bg-primary-accent text-black font-bold'
                            : 'bg-[#0a0a0c] border border-white/10 text-[#a1a1aa]'
                        }`}
                      >
                        {param}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-[#0a0a0c] border border-white/10 rounded-xl space-y-3 font-mono text-xs">
                    <div className="text-[#22c55e]">
                      &gt;&gt; In [14]: eda_pipeline.render_summary(metric=&apos;{analyticsParam}&apos;)
                    </div>
                    {analyticsParam === 'correlation' && (
                      <div className="space-y-1 text-[#a1a1aa]">
                        <div>• Feature X1 (Telemetry Rate) ↔ Feature Y1 (Conversion): r = 0.892 (p &lt; 0.001)</div>
                        <div>• Latency ↔ Outlier Probability: r = -0.741</div>
                        <div>• Statistical Confidence: 99.4% (Pearson two-tailed)</div>
                      </div>
                    )}
                    {analyticsParam === 'distribution' && (
                      <div className="space-y-1 text-[#a1a1aa]">
                        <div>• Sample Count: n = 42,000 points</div>
                        <div>• Mean: μ = 142.34 ms | Std Dev: σ = 8.12 ms</div>
                        <div>• Skewness: 0.12 (Normal Gaussian fit)</div>
                      </div>
                    )}
                    {analyticsParam === 'outliers' && (
                      <div className="space-y-1 text-[#a1a1aa]">
                        <div>• IQR Filter: Q1 = 124.5, Q3 = 162.8</div>
                        <div>• Anomaly Threshold: 2.5σ isolated</div>
                        <div>• Auto-pruned 14 noisy spikes from batch stream</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={closeSandbox}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono transition-colors cursor-pointer"
                >
                  Close Sandbox
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
