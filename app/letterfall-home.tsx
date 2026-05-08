"use client";

import Image from "next/image";
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/imgs/fundoHome.png')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.82))]" />

      <div className="relative mx-auto w-full max-w-2xl px-6 py-20">
        <header className="text-center">
          <Image
            src="/imgs/titulo.png"
            alt="Letterfall"
            width={360}
            height={120}
            priority
            className="mx-auto h-auto w-60 sm:w-80"
          />
        </header>

        <section className="mt-10 grid gap-3 rounded-3xl border border-[rgba(148,163,184,0.12)] bg-[rgba(2,6,23,0.34)] p-4 backdrop-blur-md">
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
