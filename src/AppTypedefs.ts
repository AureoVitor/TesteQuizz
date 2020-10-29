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
  currntQuestion: Question;
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
