import type { ReactNode } from "react";
import type { FallingWord } from "../types";

type GamePlayfieldProps = {
  words: FallingWord[];
  gameOver: boolean;
  paused: boolean;
  bestScore: number;
  score: number;
  lives: number;
  combo: number;
  difficultyLabel: string;
  level: number;
  onRestart: () => void;
  onExitHome: () => void;
};

export function GamePlayfield({
  words,
  gameOver,
  paused,
  bestScore,
  score,
  lives,
  combo,
  difficultyLabel,
  level,
  onRestart,
  onExitHome,
}: GamePlayfieldProps) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl border border-[rgba(148,163,184,0.12)] bg-cover bg-center" style={{ backgroundImage: "url('/imgs/fundoGame.png')" }}>
      {words.map((word) => (
        <div
          key={word.id}
          className="absolute select-none whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-semibold tracking-[0.18em] shadow-[0_0_18px_rgba(0,229,255,0.16)] transition-transform duration-75"
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            color: "var(--foreground)",
            borderColor: "rgba(56,189,248,0.36)",
            background: "rgba(2,6,23,0.55)",
            textShadow: "0 0 14px rgba(0,229,255,0.55)",
            boxShadow: "0 0 0 1px rgba(0,229,255,0.08), 0 0 20px rgba(139,92,246,0.14)",
          }}
        >
          {word.text}
        </div>
      ))}

      {/* Floating left column: score, combo, lives */}
      <aside className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 sm:flex z-10">
        <FloatStat label="Score" value={String(score)} />
        <FloatStat label="Combo" value={`x${Math.max(1, combo)}`} />
        <FloatStat label="Vidas" value={String(lives)} emphasize />
      </aside>

      {/* Floating right column: difficulty, level, best */}
      <aside className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 sm:flex z-10">
        <FloatStat label="Dific" value={difficultyLabel} />
        <FloatStat label="Level" value={String(level)} />
        <FloatStat label="Best" value={String(bestScore)} />
      </aside>

      {gameOver ? (
        <Overlay>
          <p className="font-(family-name:--font-orbitron) text-sm uppercase tracking-[0.45em] text-(--danger)">
            Game Over
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-50 sm:text-4xl">
            As palavras venceram esta rodada.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Score final {score}. Melhor marca {bestScore}. Reinicie para tentar superar o seu ritmo.
          </p>
          <button
            type="button"
            onClick={onRestart}
            className="mt-6 rounded-full border border-[rgba(0,229,255,0.35)] bg-[rgba(0,229,255,0.08)] px-6 py-3 text-sm font-semibold text-slate-50 transition hover:border-[rgba(0,229,255,0.7)] hover:bg-[rgba(0,229,255,0.14)]"
          >
            Jogar novamente
          </button>
          {/* removed overlay home button; persistent home button is available bottom-right */}
        </Overlay>
      ) : null}

      {paused && !gameOver ? (
        <Overlay>
          <p className="font-(family-name:--font-orbitron) text-xs uppercase tracking-[0.4em] text-(--cyan)">
            Pausa
          </p>
          <p className="mt-2 text-sm text-slate-300">O jogo está parado. Clique em retomar para continuar.</p>
        </Overlay>
      ) : null}

      <FloatingHomeButton onExitHome={onExitHome} />
    </div>
  );
}

function Overlay({ children }: { children: ReactNode }) {
  return <div className="absolute inset-0 grid place-items-center px-4">{children}</div>;
}

function FloatStat({ label, value, emphasize = false }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div className={`pointer-events-auto rounded-lg border px-3 py-2 text-sm ${emphasize ? "border-[rgba(0,229,255,0.28)] bg-[rgba(0,229,255,0.04)]" : "border-[rgba(148,163,184,0.08)] bg-[rgba(2,6,23,0.36)]"}`}>
      <p className="text-[0.6rem] uppercase tracking-[0.35em] text-slate-400">{label}</p>
      <p className="mt-1 font-(family-name:--font-orbitron) text-base text-slate-50">{value}</p>
    </div>
  );
}

// Floating persistent Home button bottom-right
function FloatingHomeButton({ onExitHome }: { onExitHome: () => void }) {
  return (
    <button
      type="button"
      onClick={onExitHome}
      className="pointer-events-auto absolute right-6 bottom-6 z-20 rounded-full border border-[rgba(148,163,184,0.12)] bg-[rgba(2,6,23,0.6)] px-4 py-2 text-sm text-slate-100 shadow-lg"
    >
      Home
    </button>
  );
}
