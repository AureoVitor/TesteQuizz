import { createContext } from "react";
import { AppState, AppCtx, AppReducer } from "./AppTypedefs";

export const initState: AppState = {
  currentIndex: 0,
  guessState: "waiting",
  currentQuestion: {
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

export const AppContext = createContext<AppCtx>([initState, () => {}]);

export const appReducer: AppReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return initApp(state, action);
    case "guess":
      return makeGuess(state, action);
    case "pass":
      return passQuestion(state, action);
  }
};

const initApp: AppReducer = (state, action) => {
  if (action.type === "init")
    return {
      ...state,
      currentQuestion: action.questions[state.currentIndex],
      questionList: action.questions,
    };
  return state;
};

const makeGuess: AppReducer = (state, action) => {
  if (action.type === "guess") {
    const incorrectAnsswer = state.currentQuestion.incorrect;
    const correctAnsswe = state.currentQuestion.correct;
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
  return state;
};

const passQuestion: AppReducer = (state, action) => {
  if (action.type === "pass")
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
      currentQuestion: state.questionList[state.currentIndex + 1],
      guessState: "waiting",
    };
  return state;
};
