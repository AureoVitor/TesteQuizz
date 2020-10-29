import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 16px;
  width: 100%;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  width: ${({ value }: { value: number }) => `${value}%`};
  background-color: ${({ theme }) => theme.pallet.primary};
  transition: width 1s ease-in-out;
`;

export const ProgressBar = () => (
  <Container>
    <Fill value={70} />
  </Container>
);
