"use client";

import type { DifficultyPreset, DifficultyKey } from "./letterfall-game/types";

type LetterfallHomeProps = {
  difficulties: readonly DifficultyPreset[];
  selectedDifficultyKey: DifficultyKey;
  onSelectDifficulty: (difficultyKey: DifficultyKey) => void;
  onStartGame: () => void;
};

export function LetterfallHome({
  difficulties,
  selectedDifficultyKey,
  onSelectDifficulty,
  onStartGame,
}: LetterfallHomeProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="mx-auto w-full max-w-2xl px-6 py-20">
        <header className="text-center">
          <h1 className="font-(family-name:--font-orbitron) text-5xl font-semibold tracking-[0.12em] text-(--cyan)">
            LETTERFALL
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            Digite as palavras que caem antes que atinjam o chão.
          </p>
        </header>

        <section className="mt-10 grid gap-3">
          {difficulties.map((difficulty) => {
            const active = difficulty.key === selectedDifficultyKey;

            return (
              <button
                key={difficulty.key}
                type="button"
                onClick={() => {
                  onSelectDifficulty(difficulty.key);
                  onStartGame();
                }}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${active
                    ? "border-[rgba(0,229,255,0.42)] bg-[rgba(0,229,255,0.06)]"
                    : "border-[rgba(148,163,184,0.08)] bg-[rgba(2,6,23,0.28)] hover:border-[rgba(148,163,184,0.16)]"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-50">{difficulty.label}</p>
                    <p className="mt-1 text-xs text-slate-400">{difficulty.description}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.28em] text-slate-500">{difficulty.badge}</span>
                </div>
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
}
