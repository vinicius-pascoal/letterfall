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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.16),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.94),rgba(5,8,22,1))]" />
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-4 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="relative mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
        <header className="text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-slate-400">
            Typing runner
          </p>
          <Image
            src="/imgs/titulo.png"
            alt="Letterfall"
            width={360}
            height={120}
            priority
            className="mx-auto h-auto w-60 drop-shadow-[0_20px_45px_rgba(2,6,23,0.45)] sm:w-80"
          />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Escolha uma dificuldade e encare uma interface mais limpa, com foco no ritmo, na leitura rápida e na precisão.
          </p>
        </header>

        <section className="mt-10 grid gap-3 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_24px_70px_rgba(2,6,23,0.35)] backdrop-blur-2xl sm:p-5">
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
                className={`group relative overflow-hidden w-full rounded-2xl border px-4 py-4 text-left transition duration-200 ${active
                  ? "border-[rgba(0,229,255,0.45)] bg-[linear-gradient(135deg,rgba(0,229,255,0.12),rgba(139,92,246,0.08))] shadow-[0_0_0_1px_rgba(0,229,255,0.06),0_14px_40px_rgba(0,229,255,0.08)]"
                  : "border-white/8 bg-[rgba(2,6,23,0.28)] hover:-translate-y-0.5 hover:border-white/16 hover:bg-[rgba(2,6,23,0.36)]"
                  }`}
              >
                <div className={`absolute inset-y-0 left-0 w-1 rounded-r-full ${active ? "bg-cyan-400/80" : "bg-white/0 group-hover:bg-cyan-400/40"}`} />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-50">{difficulty.label}</p>
                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-300">
                      {difficulty.description}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-col items-end gap-1 text-right">
                    <span className="text-xs uppercase tracking-[0.28em] text-slate-300">{difficulty.badge}</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.32em] text-slate-500">{difficulty.spawningLabel}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
}
