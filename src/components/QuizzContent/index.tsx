import React from "react";
import { useTheme } from "styled-components";
import { AppContext } from "../../AppContext";
import { ReactComponent as StarIcon } from "./starIcon.svg";
import {
  AnswerBtn,
  AnswerWrapper,
  DificultyScale,
  Question,
  SubTitle,
  Title,
  Wrapper,
} from "./styleds";

const range = (n: number) => Array.from(Array(n).keys());

export interface IQuizzContent {
  category: string;
  type: string;
  dificult: "easy" | "medium" | "hard";
  questiontext: string;
  answers: string[];
}
export const QuizzContent = (props: IQuizzContent) => {
  const [state, dispatch] = React.useContext(AppContext);
  const guess = (answer: string) => dispatch({ type: "guess", answer });
  const { pallet } = useTheme();

  const { guessState, currentIndex, currntQuestion, questionList } = state;

  const shouldShowNext = () =>
    guessState !== "waiting" && currentIndex < questionList.length - 1;

  const pickColor = (answer: string) => {
    switch (guessState) {
      case "correct":
        return answer === currntQuestion.correct
          ? pallet.semantic.success
          : undefined;
      case "wrong":
        if (answer === currntQuestion.correct) return pallet.semantic.success;
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
              onClick={() => guess(answer)}
              color={pickColor(answer)}
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
