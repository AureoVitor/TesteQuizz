import React from "react";
import { useCustomFetch } from "./hooks/useCustomFetch";

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
  const { data } = useCustomFetch<Question[]>(uri);
  return (
    <>
      <div>App</div>
      {data?.map(({ category }, key) => (
        <h1 key={key}>{category}</h1>
      ))}
    </>
  );
};
