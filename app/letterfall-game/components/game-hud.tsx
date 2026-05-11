"use client";

import Image from "next/image";

type GameHudProps = {
  paused: boolean;
  onTogglePause: () => void;
};

export function GameHud({ paused, onTogglePause }: GameHudProps) {
  return (
    <header className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between gap-3 rounded-[1.75rem] border border-white/10 bg-[rgba(2,6,23,0.48)] px-3 py-2 shadow-[0_14px_40px_rgba(2,6,23,0.22)] backdrop-blur-2xl sm:left-6 sm:right-6 sm:px-4">
      <div>
        <Image src="/imgs/titulo.png" alt="Letterfall" width={220} height={72} className="h-auto w-35 drop-shadow-[0_12px_24px_rgba(2,6,23,0.25)] sm:w-45" priority />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onTogglePause}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:border-[rgba(56,189,248,0.36)] hover:bg-[rgba(56,189,248,0.08)]"
        >
          {paused ? "Retomar" : "Pausa"}
        </button>
      </div>
    </header>
  );
}
