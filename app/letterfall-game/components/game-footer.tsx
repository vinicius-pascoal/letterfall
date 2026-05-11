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
        <div className="w-full rounded-[1.75rem] border border-white/10 bg-[rgba(2,6,23,0.56)] px-4 py-3 shadow-[0_18px_40px_rgba(2,6,23,0.28)] backdrop-blur-2xl">
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
              className="flex-1 border-0 bg-transparent text-lg text-slate-50 outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              className="rounded-2xl border border-[rgba(56,189,248,0.4)] bg-[linear-gradient(135deg,rgba(56,189,248,0.18),rgba(139,92,246,0.14))] px-5 py-3 text-sm font-semibold tracking-[0.18em] text-slate-50 transition hover:border-[rgba(56,189,248,0.7)] hover:bg-[linear-gradient(135deg,rgba(56,189,248,0.28),rgba(139,92,246,0.2))]"
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
