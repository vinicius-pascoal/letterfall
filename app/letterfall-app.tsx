"use client";

import { useState } from "react";
import LetterfallGame from "./letterfall-game";
import { LetterfallHome } from "./letterfall-home";
import { DIFFICULTIES } from "./letterfall-game/difficulties";
import type { DifficultyKey } from "./letterfall-game/types";

type Screen = "home" | "game";

export default function LetterfallApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [difficultyKey, setDifficultyKey] = useState<DifficultyKey>("normal");

  if (screen === "game") {
    return (
      <LetterfallGame
        difficultyKey={difficultyKey}
        onExitHome={() => setScreen("home")}
      />
    );
  }

  return (
    <LetterfallHome
      difficulties={DIFFICULTIES}
      selectedDifficultyKey={difficultyKey}
      onSelectDifficulty={setDifficultyKey}
      onStartGame={() => setScreen("game")}
    />
  );
}
