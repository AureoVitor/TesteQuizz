import React from "react";
import { StyleWrapper } from "./Styles";
import { useCustomFetch } from "./hooks/useCustomFetch";
import {
  PageContainer,
  ProgressBar,
  QuizzContainer,
  QuizzContent,
  Score,
} from "./components";

type Question = {
  category: string;
  type: string;
  dificult: "easy" | "medium" | "hard";
  text: string;
  correct: string;
  incorrect: string[];
};

const uri = `https://gist.githubusercontent.com/antoniopresto/
ac901a4eaa57ca7c53e6344db882d499/raw/
7b8ef5b706c2640f9b833fd02407204e89007113/questions.json`;

export const App = () => {
  const { response } = useCustomFetch<Question[]>(uri);

  return (
    <StyleWrapper>
      <PageContainer>
        <QuizzContainer>
          <ProgressBar />
          {response.type === "pending" && <h1>Loading...</h1>}
          {response.type === "success" && (
            <QuizzContent
              category={response.data[0].category}
              type={response.data[0].type}
              dificult={response.data[0].dificult}
              questiontext={response.data[0].text}
              answers={response.data[0].incorrect.concat(
                response.data[0].correct
              )}
            />
          )}
          {response.type === "error" && <h1>{response.msg}</h1>}
          <Score />
        </QuizzContainer>
      </PageContainer>
    </StyleWrapper>
  );
};
