import { Dispatch } from "react";

export type Question = {
  category: string;
  type: string;
  dificult: "easy" | "medium" | "hard";
  text: string;
  correct: string;
  incorrect: string[];
};

export type AppState = {
  currentIndex: number;
  currentQuestion: Question;
  questionList: Question[];
  guessState: "correct" | "wrong" | "waiting";
  guessed: string;
  correctGuesses: number;
  wrongGuesses: number;
};

export type AppAction =
  | { type: "guess"; answer: string }
  | { type: "pass" }
  | { type: "init"; questions: Question[] };

export type AppReducer = (state: AppState, action: AppAction) => AppState;

export type AppCtx = [AppState, Dispatch<AppAction>];
