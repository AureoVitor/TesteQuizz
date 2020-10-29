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
  value: number;
  kind: "error" | "success" | "warning";
}
const MultiFill = styled.div`
  height: 100%;
  width: ${({ value }: IMultiFill) => `${value}%`};
  background-color: ${({ theme, kind }) => theme.pallet.semantic[kind]};
`;
export const Score = () => (
  <Content>
    <MultiFill value={45} kind="error" />
    <MultiFill value={15} kind="warning" />
    <MultiFill value={20} kind="success" />
  </Content>
);
