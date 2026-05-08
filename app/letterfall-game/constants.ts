export const WORD_BANK = [
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

export const START_LIVES = 3;
export const STARTING_WORDS = 3;
export const STORAGE_KEY = "letterfall-best-score";

export const INITIAL_WORDS = [
  { text: "matrix", x: 18 },
  { text: "cipher", x: 48 },
  { text: "signal", x: 74 },
] as const;

export const STATUS_MESSAGES = {
  idle: "Digite a palavra que estiver caindo na tela.",
  reset: "Novo round iniciado. Mantenha o ritmo.",
  pause: {
    on: "Jogo pausado.",
    off: "Retomando a queda.",
  },
} as const;
