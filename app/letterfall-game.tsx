"use client";

import { useEffect, useRef, useState } from "react";

type FallingWord = {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  points: number;
};

type FeedbackState = {
  tone: "neutral" | "success" | "danger" | "warning";
  message: string;
} | null;

const WORD_BANK = [
  "matrix",
  "cipher",
  "signal",
  "neon",
  "vector",
  "orbit",
  "chrome",
  "pulse",
  "vertex",
  "nova",
  "laser",
  "glitch",
  "stream",
  "flux",
  "binary",
  "horizon",
  "quantum",
  "prism",
  "comet",
  "drift",
  "echo",
  "static",
  "zenith",
  "beacon",
  "cascade",
  "lattice",
  "ember",
  "vectorize",
  "spectrum",
  "nightfall",
] as const;

const START_LIVES = 3;
const STARTING_WORDS = 3;
const STORAGE_KEY = "letterfall-best-score";
const INITIAL_WORDS = [
  { text: "matrix", x: 18 },
  { text: "cipher", x: 48 },
  { text: "signal", x: 74 },
] as const;

let nextWordId = 1;

function getLevel(score: number) {
  return Math.max(1, Math.floor(score / 120) + 1);
}

function getWordPoints(word: string) {
  if (word.length <= 4) {
    return 10;
  }

  if (word.length <= 7) {
    return 20;
  }

  return 30;
}

function getWordSpeed(level: number, word: string) {
  return 0.55 + level * 0.11 + Math.min(0.35, word.length * 0.018);
}

function getSpawnInterval(level: number) {
  return Math.max(620, 1700 - (level - 1) * 120);
}

function randomWord() {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}

function buildWord(level: number, y: number) {
  const text = randomWord();

  return {
    id: nextWordId++,
    text,
    x: 8 + Math.random() * 70,
    y,
    speed: getWordSpeed(level, text),
    points: getWordPoints(text),
  } satisfies FallingWord;
}

function createStartingWords() {
  return INITIAL_WORDS.slice(0, STARTING_WORDS).map((word, index) => ({
    id: nextWordId++,
    text: word.text,
    x: word.x,
    y: -8 - index * 22,
    speed: getWordSpeed(1, word.text),
    points: getWordPoints(word.text),
  }));
}

function toneStyles(tone: NonNullable<FeedbackState>["tone"]) {
  switch (tone) {
    case "success":
      return "border-[color:rgba(34,197,94,0.35)] bg-[color:rgba(34,197,94,0.14)] text-[color:var(--success)]";
    case "danger":
      return "border-[color:rgba(244,63,94,0.35)] bg-[color:rgba(244,63,94,0.14)] text-[color:var(--danger)]";
    case "warning":
      return "border-[color:rgba(250,204,21,0.35)] bg-[color:rgba(250,204,21,0.14)] text-[color:var(--warning)]";
    default:
      return "border-[color:rgba(56,189,248,0.28)] bg-[color:rgba(2,6,23,0.72)] text-[color:var(--foreground)]";
  }
}

