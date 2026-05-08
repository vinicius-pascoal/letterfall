"use client";

import Image from "next/image";

type GameHudProps = {
  paused: boolean;
  onTogglePause: () => void;
};

export function GameHud({ paused, onTogglePause }: GameHudProps) {
  return (
    <header className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between gap-3 rounded-3xl bg-[rgba(2,6,23,0.32)] px-3 py-2 backdrop-blur-md sm:left-6 sm:right-6 sm:px-4">
      <div>
        <Image src="/imgs/titulo.png" alt="Letterfall" width={220} height={72} className="h-auto w-35 sm:w-45" priority />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onTogglePause}
          className="rounded-md border border-[rgba(148,163,184,0.08)] px-3 py-1 text-sm text-slate-200"
        >
          {paused ? "Retomar" : "Pausa"}
        </button>
      </div>
    </header>
  );
}
