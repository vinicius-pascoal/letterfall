import type { FallingWord } from "../types";

type GamePlayfieldProps = {
  words: FallingWord[];
  gameOver: boolean;
  paused: boolean;
  bestScore: number;
  score: number;
  onRestart: () => void;
};

export function GamePlayfield({
  words,
  gameOver,
  paused,
  bestScore,
  score,
  onRestart,
}: GamePlayfieldProps) {
  return (
    <div className="relative h-[58vh] min-h-96 overflow-hidden rounded-3xl border border-[rgba(148,163,184,0.12)] bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.85),rgba(2,6,23,0.88))] px-3 py-3 sm:px-5 sm:py-5">
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
    </div>
  );
}

function Overlay({ children }: { children: ReactNode }) {
  return <div className="absolute inset-0 grid place-items-center px-4">{children}</div>;
}
