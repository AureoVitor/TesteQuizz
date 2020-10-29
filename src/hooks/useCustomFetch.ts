import { useState, useEffect } from "react";

type CustomFetchResponse<T extends unknown> =
  | { type: "pending" }
  | { type: "success"; data: T }
  | { type: "error"; msg: string };

type FormatableIntermediary = { [key: string]: any };

const castAsIntermediary = (res: unknown) => res as FormatableIntermediary[];
const cleanString = (str: string) => str.replace(/%2[0-9]|%2+?|%3/g, " ");

export const useCustomFetch = <T>(
  uri: string,
  init?: RequestInit | undefined
) => {
  const initState: CustomFetchResponse<T> = { type: "pending" };
  const [response, setResponse] = useState<CustomFetchResponse<T>>(initState);

  //   TODO remove hardcode and put generics
  const formatData = (res: FormatableIntermediary[]) => {
    const formated = res.map(
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
          incorrect: incorrect_answers.map((val: string) => cleanString(val)),
        };
      }
    ) as unknown;
    return formated as T;
  };
  //   TODO remove hardcode and put generics

  useEffect(() => {
    fetch(uri, init || { method: "GET" })
      .then((res) => res.json())
      .then((res) => castAsIntermediary(res))
      .then((res) => formatData(res))
      .then((res) => setResponse({ type: "success", data: res }))
      .catch((err: Error) => setResponse({ type: "error", msg: err.message }));
  });

  return { response };
};
