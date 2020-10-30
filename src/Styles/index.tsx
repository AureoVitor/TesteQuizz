import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { customTheme } from "./themes/base";

interface IStyleWrapper {
  children: JSX.Element | JSX.Element[];
}
export const StyleWrapper = ({ children }: IStyleWrapper) => (
  <ThemeProvider theme={customTheme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

const GlobalStyle = createGlobalStyle`
  * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     font-family: Arial, Helvetica, sans-serif;
  }
`;
