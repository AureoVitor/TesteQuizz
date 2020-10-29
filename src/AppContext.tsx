import { createContext, Dispatch } from "react";
import { AppState, AppAction } from "./AppTypedefs";

export const initState: AppState = {
  currentIndex: 0,
  guessState: "waiting",
  currntQuestion: {
    category: "",
    type: "",
    dificult: "easy",
    text: "",
    correct: "",
    incorrect: [],
  },
  guessed: "",
  questionList: [],
  wrongGuesses: 0,
  correctGuesses: 0,
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "init":
      return {
        ...state,
        currntQuestion: action.questions[state.currentIndex],
        questionList: action.questions,
      };
    case "guess": {
      const incorrectAnsswer = state.currntQuestion.incorrect;
      const correctAnsswe = state.currntQuestion.correct;
      if (action.answer === correctAnsswe)
        return {
          ...state,
          guessState: "correct",
          guessed: action.answer,
          correctGuesses: state.correctGuesses + 1,
        };
      if (incorrectAnsswer.some((wrongAnswer) => wrongAnswer === action.answer))
        return {
          ...state,
          guessState: "wrong",
          guessed: action.answer,
          wrongGuesses: state.wrongGuesses + 1,
        };
      return state;
    }
    case "pass": {
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        currntQuestion: state.questionList[state.currentIndex + 1],
        guessState: "waiting",
      };
    }
  }
};

type AppCtx = [AppState, Dispatch<AppAction>];
export const AppContext = createContext<AppCtx>([initState, () => {}]);