export default function LetterfallGame() {
  const [words, setWords] = useState<FallingWord[]>(() => createStartingWords());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [combo, setCombo] = useState(0);
  const [input, setInput] = useState("");
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>({
    tone: "neutral",
    message: "Digite a palavra que estiver caindo na tela.",
  });
  const [bestScore, setBestScore] = useState(0);

  const wordsRef = useRef(words);
  const scoreRef = useRef(score);
  const livesRef = useRef(lives);
  const comboRef = useRef(combo);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spawnTimerRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    livesRef.current = lives;
  }, [lives]);

  useEffect(() => {
    comboRef.current = combo;
  }, [combo]);

  useEffect(() => {
    const storedBest = Number(window.localStorage.getItem(STORAGE_KEY) ?? "0");
    if (Number.isFinite(storedBest)) {
      setBestScore(storedBest);
    }
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      window.localStorage.setItem(STORAGE_KEY, String(score));
    }
  }, [bestScore, score]);

  useEffect(() => {
    if (gameOver || paused) {
      lastTickRef.current = null;
      return;
    }

    const timer = window.setInterval(() => {
      const now = window.performance.now();
      const previous = lastTickRef.current ?? now;
      const delta = Math.min(80, now - previous);
      lastTickRef.current = now;

      const level = getLevel(scoreRef.current);
      spawnTimerRef.current += delta;

      const spawnInterval = getSpawnInterval(level);

      if (spawnTimerRef.current >= spawnInterval) {
        spawnTimerRef.current %= spawnInterval;
        const activeWords = wordsRef.current;
        const nextWord = buildWord(level, -12);
        wordsRef.current = [...activeWords, nextWord];
        setWords(wordsRef.current);
      }

      const dangerLine = 84;
      let missedWords = 0;

      const updatedWords = wordsRef.current
        .map((word) => ({ ...word, y: word.y + word.speed * (delta / 16.6667) }))
        .filter((word) => {
          if (word.y >= dangerLine) {
            missedWords += 1;
            return false;
          }

          return true;
        });

      if (missedWords > 0) {
        const nextLives = Math.max(0, livesRef.current - missedWords);
        const nextCombo = 0;

        livesRef.current = nextLives;
        comboRef.current = nextCombo;
        wordsRef.current = updatedWords;
        setWords(updatedWords);
        setLives(nextLives);
        setCombo(nextCombo);
        setFeedback({
          tone: "danger",
          message: `${missedWords} palavra${missedWords > 1 ? "s" : ""} escapou ${nextLives > 0 ? `- vidas restantes ${nextLives}` : "- fim de jogo"}`,
        });

        if (nextLives === 0) {
          setGameOver(true);
          setPaused(true);
        }

        return;
      }

      wordsRef.current = updatedWords;
      setWords(updatedWords);
    }, 40);

    return () => window.clearInterval(timer);
  }, [gameOver, paused]);

  useEffect(() => {
    const normalizedInput = input.trim().toLowerCase();
    if (!normalizedInput || gameOver || paused) {
      return;
    }

    const matchedWord = wordsRef.current.find(
      (word) => word.text.toLowerCase() === normalizedInput,
    );

    if (!matchedWord) {
      return;
    }

    const nextCombo = comboRef.current + 1;
    const bonus = nextCombo * 2;
    const nextScore = scoreRef.current + matchedWord.points + bonus;
    const nextWords = wordsRef.current.filter((word) => word.id !== matchedWord.id);

    comboRef.current = nextCombo;
    scoreRef.current = nextScore;
    wordsRef.current = nextWords;

    setWords(nextWords);
    setScore(nextScore);
    setCombo(nextCombo);
    setInput("");
    setFeedback({
      tone: "success",
      message: `${matchedWord.text} +${matchedWord.points + bonus} pontos`,
    });
  }, [input, gameOver, paused]);

  function resetGame() {
    const freshWords = createStartingWords();

    wordsRef.current = freshWords;
    scoreRef.current = 0;
    livesRef.current = START_LIVES;
    comboRef.current = 0;
    spawnTimerRef.current = 0;
    lastTickRef.current = null;

    setWords(freshWords);
    setScore(0);
    setLives(START_LIVES);
    setCombo(0);
    setPaused(false);
    setGameOver(false);
    setInput("");
    setFeedback({
      tone: "neutral",
      message: "Novo round iniciado. Mantenha o ritmo.",
    });

    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  function togglePause() {
    if (gameOver) {
      return;
    }

    setPaused((current) => {
      const next = !current;
      setFeedback({
        tone: next ? "warning" : "neutral",
        message: next ? "Jogo pausado." : "Retomando a queda.",
      });
      if (!next) {
        lastTickRef.current = null;
        inputRef.current?.focus();
      }

      return next;
    });
  }

  const level = getLevel(score);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-[rgba(0,229,255,0.12)] blur-3xl" />
        <div className="absolute right-[-8%] top-[16%] h-96 w-96 rounded-full bg-[rgba(139,92,246,0.14)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.68))]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-5 pt-4 sm:px-6 lg:px-8">
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
              onClick={togglePause}
              className="rounded-full border border-[rgba(56,189,248,0.24)] px-4 py-2 font-medium text-foreground transition hover:border-[rgba(0,229,255,0.55)] hover:bg-[rgba(0,229,255,0.08)]"
            >
              {paused ? "Retomar" : "Pausar"}
            </button>
          </div>
        </header>

        <section className="relative flex min-h-0 flex-1 flex-col rounded-4xl border border-[rgba(148,163,184,0.12)] bg-[rgba(2,6,23,0.58)] shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_30px_80px_rgba(2,6,23,0.65)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-5 top-5 h-px bg-linear-to-r from-transparent via-[rgba(0,229,255,0.5)] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-[22%] h-px bg-linear-to-r from-transparent via-[rgba(244,63,94,0.35)] to-transparent" />

          <div className="relative flex-1 overflow-hidden px-4 pb-4 pt-5 sm:px-6">
            <div className="absolute inset-0 opacity-35 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[100%_3rem,3rem_100%]" />
            <div className="absolute inset-x-0 bottom-[18%] h-px bg-linear-to-r from-transparent via-[rgba(250,204,21,0.45)] to-transparent" />

            <div className="relative h-[58vh] min-h-96 overflow-hidden rounded-3xl border border-[rgba(148,163,184,0.12)] bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.85),rgba(2,6,23,0.88))] px-3 py-3 sm:px-5 sm:py-5">
              {words.map((word) => (
                <div
                  key={word.id}
                  className="absolute select-none whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-semibold tracking-[0.18em] shadow-[0_0_18px_rgba(0,229,255,0.16)] transition-transform duration-75"
                  style={{
                    left: `${word.x}%`,
                    top: `${word.y}%`,
                    color: "var(--foreground)",
                    borderColor: "rgba(56,189,248,0.36)",
                    background: "rgba(2,6,23,0.55)",
                    textShadow: "0 0 14px rgba(0,229,255,0.55)",
                    boxShadow: "0 0 0 1px rgba(0,229,255,0.08), 0 0 20px rgba(139,92,246,0.14)",
                  }}
                >
                  {word.text}
                </div>
              ))}

              {gameOver ? (
                <div className="absolute inset-0 grid place-items-center px-4">
                  <div className="w-full max-w-lg rounded-3xl border border-[rgba(244,63,94,0.28)] bg-[rgba(2,6,23,0.88)] p-6 text-center shadow-[0_20px_80px_rgba(2,6,23,0.7)] backdrop-blur-xl">
                    <p className="font-(family-name:--font-orbitron) text-sm uppercase tracking-[0.45em] text-(--danger)">
                      Game Over
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold text-slate-50 sm:text-4xl">
                      As palavras venceram esta rodada.
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      Score final {score}. Melhor marca {bestScore}. Reinicie para tentar superar o seu ritmo.
                    </p>
                    <button
                      type="button"
                      onClick={resetGame}
                      className="mt-6 rounded-full border border-[rgba(0,229,255,0.35)] bg-[rgba(0,229,255,0.08)] px-6 py-3 text-sm font-semibold text-slate-50 transition hover:border-[rgba(0,229,255,0.7)] hover:bg-[rgba(0,229,255,0.14)]"
                    >
                      Jogar novamente
                    </button>
                  </div>
                </div>
              ) : null}

              {paused && !gameOver ? (
                <div className="absolute inset-0 grid place-items-center px-4">
                  <div className="rounded-3xl border border-[rgba(56,189,248,0.24)] bg-[rgba(2,6,23,0.76)] px-6 py-4 text-center shadow-[0_20px_60px_rgba(2,6,23,0.65)] backdrop-blur-xl">
                    <p className="font-(family-name:--font-orbitron) text-xs uppercase tracking-[0.4em] text-(--cyan)">
                      Pausa
                    </p>
                    <p className="mt-2 text-sm text-slate-300">O jogo está parado. Clique em retomar para continuar.</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <footer className="border-t border-[rgba(148,163,184,0.12)] bg-[rgba(2,6,23,0.82)] px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className={`rounded-2xl border px-4 py-3 text-sm shadow-[0_0_0_1px_rgba(15,23,42,0.3)] ${toneStyles(feedback?.tone ?? "neutral")}`}>
                <p className="font-medium uppercase tracking-[0.25em] opacity-80">
                  Status
                </p>
                <p className="mt-1 leading-6">{feedback?.message ?? "Aguardando jogada."}</p>
              </div>

              <form
                className="flex w-full max-w-3xl flex-col gap-3 md:flex-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  const normalizedInput = input.trim().toLowerCase();
                  const matchedWord = wordsRef.current.find(
                    (word) => word.text.toLowerCase() === normalizedInput,
                  );

                  if (!matchedWord || gameOver || paused) {
                    return;
                  }

                  const nextCombo = comboRef.current + 1;
                  const bonus = nextCombo * 2;
                  const nextScore = scoreRef.current + matchedWord.points + bonus;
                  const nextWords = wordsRef.current.filter((word) => word.id !== matchedWord.id);

                  comboRef.current = nextCombo;
                  scoreRef.current = nextScore;
                  wordsRef.current = nextWords;

                  setWords(nextWords);
                  setScore(nextScore);
                  setCombo(nextCombo);
                  setInput("");
                  setFeedback({
                    tone: "success",
                    message: `${matchedWord.text} +${matchedWord.points + bonus} pontos`,
                  });

                  inputRef.current?.focus();
                }}
              >
                <div className="flex-1 rounded-2xl border border-[rgba(56,189,248,0.22)] bg-(--panel-strong) px-4 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
                  <label className="mb-2 block text-xs uppercase tracking-[0.35em] text-slate-400">
                    Digitação
                  </label>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Digite a palavra exata aqui"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    className="w-full border-0 bg-transparent text-lg text-slate-50 outline-none placeholder:text-slate-500"
                    disabled={gameOver}
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
                    onClick={resetGame}
                    className="rounded-2xl border border-[rgba(148,163,184,0.18)] px-5 py-4 text-sm font-semibold tracking-[0.18em] text-slate-200 transition hover:border-[rgba(250,204,21,0.45)] hover:bg-[rgba(250,204,21,0.08)]"
                  >
                    Reiniciar
                  </button>
                </div>
              </form>
            </div>
          </footer>
        </section>
      </div>
    </main>
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
