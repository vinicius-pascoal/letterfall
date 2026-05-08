import type { RefObject } from "react";
import type { FeedbackState } from "../types";

type GameFooterProps = {
  feedback: FeedbackState;
  input: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onRestart: () => void;
};

export function GameFooter({
  feedback,
  input,
  inputRef,
  onInputChange,
  onSubmit,
  onRestart,
}: GameFooterProps) {
  return (
    <footer className="border-t border-[rgba(148,163,184,0.12)] bg-[rgba(2,6,23,0.82)] px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="rounded-2xl border border-[rgba(56,189,248,0.28)] bg-[rgba(2,6,23,0.72)] px-4 py-3 text-sm text-foreground shadow-[0_0_0_1px_rgba(15,23,42,0.3)]">
          <p className="font-medium uppercase tracking-[0.25em] opacity-80">Status</p>
          <p className="mt-1 leading-6">{feedback?.message ?? "Aguardando jogada."}</p>
        </div>

        <form
          className="flex w-full max-w-3xl flex-col gap-3 md:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="flex-1 rounded-2xl border border-[rgba(56,189,248,0.22)] bg-(--panel-strong) px-4 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
            <label className="mb-2 block text-xs uppercase tracking-[0.35em] text-slate-400">
              Digitação
            </label>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => onInputChange(event.target.value)}
              placeholder="Digite a palavra exata aqui"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              className="w-full border-0 bg-transparent text-lg text-slate-50 outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-stretch gap-3">
            <button
              type="submit"
              className="rounded-2xl border border-[rgba(0,229,255,0.42)] bg-[linear-gradient(135deg,rgba(0,229,255,0.16),rgba(139,92,246,0.12))] px-5 py-4 text-sm font-semibold tracking-[0.18em] text-slate-50 transition hover:border-[rgba(0,229,255,0.72)] hover:bg-[linear-gradient(135deg,rgba(0,229,255,0.24),rgba(139,92,246,0.18))]"
            >
              Validar
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="rounded-2xl border border-[rgba(148,163,184,0.18)] px-5 py-4 text-sm font-semibold tracking-[0.18em] text-slate-200 transition hover:border-[rgba(250,204,21,0.45)] hover:bg-[rgba(250,204,21,0.08)]"
            >
              Home
            </button>
          </div>
        </form>
      </div>
    </footer>
  );
}
