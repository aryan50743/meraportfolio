import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Play, RefreshCw, Trophy, Zap, Brain, Keyboard, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface PlaygroundProps {
  onAddXp: (amount: number, reason: string) => void;
}

type GameTab = 'snake' | 'reaction' | 'memory' | 'typing';

export const Playground: React.FC<PlaygroundProps> = ({ onAddXp }) => {
  const [activeTab, setActiveTab] = useState<GameTab>('snake');

  // ===================== 1. SNAKE GAME STATE =====================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeHighScore, setSnakeHighScore] = useState(() => {
    return Number(localStorage.getItem('aryan_snake_highscore') || 0);
  });
  const [snakePlaying, setSnakePlaying] = useState(false);
  const snakeRef = useRef<{ x: number; y: number }[]>([{ x: 7, y: 7 }]);
  const foodRef = useRef<{ x: number; y: number }>({ x: 3, y: 3 });
  const dirRef = useRef<{ dx: number; dy: number }>({ dx: 1, dy: 0 });
  const loopRef = useRef<number | null>(null);

  const startSnake = () => {
    sounds.playClick();
    snakeRef.current = [{ x: 7, y: 7 }, { x: 6, y: 7 }];
    dirRef.current = { dx: 1, dy: 0 };
    setSnakeScore(0);
    setSnakePlaying(true);
    spawnFood();
    onAddXp(10, 'Started Snake Game');

    if (loopRef.current) clearInterval(loopRef.current);
    loopRef.current = window.setInterval(tickSnake, 110);
  };

  const spawnFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * 15),
      y: Math.floor(Math.random() * 15),
    };
    foodRef.current = newFood;
  };

  const tickSnake = () => {
    const head = {
      x: snakeRef.current[0].x + dirRef.current.dx,
      y: snakeRef.current[0].y + dirRef.current.dy,
    };

    // Collision check with walls
    if (head.x < 0 || head.x >= 15 || head.y < 0 || head.y >= 15) {
      handleGameOver();
      return;
    }

    // Collision check with self
    if (snakeRef.current.some((segment) => segment.x === head.x && segment.y === head.y)) {
      handleGameOver();
      return;
    }

    snakeRef.current.unshift(head);

    // Food collision
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      sounds.playEat();
      setSnakeScore((prev) => {
        const next = prev + 10;
        if (next > snakeHighScore) {
          setSnakeHighScore(next);
          localStorage.setItem('aryan_snake_highscore', String(next));
        }
        if (next % 30 === 0) {
          onAddXp(15, `Snake streak (${next} pts)`);
        }
        return next;
      });
      spawnFood();
    } else {
      snakeRef.current.pop();
    }

    drawSnake();
  };

  const handleGameOver = () => {
    if (loopRef.current) clearInterval(loopRef.current);
    setSnakePlaying(false);
    sounds.playGameOver();
  };

  const drawSnake = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, 300, 300);

    // Grid lines subtle
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 300; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 300);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(300, i);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#22c55e';
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.roundRect(foodRef.current.x * 20 + 2, foodRef.current.y * 20 + 2, 16, 16, 4);
    ctx.fill();

    // Snake
    ctx.shadowColor = 'var(--primary-accent)';
    ctx.shadowBlur = 6;
    snakeRef.current.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? 'var(--primary-accent)' : '#b3e600';
      ctx.beginPath();
      ctx.roundRect(seg.x * 20 + 1, seg.y * 20 + 1, 18, 18, 4);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'snake') return;
      const { dx, dy } = dirRef.current;
      if ((e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') && dy === 0) {
        e.preventDefault();
        dirRef.current = { dx: 0, dy: -1 };
      } else if ((e.key === 'ArrowDown' || e.key.toLowerCase() === 's') && dy === 0) {
        e.preventDefault();
        dirRef.current = { dx: 0, dy: 1 };
      } else if ((e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') && dx === 0) {
        e.preventDefault();
        dirRef.current = { dx: -1, dy: 0 };
      } else if ((e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') && dx === 0) {
        e.preventDefault();
        dirRef.current = { dx: 1, dy: 0 };
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'snake') {
      drawSnake();
    }
  }, [activeTab]);

  // ===================== 2. REACTION TEST STATE =====================
  const [reactionState, setReactionState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestReaction, setBestReaction] = useState<number | null>(() => {
    const saved = localStorage.getItem('aryan_best_reaction');
    return saved ? Number(saved) : null;
  });
  const reactionTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const handleReactionClick = () => {
    if (reactionState === 'idle' || reactionState === 'result') {
      sounds.playClick();
      setReactionState('waiting');
      const delay = 1200 + Math.random() * 2500;
      reactionTimerRef.current = window.setTimeout(() => {
        setReactionState('ready');
        startTimeRef.current = performance.now();
        sounds.playTone(880, 'sine', 0.1, 0.15);
      }, delay);
    } else if (reactionState === 'waiting') {
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
      setReactionState('idle');
      sounds.playGameOver();
      alert('Too soon! Wait for green.');
    } else if (reactionState === 'ready') {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setReactionState('result');
      sounds.playSuccess();
      onAddXp(20, `Reaction speed: ${elapsed}ms`);

      if (!bestReaction || elapsed < bestReaction) {
        setBestReaction(elapsed);
        localStorage.setItem('aryan_best_reaction', String(elapsed));
      }
    }
  };

  // ===================== 3. MEMORY MATCH STATE =====================
  const memoryIcons = ['💻', '🐍', '📊', '⚡'];
  const [memoryCards, setMemoryCards] = useState<Array<{ id: number; symbol: string; flipped: boolean; matched: boolean }>>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const initMemoryGame = () => {
    sounds.playClick();
    const deck = [...memoryIcons, ...memoryIcons]
      .sort(() => Math.random() - 0.5)
      .map((symbol, id) => ({
        id,
        symbol,
        flipped: false,
        matched: false,
      }));
    setMemoryCards(deck);
    setFlippedIndices([]);
    setMemoryMoves(0);
    setMatchedPairs(0);
  };

  useEffect(() => {
    if (activeTab === 'memory' && memoryCards.length === 0) {
      initMemoryGame();
    }
  }, [activeTab]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length >= 2 || memoryCards[index].flipped || memoryCards[index].matched) return;

    sounds.playKeypress();
    const newCards = [...memoryCards];
    newCards[index].flipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (newCards[firstIdx].symbol === newCards[secondIdx].symbol) {
        // Matched
        setTimeout(() => {
          sounds.playEat();
          const matchedState = [...newCards];
          matchedState[firstIdx].matched = true;
          matchedState[secondIdx].matched = true;
          setMemoryCards(matchedState);
          setFlippedIndices([]);
          setMatchedPairs((p) => {
            const next = p + 1;
            if (next === 4) {
              sounds.playSuccess();
              onAddXp(25, 'Memory Match Completed!');
            }
            return next;
          });
        }, 300);
      } else {
        // Not matched
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIdx].flipped = false;
          resetCards[secondIdx].flipped = false;
          setMemoryCards(resetCards);
          setFlippedIndices([]);
        }, 750);
      }
    }
  };

  // ===================== 4. TYPING CHALLENGE STATE =====================
  const snippets = [
    'import numpy as np; data = np.array([1, 2, 3]); print(data.mean())',
    'import pandas as pd; df = pd.read_csv("telemetry.csv"); df.describe()',
    'from sklearn.ensemble import RandomForestClassifier; model.fit(X, y)',
  ];
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingStart, setTypingStart] = useState<number | null>(null);
  const [typingWpm, setTypingWpm] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);
  const [typingComplete, setTypingComplete] = useState(false);

  const targetSnippet = snippets[snippetIdx];

  const handleTypingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypedText(val);

    if (!typingStart && val.length > 0) {
      setTypingStart(performance.now());
    }

    sounds.playKeypress();

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetSnippet[i]) correctChars++;
    }
    const acc = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setTypingAccuracy(acc);

    // Calculate WPM
    if (typingStart) {
      const minutes = (performance.now() - typingStart) / 60000;
      const words = val.length / 5;
      setTypingWpm(Math.round(words / Math.max(minutes, 0.01)));
    }

    // Check completion
    if (val === targetSnippet) {
      sounds.playSuccess();
      setTypingComplete(true);
      onAddXp(30, 'Typing Challenge Mastered!');
    }
  };

  const resetTyping = (nextSnippet = false) => {
    sounds.playClick();
    if (nextSnippet) {
      setSnippetIdx((prev) => (prev + 1) % snippets.length);
    }
    setTypedText('');
    setTypingStart(null);
    setTypingWpm(0);
    setTypingAccuracy(100);
    setTypingComplete(false);
  };

  return (
    <section className="py-24 px-6 border-t border-white/10" id="playground">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
              // 01. INTERACTIVE ARCADE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">
              The Playground
            </h2>
          </div>

          {/* Game Tabs */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('snake');
              }}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'snake'
                  ? 'bg-primary-accent text-black shadow-[0_0_15px_var(--primary-accent-glow)]'
                  : 'bg-[#121216] border border-white/10 text-[#a1a1aa] hover:border-primary-accent hover:text-white'
              }`}
            >
              Snake Game
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('reaction');
              }}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'reaction'
                  ? 'bg-primary-accent text-black shadow-[0_0_15px_var(--primary-accent-glow)]'
                  : 'bg-[#121216] border border-white/10 text-[#a1a1aa] hover:border-primary-accent hover:text-white'
              }`}
            >
              Reaction Test
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('memory');
              }}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'memory'
                  ? 'bg-primary-accent text-black shadow-[0_0_15px_var(--primary-accent-glow)]'
                  : 'bg-[#121216] border border-white/10 text-[#a1a1aa] hover:border-primary-accent hover:text-white'
              }`}
            >
              Memory Match
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('typing');
              }}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'typing'
                  ? 'bg-primary-accent text-black shadow-[0_0_15px_var(--primary-accent-glow)]'
                  : 'bg-[#121216] border border-white/10 text-[#a1a1aa] hover:border-primary-accent hover:text-white'
              }`}
            >
              Typing Challenge
            </button>
          </div>
        </div>

        {/* Main Arcade Arena Container */}
        <div className="bg-[#121216] border border-white/10 rounded-3xl p-6 sm:p-10 min-h-[460px] flex flex-col items-center justify-center relative shadow-2xl">
          {/* ==================== VIEW 1: SNAKE ==================== */}
          {activeTab === 'snake' && (
            <div className="w-full max-w-md flex flex-col items-center space-y-4">
              <div className="flex justify-between items-center w-full font-mono text-sm px-2">
                <span className="text-[#a1a1aa]">
                  Score: <strong className="text-primary-accent tabular-nums">{snakeScore}</strong>
                </span>
                <span className="text-[#a1a1aa] flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-primary-accent" />
                  High Score: <strong className="text-primary-accent tabular-nums">{snakeHighScore}</strong>
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-inner bg-[#0a0a0c]">
                <canvas ref={canvasRef} width={300} height={300} className="block" />
                {!snakePlaying && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
                    <p className="font-display text-lg font-bold text-white mb-2">
                      {snakeScore > 0 ? `Game Over! Score: ${snakeScore}` : 'Ready to Slither?'}
                    </p>
                    <button
                      onClick={startSnake}
                      className="px-6 py-2.5 bg-primary-accent text-black font-display font-bold rounded-xl text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_20px_var(--primary-accent-glow)] cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-black" />
                      {snakeScore > 0 ? 'Play Again' : 'Start Snake'}
                    </button>
                  </div>
                )}
              </div>

              {snakePlaying && (
                <div className="flex gap-3">
                  <button
                    onClick={startSnake}
                    className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Restart
                  </button>
                </div>
              )}

              <p className="font-mono text-xs text-[#a1a1aa] text-center">
                Use Arrow Keys or WASD to control the snake. (+10 XP to start)
              </p>
            </div>
          )}

          {/* ==================== VIEW 2: REACTION TEST ==================== */}
          {activeTab === 'reaction' && (
            <div className="w-full max-w-md flex flex-col items-center space-y-6 text-center">
              <div
                onClick={handleReactionClick}
                className={`w-full h-64 rounded-2xl flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-150 border ${
                  reactionState === 'idle'
                    ? 'bg-[#0a0a0c] border-white/20 hover:border-primary-accent'
                    : reactionState === 'waiting'
                    ? 'bg-red-950/80 border-red-500/50'
                    : reactionState === 'ready'
                    ? 'bg-emerald-600 border-emerald-400 shadow-[0_0_35px_#22c55e]'
                    : 'bg-[#0a0a0c] border-primary-accent'
                }`}
              >
                <Zap
                  className={`w-8 h-8 mb-2 ${
                    reactionState === 'ready'
                      ? 'text-white animate-bounce'
                      : 'text-primary-accent'
                  }`}
                />
                <span className="font-display text-2xl font-bold text-white px-4">
                  {reactionState === 'idle' && 'Click here to start'}
                  {reactionState === 'waiting' && 'Wait for green...'}
                  {reactionState === 'ready' && 'CLICK NOW!'}
                  {reactionState === 'result' && `${reactionTime} ms!`}
                </span>
                <span className="font-mono text-xs text-[#a1a1aa] mt-2">
                  {reactionState === 'idle' && 'Test your visual neural reflex speed'}
                  {reactionState === 'waiting' && 'Do not click yet!'}
                  {reactionState === 'ready' && 'Lightning reflex required!'}
                  {reactionState === 'result' && 'Click anywhere to test again'}
                </span>
              </div>

              <div className="flex justify-between items-center w-full font-mono text-sm px-2">
                <span className="text-[#a1a1aa]">
                  Current: <strong className="text-white">{reactionTime ? `${reactionTime} ms` : '--'}</strong>
                </span>
                <span className="text-[#a1a1aa] flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-primary-accent" />
                  Best Reflex:{' '}
                  <strong className="text-primary-accent tabular-nums">
                    {bestReaction ? `${bestReaction} ms` : '--'}
                  </strong>
                </span>
              </div>
            </div>
          )}

          {/* ==================== VIEW 3: MEMORY MATCH ==================== */}
          {activeTab === 'memory' && (
            <div className="w-full max-w-md flex flex-col items-center space-y-5">
              <div className="flex justify-between items-center w-full font-mono text-sm px-2">
                <span className="text-[#a1a1aa]">
                  Moves: <strong className="text-primary-accent tabular-nums">{memoryMoves}</strong>
                </span>
                <span className="text-[#a1a1aa]">
                  Pairs: <strong className="text-white tabular-nums">{matchedPairs} / 4</strong>
                </span>
                <button
                  onClick={initMemoryGame}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3.5 w-full">
                {memoryCards.map((card, idx) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(idx)}
                    disabled={card.matched || card.flipped}
                    className={`h-20 rounded-2xl flex items-center justify-center text-3xl font-display transition-all duration-300 transform select-none cursor-pointer border ${
                      card.matched
                        ? 'bg-primary-accent/10 border-primary-accent/60 shadow-[0_0_15px_var(--primary-accent-glow)]'
                        : card.flipped
                        ? 'bg-[#1a1a20] border-primary-accent scale-105'
                        : 'bg-[#0a0a0c] border-white/20 hover:border-primary-accent hover:scale-[1.02]'
                    }`}
                  >
                    {card.flipped || card.matched ? card.symbol : '?'}
                  </button>
                ))}
              </div>

              {matchedPairs === 4 && (
                <div className="p-3 bg-primary-accent/10 border border-primary-accent/30 rounded-xl text-primary-accent font-mono text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Memory grid solved in {memoryMoves} moves! +25 XP awarded</span>
                </div>
              )}
            </div>
          )}

          {/* ==================== VIEW 4: TYPING CHALLENGE ==================== */}
          {activeTab === 'typing' && (
            <div className="w-full max-w-lg flex flex-col items-center space-y-4">
              <div className="w-full flex items-center justify-between font-mono text-xs text-[#a1a1aa] px-1">
                <span>Code Snippet #{snippetIdx + 1}</span>
                <button
                  onClick={() => resetTyping(true)}
                  className="text-primary-accent hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Next Snippet →
                </button>
              </div>

              <div className="w-full font-mono text-sm p-4 bg-[#0a0a0c] rounded-2xl border border-white/10 text-[#a1a1aa] break-all leading-relaxed select-none">
                {targetSnippet.split('').map((char, i) => {
                  let color = 'text-[#a1a1aa]';
                  if (i < typedText.length) {
                    color = typedText[i] === char ? 'text-primary-accent' : 'text-red-400 bg-red-950/60';
                  }
                  return (
                    <span key={i} className={color}>
                      {char}
                    </span>
                  );
                })}
              </div>

              <input
                type="text"
                value={typedText}
                onChange={handleTypingInput}
                disabled={typingComplete}
                placeholder="Type the code snippet above accurately..."
                className="w-full bg-[#0a0a0c] border border-white/20 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-primary-accent transition-colors"
                autoComplete="off"
                spellCheck="false"
              />

              <div className="flex justify-between items-center w-full font-mono text-xs text-[#a1a1aa] px-2">
                <span>
                  Speed: <strong className="text-primary-accent tabular-nums text-sm">{typingWpm}</strong> WPM
                </span>
                <span>
                  Accuracy: <strong className="text-white tabular-nums text-sm">{typingAccuracy}%</strong>
                </span>
                <button
                  onClick={() => resetTyping(false)}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {typingComplete && (
                <div className="p-3 bg-primary-accent/10 border border-primary-accent/30 rounded-xl text-primary-accent font-mono text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Snippet completed at {typingWpm} WPM! +30 XP added to your telemetry.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
