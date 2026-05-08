import type { RefObject } from "react";

type GameFooterProps = {
  input: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  // onRestart: () => void; // Removed unused prop
};

export function GameFooter({
  input,
  inputRef,
  onInputChange,
  onSubmit,
  // onRestart, // Removed unused prop
}: GameFooterProps) {
  return (
    <footer className="absolute left-1/2 bottom-6 z-20 w-full max-w-3xl -translate-x-1/2 px-4">
      <div className="mx-auto flex w-full flex-col items-center gap-3">
        <div className="rounded-2xl border border-[rgba(56,189,248,0.22)] bg-(--panel-strong) px-4 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] w-full">
          <form
            className="flex w-full items-center gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => onInputChange(event.target.value)}
              placeholder="Digite a palavra exata aqui"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              className="flex-1 border-0 bg-transparent text-lg text-slate-50 outline-none placeholder:text-slate-500"
            />

            <button
              type="submit"
              className="rounded-2xl border border-[rgba(0,229,255,0.42)] bg-[linear-gradient(135deg,rgba(0,229,255,0.16),rgba(139,92,246,0.12))] px-5 py-3 text-sm font-semibold tracking-[0.18em] text-slate-50 transition hover:border-[rgba(0,229,255,0.72)] hover:bg-[linear-gradient(135deg,rgba(0,229,255,0.24),rgba(139,92,246,0.18))]"
            >
              Validar
            </button>
          </form>
        </div>
        {/* footer no longer shows home link; home button is floating on board */}
      </div>
    </footer>
  );
}
