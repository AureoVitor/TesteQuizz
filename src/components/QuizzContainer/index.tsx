import styled from "styled-components";

export const QuizzContainer = styled.div`
  height: 90%;
  max-width: 560px;
  min-width: 560px;
  box-shadow: 2px 8px 12px rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    width: 90%;
    height: 100%;
    min-width: 360px;
    border-radius: 0;
  }
`;
