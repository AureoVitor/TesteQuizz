import React from "react";
import styled from "styled-components";

interface IScore {
  totalCount: number;
  correctCount: number;
  wrongCount: number;
}
export const Score = (props: IScore) => {
  const { garantedPoints, possiblePoints, lostPoints } = calcCases(props);

  return (
    <Content>
      <MultiFill value={garantedPoints} kind="success" />
      <MultiFill value={possiblePoints} kind="warning" />
      <MultiFill value={lostPoints} kind="error" />
    </Content>
  );
};

// Styling Components
const Content = styled.div`
  height: 24px;
  width: 60%;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  border: 1px solid gray;
`;

interface IMultiFill {
  value: number;
  kind: "error" | "success" | "warning";
}
const MultiFill = styled.div`
  height: 100%;
  width: ${({ value }: IMultiFill) => `${value.toString()}%`}; /* bug NaN */
  background-color: ${({ theme, kind }) => theme.pallet.semantic[kind]};
  transition: width 1s ease-in-out;
`;

// Utilities
const calcCases = ({ totalCount, correctCount, wrongCount }: IScore) => {
  const completed = correctCount + wrongCount;
  const remaining = totalCount - completed;

  const garantedPoints = (correctCount / totalCount) * 100;
  const possiblePoints = (correctCount / completed) * 100 - garantedPoints;
  const lostPoints =
    ((correctCount + remaining) / totalCount) * 100 -
    possiblePoints -
    garantedPoints;

  return { garantedPoints, possiblePoints, lostPoints };
};
