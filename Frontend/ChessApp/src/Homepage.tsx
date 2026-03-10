import { useState, useEffect, useRef } from "react";
import "./Homepage.css";

const BOARD_SIZE = 8;

const INITIAL_PIECES: Record<string, string> = {
  "0,0": "♜", "1,0": "♞", "2,0": "♝", "3,0": "♛", "4,0": "♚", "5,0": "♝", "6,0": "♞", "7,0": "♜",
  "0,1": "♟", "1,1": "♟", "2,1": "♟", "3,1": "♟", "4,1": "♟", "5,1": "♟", "6,1": "♟", "7,1": "♟",
  "0,6": "♙", "1,6": "♙", "2,6": "♙", "3,6": "♙", "4,6": "♙", "5,6": "♙", "6,6": "♙", "7,6": "♙",
  "0,7": "♖", "1,7": "♘", "2,7": "♗", "3,7": "♕", "4,7": "♔", "5,7": "♗", "6,7": "♘", "7,7": "♖",
};

const DEMO_MOVES = [
  { from: [4, 6], to: [4, 4] },
  { from: [4, 1], to: [4, 3] },
  { from: [3, 7], to: [7, 3] },
  { from: [6, 0], to: [5, 2] },
  { from: [5, 7], to: [2, 4] },
  { from: [3, 0], to: [7, 4] },
];

const NAV_LINKS = ["Model", "Engine", "Docs", "Leaderboard", "About"];

const STATS = [
  { value: "—", label: "ELO Rating" },
  { value: "—", label: "Model Parameters" },
  { value: "—", label: "Games Trained" },
  { value: "—", label: "Win Rate" },
];

const FEATURES = [
  {
    icon: "◈",
    title: "Neural Evaluation",
    desc: "Deep network position evaluation trained on millions of grandmaster games.",
  },
  {
    icon: "⟁",
    title: "Monte Carlo Search",
    desc: "MCTS-guided lookahead with learned policy priors for efficient tree exploration.",
  },
  {
    icon: "⬡",
    title: "Self-Play Training",
    desc: "Continuously improving through reinforcement learning and self-play iterations.",
  },
  {
    icon: "◎",
    title: "Opening Book",
    desc: "Curated opening repertoire merged with neural play for balanced early-game strategy.",
  },
];

export default function Homepage() {
  const [pieces, setPieces] = useState<Record<string, string>>({ ...INITIAL_PIECES });
  const [highlighted, setHighlighted] = useState<[number, number][]>([]);
  const [moveIndex, setMoveIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const move = DEMO_MOVES[moveIndex % DEMO_MOVES.length];
      const [fx, fy] = move.from;
      const [tx, ty] = move.to;
      const key = `${fx},${fy}`;
      const piece = pieces[key];
      if (piece) {
        setPieces((prev) => {
          const next = { ...prev };
          delete next[key];
          next[`${tx},${ty}`] = piece;
          return next;
        });
        setHighlighted([[fx, fy], [tx, ty]]);
        setTimeout(() => setHighlighted([]), 800);
      }
      setMoveIndex((i) => i + 1);
    }, 2200);
    return () => clearInterval(interval);
  }, [moveIndex, pieces]);

  const isHighlighted = (x: number, y: number) =>
    highlighted.some(([hx, hy]) => hx === x && hy === y);

  return (
    <div className="chess-root">
      <div className="chess-noise" />

      {/* Nav */}
      <nav className="chess-nav">
        <div className="chess-nav-inner">
          <div className="chess-logo">
            <span className="chess-logo-king">♚</span>
            <span className="chess-logo-text">NEURALCHESS</span>
          </div>
          <div className="chess-nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="chess-nav-link">
                {link}
              </a>
            ))}
          </div>
          <button className="chess-nav-cta">Play Engine →</button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="chess-hero">
        <div className="chess-grid-lines" />
        <div className="chess-hero-content">

          {/* Left: Text */}
          <div className="chess-hero-text">
            <div className="chess-badge">
              <span className="chess-badge-dot" />
              ML Engine · Version —
            </div>
            <h1 className="chess-headline">
              <span className="chess-headline-light">Think</span>
              <br />
              <span className="chess-headline-bold">Deeper.</span>
              <br />
              <span className="chess-headline-accent">Play Better.</span>
            </h1>
            <p className="chess-subheadline">
              A machine learning chess engine built on deep neural evaluation and
              Monte Carlo tree search. Trained from scratch, refined through self-play.
            </p>
            <div className="chess-cta-group">
              <button className="chess-btn-primary">Challenge the Engine</button>
              <button className="chess-btn-secondary">View Architecture →</button>
            </div>
            <div className="chess-stats-row">
              {STATS.map((s) => (
                <div key={s.label} className="chess-stat-item">
                  <span className="chess-stat-value">{s.value}</span>
                  <span className="chess-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chess Board */}
          <div className="chess-board-wrap">
            <div className="chess-board-glow" />
            <div className="chess-board-container">
              <div className="chess-rank-labels">
                {[8, 7, 6, 5, 4, 3, 2, 1].map((r) => (
                  <span key={r} className="chess-rank-label">{r}</span>
                ))}
              </div>
              <div>
                {Array.from({ length: BOARD_SIZE }, (_, row) => (
                  <div key={row} className="chess-board-row">
                    {Array.from({ length: BOARD_SIZE }, (_, col) => {
                      const isLight = (row + col) % 2 === 0;
                      const piece = pieces[`${col},${row}`];
                      const isHl = isHighlighted(col, row);
                      const isBlackPiece = "♜♞♝♛♚♟".includes(piece ?? "");

                      return (
                        <div
                          key={col}
                          className="chess-cell"
                          style={{
                            background: isHl
                              ? "rgba(212, 175, 55, 0.55)"
                              : isLight
                              ? "rgba(240, 217, 181, 0.12)"
                              : "rgba(181, 136, 99, 0.15)",
                            boxShadow: isHl ? "inset 0 0 0 2px #D4AF37" : "none",
                          }}
                        >
                          {piece && (
                            <span
                              className="chess-piece"
                              style={{
                                color: isBlackPiece ? "#e8e0d0" : "#ffffff",
                                textShadow: isBlackPiece
                                  ? "0 0 8px rgba(232,224,208,0.3)"
                                  : "0 0 10px rgba(212,175,55,0.5)",
                                filter: isHl ? "brightness(1.4)" : "none",
                                transform: isHl ? "scale(1.15)" : "scale(1)",
                              }}
                            >
                              {piece}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div className="chess-file-labels">
                  {["a", "b", "c", "d", "e", "f", "g", "h"].map((f) => (
                    <span key={f} className="chess-file-label">{f}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="chess-board-caption">
              <span className="chess-board-caption-dot" />
              Live engine demo — self-play
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="chess-features">
        <div className="chess-features-inner">
          <div className="chess-section-label">ARCHITECTURE</div>
          <h2 className="chess-section-title">How it thinks</h2>
          <div className="chess-feature-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="chess-feature-card">
                <span className="chess-feature-icon">{f.icon}</span>
                <h3 className="chess-feature-title">{f.title}</h3>
                <p className="chess-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="chess-cta-banner">
        <div className="chess-cta-banner-inner">
          <div className="chess-cta-banner-text">
            <span className="chess-cta-banner-king">♚</span>
            <h2 className="chess-cta-banner-title">Ready to be outplayed?</h2>
            <p className="chess-cta-banner-sub">
              Challenge the engine at your level or explore the full model architecture.
            </p>
          </div>
          <button className="chess-btn-primary">Start a Game</button>
        </div>
      </section>
    </div>
  );
}
