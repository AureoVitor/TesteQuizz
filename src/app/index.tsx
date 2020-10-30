import React from "react";
import { StyleWrapper } from "../Styles";
import { useCustomFetch } from "../hooks/useCustomFetch";
import {
  PageContainer,
  ProgressBar,
  QuizzContainer,
  QuizzContent,
  Score,
} from "../components";
import { Question } from "./AppTypedefs";
import { appReducer, initState, AppContext } from "./AppContext";

export const App = () => {
  const { response } = useCustomFetch<Question[]>(getUri());
  const [appState, dispatch] = React.useReducer(appReducer, initState);

  React.useEffect(() => {
    if (response.type === "success")
      dispatch({ type: "init", questions: response.data });
  }, [response]);

  const {
    currentIndex,
    currentQuestion,
    questionList,
    correctGuesses,
    wrongGuesses,
  } = appState;

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
                category={currentQuestion.category}
                type={currentQuestion.type}
                dificult={currentQuestion.dificult}
                questiontext={currentQuestion.text}
                answers={currentQuestion.incorrect.concat(
                  currentQuestion.correct
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

const getUri = () => `https://gist.githubusercontent.com/antoniopresto/
ac901a4eaa57ca7c53e6344db882d499/raw/
7b8ef5b706c2640f9b833fd02407204e89007113/questions.json`;
