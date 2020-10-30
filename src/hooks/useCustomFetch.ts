import { useState, useEffect } from "react";

type CustomFetchResponse<T extends unknown> =
  | { type: "pending" }
  | { type: "success"; data: T }
  | { type: "error"; msg: string };

type FormatableIntermediary = { [key: string]: any };

type FormatParam = {
  inputField: string;
  outputField: string;
  formatFunc?: ((input: string) => string) | ((input: string[]) => string[]);
};

export const useCustomFetch = <T>(
  uri: string,
  init?: RequestInit | undefined
) => {
  const initState: CustomFetchResponse<T> = { type: "pending" };
  const [response, setResponse] = useState<CustomFetchResponse<T>>(initState);

  useEffect(() => {
    fetch(uri, init || { method: "GET" })
      .then((res) => res.json())
      .then((res) => castAs<FormatableIntermediary>(res))
      .then((res) => formatData<T>(res, getFormatParams()))
      .then((res) => setResponse({ type: "success", data: res }))
      .catch((err: Error) => setResponse({ type: "error", msg: err.message }));
  }, [uri, init]);

  return { response };
};

// Utilities
const formatData = <T>(
  res: FormatableIntermediary[],
  formatParams: FormatParam[]
) => {
  const formated = res.map((input) => {
    const output: { [key: string]: string | string[] } = {};

    formatParams.forEach(({ outputField, inputField, formatFunc }) => {
      if (formatFunc) output[outputField] = formatFunc(input[inputField]);
      else output[outputField] = input[inputField];
    });

    return output;
  }) as unknown;
  return formated as T;
};
const castAs = <T extends unknown>(res: unknown) => res as T[];

//   TODO remove hardcode
const cleanString = (str: string) => str.replace(/%2[0-9]|%2+?|%3/g, " ");
const getFormatParams = (): FormatParam[] => [
  { inputField: "category", outputField: "category", formatFunc: cleanString },
  { inputField: "type", outputField: "type" },
  { inputField: "difficulty", outputField: "difficulty" },
  { inputField: "question", outputField: "text", formatFunc: cleanString },
  {
    inputField: "correct_answer",
    outputField: "correct",
    formatFunc: cleanString,
  },
  {
    inputField: "incorrect_answers",
    outputField: "incorrect",
    formatFunc: (input: string[]) =>
      input.map((val: string) => cleanString(val)),
  },
];
