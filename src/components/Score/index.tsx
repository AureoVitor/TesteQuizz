import React from "react";
import styled from "styled-components";

const Content = styled.div`
  height: 24px;
  width: 60%;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  border: 1px solid gray;
`;

interface IMultiFill {
  value: string;
  kind: "error" | "success" | "warning";
}
const MultiFill = styled.div`
  height: 100%;
  width: ${({ value }: IMultiFill) => `${value}%`};
  background-color: ${({ theme, kind }) => theme.pallet.semantic[kind]};
  transition: width 1s ease-in-out;
`;

// TODO inprove semantics
const calcCases = ({ totalCount, correctCount, wrongCount }: IScore) => {
  const completed = correctCount + wrongCount;
  const remaining = totalCount - completed;

  const worstCase = (correctCount / totalCount) * 100;
  const averageCase = (correctCount / completed) * 100 - worstCase;
  const bestCase =
    ((correctCount + remaining) / totalCount) * 100 - averageCase - worstCase;

  return { averageCase, bestCase, worstCase };
};

interface IScore {
  totalCount: number;
  correctCount: number;
  wrongCount: number;
}
export const Score = (props: IScore) => {
  const { worstCase, averageCase, bestCase } = calcCases(props);

  return (
    <Content>
      <MultiFill value={worstCase.toString()} kind="success" />
      <MultiFill value={averageCase.toString()} kind="warning" />
      <MultiFill value={bestCase.toString()} kind="error" />
    </Content>
  );
};
