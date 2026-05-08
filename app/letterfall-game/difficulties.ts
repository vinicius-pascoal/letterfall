import type { DifficultyPreset } from "./types";

export const DIFFICULTIES = [
  {
    key: "casual",
    label: "Casual",
    badge: "Relaxado",
    description: "Mais tempo para reagir, spawn bem espaçado e margem generosa para aprender.",
    spawningLabel: "Lento",
    speedMultiplier: 0.74,
    spawnMultiplier: 1.38,
    startingLives: 4,
  },
  {
    key: "normal",
    label: "Normal",
    badge: "Recomendado",
    description: "Ritmo estável para a maioria das partidas, com pressão moderada e clara.",
    spawningLabel: "Padrão",
    speedMultiplier: 0.92,
    spawnMultiplier: 1.08,
    startingLives: 4,
  },
  {
    key: "hard",
    label: "Hard",
    badge: "Rápido",
    description: "Menos tempo de resposta e uma curva mais agressiva logo no começo.",
    spawningLabel: "Acelerado",
    speedMultiplier: 1.05,
    spawnMultiplier: 0.92,
    startingLives: 3,
  },
  {
    key: "nightmare",
    label: "Nightmare",
    badge: "Extremo",
    description: "Para quem quer pressão alta, mas sem virar um pico impossível logo no início.",
    spawningLabel: "Brutal",
    speedMultiplier: 1.18,
    spawnMultiplier: 0.78,
    startingLives: 2,
  },
] as const satisfies readonly DifficultyPreset[];
