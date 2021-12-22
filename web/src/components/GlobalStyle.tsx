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
  html {
    font-size: 62.5%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    cursor: pointer;
  }
`;

export const GENERICS = {
  primaryColor: "#00a82d",
  primaryColorDark: "#008f26",
  border: "1px solid #f1f1f1",
  colorBlackCalm: "#333",
  color: "#737373",
  boxShadow: "#ccc 0rem 0.4rem 0.5rem -0.2rem",
};

export const MIXINS = {
  va: (align = "center") => css`
    display: flex;
    align-items: center;
    ${align !== "center"
      ? `justify-content: flex-start;`
      : `justify-content: center;`}
  `,
};

export const GlobalStyles = () => <Global styles={STYLES} />;
