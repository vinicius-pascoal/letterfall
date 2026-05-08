"use client";

import type { ReactNode } from "react";

type GameHudProps = {
  score: number;
  lives: number;
  combo: number;
  level: number;
  bestScore: number;
  paused: boolean;
  onTogglePause: () => void;
};

export function GameHud({
  score,
  lives,
  combo,
  level,
  bestScore,
  paused,
  onTogglePause,
}: GameHudProps) {
  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[rgba(148,163,184,0.14)] bg-[rgba(2,6,23,0.72)] px-4 py-3 shadow-[0_0_0_1px_rgba(0,229,255,0.04),0_20px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl sm:px-5">
      <div>
        <p className="font-(family-name:--font-orbitron) text-lg tracking-[0.3em] text-(--cyan)">
          LETTERFALL
        </p>
        <p className="mt-1 text-sm text-slate-400">
          Neon minimalista, foco total na digitação.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-6 sm:gap-x-6">
        <Stat label="Score" value={score} />
        <Stat label="Vidas" value={lives} emphasize />
        <Stat label="Combo" value={`x${Math.max(combo, 1)}`} />
        <Stat label="Level" value={level} />
        <Stat label="Best" value={bestScore} />
        <button
          type="button"
          onClick={onTogglePause}
          className="rounded-full border border-[rgba(56,189,248,0.24)] px-4 py-2 font-medium text-foreground transition hover:border-[rgba(0,229,255,0.55)] hover:bg-[rgba(0,229,255,0.08)]"
        >
          {paused ? "Retomar" : "Pausar"}
        </button>
      </div>
    </header>
  );
}

function Stat({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string | number;
  emphasize?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-500">{label}</p>
      <p
        className={`mt-1 font-(family-name:--font-orbitron) text-base tracking-[0.12em] ${emphasize ? "text-(--cyan)" : "text-slate-100"
          }`}
      >
        {value}
      </p>
    </div>
  );
}
