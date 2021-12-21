import { css, Global } from "@emotion/react";

const STYLES = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: grayscale;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    cursor: pointer;
  }
`;

const GENERICS = {
  primaryColor: "#00a82d",
  primaryColorDark: "#008f26",
  border: "1px solid #f1f1f1",
  colorBlackCalm: "#333",
  color: "#737373",
  boxShadow: "#ccc 0px 4px 5px -2px",
};

export const MIXINS = {
  va: (align = "center") => css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export const GlobalStyles = () => <Global styles={STYLES} />;
