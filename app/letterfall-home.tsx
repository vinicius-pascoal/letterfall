"use client";

import type { ReactNode } from "react";
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
  const selectedDifficulty = difficulties.find(({ key }) => key === selectedDifficultyKey) ?? difficulties[1];

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-[rgba(0,229,255,0.14)] blur-3xl" />
        <div className="absolute right-[-8%] top-[16%] h-96 w-96 rounded-full bg-[rgba(139,92,246,0.16)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.72))]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-4xl border border-[rgba(148,163,184,0.14)] bg-[rgba(2,6,23,0.72)] p-6 shadow-[0_0_0_1px_rgba(0,229,255,0.04),0_30px_80px_rgba(2,6,23,0.62)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-(family-name:--font-orbitron) text-sm uppercase tracking-[0.45em] text-(--cyan)">
                Letterfall
              </p>
              <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
                Digite antes que a chuva de palavras encoste no chão.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Escolha a dificuldade, inicie a partida e enfrente um ritmo crescente de queda, score e combo em uma interface neon minimalista.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                <Badge>Score progressivo</Badge>
                <Badge>3 vidas no padrão</Badge>
                <Badge>Combo com bônus</Badge>
                <Badge>HUD minimalista</Badge>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onStartGame}
                  className="rounded-full border border-[rgba(0,229,255,0.4)] bg-[linear-gradient(135deg,rgba(0,229,255,0.18),rgba(139,92,246,0.12))] px-6 py-4 text-sm font-semibold tracking-[0.2em] text-slate-50 transition hover:border-[rgba(0,229,255,0.72)] hover:bg-[linear-gradient(135deg,rgba(0,229,255,0.26),rgba(139,92,246,0.2))]"
                >
                  Jogar agora
                </button>
                <button
                  type="button"
                  onClick={() => onSelectDifficulty("normal")}
                  className="rounded-full border border-[rgba(148,163,184,0.18)] px-6 py-4 text-sm font-semibold tracking-[0.18em] text-slate-200 transition hover:border-[rgba(250,204,21,0.45)] hover:bg-[rgba(250,204,21,0.08)]"
                >
                  Padrão recomendado
                </button>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[rgba(56,189,248,0.16)] bg-[rgba(2,6,23,0.62)] p-4 sm:p-5">
              <div className="rounded-[1.25rem] border border-[rgba(148,163,184,0.12)] bg-[rgba(15,23,42,0.55)] p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Dificuldade selecionada</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-(family-name:--font-orbitron) text-2xl tracking-[0.15em] text-(--cyan)">
                      {selectedDifficulty.label}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {selectedDifficulty.description}
                    </p>
                  </div>
                  <div className="rounded-full border border-[rgba(0,229,255,0.22)] px-4 py-2 text-right text-xs uppercase tracking-[0.35em] text-slate-300">
                    {selectedDifficulty.spawningLabel}
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {difficulties.map((difficulty) => {
                    const active = difficulty.key === selectedDifficultyKey;

                    return (
                      <button
                        key={difficulty.key}
                        type="button"
                        onClick={() => onSelectDifficulty(difficulty.key)}
                        className={`rounded-2xl border px-4 py-3 text-left transition ${
                          active
                            ? "border-[rgba(0,229,255,0.42)] bg-[rgba(0,229,255,0.08)] shadow-[0_0_0_1px_rgba(0,229,255,0.08)]"
                            : "border-[rgba(148,163,184,0.12)] bg-[rgba(2,6,23,0.42)] hover:border-[rgba(148,163,184,0.24)]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium text-slate-50">{difficulty.label}</p>
                            <p className="mt-1 text-sm text-slate-400">{difficulty.description}</p>
                          </div>
                          <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                            {difficulty.badge}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[rgba(148,163,184,0.16)] bg-[rgba(2,6,23,0.44)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
      {children}
    </span>
  );
}
