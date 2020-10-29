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
import { Question } from "./AppTypedefs";
import { appReducer, initState, AppContext } from "./AppContext";

const uri = `https://gist.githubusercontent.com/antoniopresto/
ac901a4eaa57ca7c53e6344db882d499/raw/
7b8ef5b706c2640f9b833fd02407204e89007113/questions.json`;

export const App = () => {
  const [appState, dispatch] = React.useReducer(appReducer, initState);
  const { response } = useCustomFetch<Question[]>(uri);

  const {
    currentIndex,
    currntQuestion,
    questionList,
    correctGuesses,
    wrongGuesses,
  } = appState;

  React.useEffect(() => {
    if (response.type === "success")
      dispatch({ type: "init", questions: response.data });
  }, [response]);

  return (
    <StyleWrapper>
      <PageContainer>
        <AppContext.Provider value={[appState, dispatch]}>
          <QuizzContainer>
            <ProgressBar
              current={currentIndex + 1}
              total={questionList.length}
            />
            {response.type === "pending" && <h1>Loading...</h1>}
            {response.type === "success" && (
              <QuizzContent
                category={currntQuestion.category}
                type={currntQuestion.type}
                dificult={currntQuestion.dificult}
                questiontext={currntQuestion.text}
                answers={currntQuestion.incorrect.concat(
                  currntQuestion.correct
                )}
              />
            )}
            {response.type === "error" && <h1>{response.msg}</h1>}
            <Score
              totalCount={questionList.length}
              correctCount={correctGuesses}
              wrongCount={wrongGuesses}
            />
          </QuizzContainer>
        </AppContext.Provider>
      </PageContainer>
    </StyleWrapper>
  );
};
