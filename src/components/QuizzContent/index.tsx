import React from "react";
import styled from "styled-components";
import { ReactComponent as StarIcon } from "./starIcon.svg";

const Wrapper = styled.main`
  height: 90%;
  width: 100%;
  padding: 80px 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 2rem;
`;
const SubTitle = styled.h4`
  width: 100%;
`;
const Question = styled.h4`
  width: 85%;
  margin: 16px 0;
  text-align: justify;
  font-weight: lighter;
`;
const AnswerWrapper = styled.div`
  width: 85%;
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const AnswerBtn = styled.button`
  width: 45%;
  height: 32px;
  margin: 16px 0;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:active {
    transform: translateX(2px) translateY(2px);
  }
`;

const DificultyScale = styled.div`
  svg {
    width: 15px;
    margin: 8px 2px;
    stroke: #000;
  }
`;

const range = (n: number) => Array.from(Array(n).keys());

export interface IQuizzContent {
  category: string;
  type: string;
  dificult: "easy" | "medium" | "hard";
  questiontext: string;
  answers: string[];
}
export const QuizzContent = (props: IQuizzContent) => {
  return (
    <Wrapper>
      <Title>Question X of Y</Title>
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
        {props.answers.map((answer, key) => (
          <AnswerBtn key={key}>{answer}</AnswerBtn>
        ))}
      </AnswerWrapper>
    </Wrapper>
  );
};
