import React from "react";
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

  const { guessState, currentIndex, currntQuestion, questionList } = state;

  const shouldShowNext = () =>
    guessState !== "waiting" && currentIndex < questionList.length - 1;

  return (
    <Wrapper>
      <Title>{`Question ${currentIndex + 1} of ${questionList.length}`}</Title>
      <SubTitle>
        {props.category}: {props.type}
      </SubTitle>
      <DificultyScale>
        {range(3).map((key) => (
          <StarIcon key={key} fill={"#fff"} />
        ))}
      </DificultyScale>
      <Question>{props.questiontext}</Question>
      <AnswerWrapper>
        {props.answers.map((answer, key) => {
          const color = answer !== currntQuestion.correct ? "wrong" : "correct";
          return (
            <AnswerBtn key={key} onClick={() => guess(answer)} color={color}>
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
