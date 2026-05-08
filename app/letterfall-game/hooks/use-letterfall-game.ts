"use client";

import { useEffect, useRef, useState } from "react";
import {
  INITIAL_WORDS,
  START_LIVES,
  STARTING_WORDS,
  STORAGE_KEY,
  STATUS_MESSAGES,
} from "../constants";
import type { FeedbackState, FallingWord } from "../types";
import { getLevel, getSpawnInterval, getWordPoints, getWordSpeed, randomWord } from "../utils";

let nextWordId = 1;

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

export function useLetterfallGame() {
  const [words, setWords] = useState<FallingWord[]>(() => createStartingWords());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [combo, setCombo] = useState(0);
  const [input, setInput] = useState("");
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>({
    tone: "neutral",
    message: STATUS_MESSAGES.idle,
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
        const nextWord = buildWord(level, -12);
        wordsRef.current = [...wordsRef.current, nextWord];
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

        livesRef.current = nextLives;
        comboRef.current = 0;
        wordsRef.current = updatedWords;
        setWords(updatedWords);
        setLives(nextLives);
        setCombo(0);
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

  function submitWord() {
    const normalizedInput = input.trim().toLowerCase();
    const matchedWord = wordsRef.current.find((word) => word.text.toLowerCase() === normalizedInput);

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
  }

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
      message: STATUS_MESSAGES.reset,
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
        message: next ? STATUS_MESSAGES.pause.on : STATUS_MESSAGES.pause.off,
      });
      if (!next) {
        lastTickRef.current = null;
        inputRef.current?.focus();
      }

      return next;
    });
  }

  return {
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
    togglePause,
    words,
    level: getLevel(score),
    setInput,
  };
}
