import { css, Global } from "@emotion/react";

const STYLES = css`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,600&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", Arial, Helvetica, sans-serif;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: grayscale;
  }
  html {
    font-size: 62.5%;
    font-family: "Poppins", sans-serif;
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
  primaryColor: "#5cc5c8",
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
