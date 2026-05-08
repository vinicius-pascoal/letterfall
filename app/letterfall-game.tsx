"use client";

import { GameFooter } from "./letterfall-game/components/game-footer";
import { GameHud } from "./letterfall-game/components/game-hud";
import { GamePlayfield } from "./letterfall-game/components/game-playfield";
import { useLetterfallGame } from "./letterfall-game/hooks/use-letterfall-game";

export default function LetterfallGame() {
  const {
    bestScore,
    combo,
    feedback,
    gameOver,
    input,
    inputRef,
    lives,
    paused,
    resetGame,
    score,
    submitWord,
    setInput,
    togglePause,
    words,
    level,
  } = useLetterfallGame();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-[rgba(0,229,255,0.12)] blur-3xl" />
        <div className="absolute right-[-8%] top-[16%] h-96 w-96 rounded-full bg-[rgba(139,92,246,0.14)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.68))]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-5 pt-4 sm:px-6 lg:px-8">
        <GameHud
          score={score}
          lives={lives}
          combo={combo}
          level={level}
          bestScore={bestScore}
          paused={paused}
          onTogglePause={togglePause}
        />

        <section className="relative flex min-h-0 flex-1 flex-col rounded-4xl border border-[rgba(148,163,184,0.12)] bg-[rgba(2,6,23,0.58)] shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_30px_80px_rgba(2,6,23,0.65)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-5 top-5 h-px bg-linear-to-r from-transparent via-[rgba(0,229,255,0.5)] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-[22%] h-px bg-linear-to-r from-transparent via-[rgba(244,63,94,0.35)] to-transparent" />

          <div className="relative flex-1 overflow-hidden px-4 pb-4 pt-5 sm:px-6">
            <div className="absolute inset-0 opacity-35 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[100%_3rem,3rem_100%]" />
            <div className="absolute inset-x-0 bottom-[18%] h-px bg-linear-to-r from-transparent via-[rgba(250,204,21,0.45)] to-transparent" />

            <GamePlayfield
              words={words}
              gameOver={gameOver}
              paused={paused}
              bestScore={bestScore}
              score={score}
              onRestart={resetGame}
            />
          </div>

          <GameFooter
            feedback={feedback}
            input={input}
            inputRef={inputRef}
            onInputChange={setInput}
            onSubmit={submitWord}
            onRestart={resetGame}
          />
        </section>
      </div>
    </main>
  );
}
