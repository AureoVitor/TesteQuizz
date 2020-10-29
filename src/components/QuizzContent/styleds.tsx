import styled from "styled-components";

export const Wrapper = styled.main`
  height: 90%;
  width: 100%;
  padding: 80px 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 2rem;
`;
export const SubTitle = styled.h4`
  width: 100%;
`;
export const Question = styled.h4`
  width: 85%;
  margin: 16px 0;
  text-align: justify;
  font-weight: lighter;
`;
export const AnswerWrapper = styled.div`
  width: 85%;
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const AnswerBtn = styled.button`
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

export const DificultyScale = styled.div`
  svg {
    width: 15px;
    margin: 8px 2px;
    stroke: #000;
  }
`;
