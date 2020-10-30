import React from "react";
import { useTheme } from "styled-components";
import { AppContext } from "../../app/AppContext";
import { ReactComponent as StarIcon } from "./starIcon.svg";
import {
  AnswerBtn,
  AnswerWrapper,
  DificultyScale,
  Question,
  SubTitle,
  Title,
  Wrapper,
} from "./stylingComponents";

export interface IQuizzContent {
  category: string;
  type: string;
  dificult: "easy" | "medium" | "hard";
  questiontext: string;
  answers: string[];
}
export const QuizzContent = (props: IQuizzContent) => {
  const { pallet } = useTheme();
  const [state, dispatch] = React.useContext(AppContext);

  const { guessState, currentIndex, currentQuestion, questionList } = state;

  const handleGuess = (answer: string) => dispatch({ type: "guess", answer });

  const shouldShowNext = () =>
    guessState !== "waiting" && currentIndex < questionList.length - 1;

  const pickColorOnResult = (answer: string) => {
    switch (guessState) {
      case "correct":
        return answer === currentQuestion.correct
          ? pallet.semantic.success
          : undefined;
      case "wrong":
        if (answer === currentQuestion.correct) return pallet.semantic.success;
        if (answer === state.guessed) return pallet.semantic.error;
        return undefined;
      case "waiting":
        return undefined;
    }
  };

  return (
    <Wrapper>
      <Title>{`Question ${currentIndex + 1} of ${questionList.length}`}</Title>
      <SubTitle>
        {props.category}: {props.type}
      </SubTitle>
      <DificultyScale>
        {range(3).map((key) => (
          // TODO fix stars not painting
          <StarIcon key={key} fill={"#fff"} />
        ))}
      </DificultyScale>
      <Question>{props.questiontext}</Question>
      <AnswerWrapper>
        {props.answers.map((answer, key) => {
          return (
            <AnswerBtn
              key={key}
              onClick={() => handleGuess(answer)}
              color={pickColorOnResult(answer)}
              disabled={guessState !== "waiting"}
            >
              {answer}
            </AnswerBtn>
          );
        })}
        {guessState === "correct" && <Title>Correct!</Title>}
        {guessState === "wrong" && <Title>Wrong!</Title>}
        {shouldShowNext() && (
          <AnswerBtn onClick={() => dispatch({ type: "pass" })}>Next</AnswerBtn>
        )}
      </AnswerWrapper>
    </Wrapper>
  );
};

// Utilities
const range = (n: number) => Array.from(Array(n).keys());
