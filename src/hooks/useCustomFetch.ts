import { useState, useEffect } from "react";

type CrudeRes = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

const cleanString = (str: string) => str.replace(/%2[0-9]|%2+?|%3/g, " ");

export const useCustomFetch = <T>(
  uri: string,
  init?: RequestInit | undefined
) => {
  const [data, setData] = useState<T>();

  //   TODO remove hardcode and put generics
  const toCrudeCast = (res: unknown) => res as CrudeRes[];
  const formatData = (res: CrudeRes[]) => {
    return res.map(
      ({
        category,
        type,
        difficulty,
        question,
        correct_answer,
        incorrect_answers,
      }) => {
        return {
          category: cleanString(category),
          type: type,
          difficulty: difficulty,
          text: cleanString(question),
          correct: cleanString(correct_answer),
          incorrect: incorrect_answers.map((val) => cleanString(val)),
        };
      }
    ) as unknown;
  };
  //   TODO remove hardcode and put generics

  useEffect(() => {
    fetch(uri, init || { method: "GET" })
      .then((res) => res.json())
      .then((res) => toCrudeCast(res))
      .then((res) => formatData(res))
      .then((res) => res as T)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [uri, init]);

  return { data };
};
