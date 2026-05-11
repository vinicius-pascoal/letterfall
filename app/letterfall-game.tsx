"use client";

import { GameFooter } from "./letterfall-game/components/game-footer";
import { GameHud } from "./letterfall-game/components/game-hud";
import { GamePlayfield } from "./letterfall-game/components/game-playfield";
import { useLetterfallGame } from "./letterfall-game/hooks/use-letterfall-game";

type LetterfallGameProps = {
  difficultyKey: import("./letterfall-game/types").DifficultyKey;
  onExitHome: () => void;
};

export default function LetterfallGame({ difficultyKey, onExitHome }: LetterfallGameProps) {
  const {
    bestScore,
    combo,
    difficulty,
    gameOver,
    input,
    inputRef,
    lives,
    paused,
    score,
    submitWord,
    setInput,
    togglePause,
    words,
    level,
  } = useLetterfallGame({ difficultyKey });

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <section className="relative h-full w-full overflow-hidden border border-white/8 bg-[rgba(2,6,23,0.72)] shadow-[0_30px_90px_rgba(2,6,23,0.45)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-x-5 top-5 h-px bg-linear-to-r from-transparent via-[rgba(56,189,248,0.45)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-[22%] h-px bg-linear-to-r from-transparent via-[rgba(139,92,246,0.25)] to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[100%_3rem,3rem_100%]" />
        <GameHud paused={paused} onTogglePause={togglePause} />
        <GamePlayfield
          words={words}
          gameOver={gameOver}
          paused={paused}
          bestScore={bestScore}
          score={score}
          lives={lives}
          combo={combo}
          difficultyLabel={difficulty.label}
          level={level}
          onRestart={onExitHome}
          onExitHome={onExitHome}
        />

        <GameFooter
          input={input}
          inputRef={inputRef}
          onInputChange={setInput}
          onSubmit={submitWord}
        />
      </section>
    </main>
  );
}
