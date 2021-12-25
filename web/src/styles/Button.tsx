import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface ButtonProps {
  fullWidth?: boolean;
  backgroundColor?: string;
}

export const Button = styled.button<ButtonProps>`
  width: 20rem;
  padding: 1.4rem;
  font-size: 1.4rem;
  border: 1px solid #cac9c9;
  outline: none;
  border-radius: 1rem;
  margin: 0 0 4rem;
  background-color: transparent;

  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
      color: #fff;
    `};

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;
