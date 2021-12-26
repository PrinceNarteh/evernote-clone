import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface ButtonProps extends React.ComponentProps<"button"> {
  fullWidth?: boolean;
  backgroundColor?: string;
  label?: string;
  loading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { label, loading, children, ...rest } = props;
  return (
    <ButtonStyled {...rest} className={`${loading && "button--loading"}`}>
      <span className="button__text">
        {label && `${label}`}

        {children}
      </span>
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  width: 20rem;
  padding: 1.4rem;
  font-size: 1.4rem;
  border: 1px solid #cac9c9;
  outline: none;
  border-radius: 1rem;
  margin: 0 0 4rem;
  background-color: transparent;
  position: relative;

  ${({ backgroundColor }: any) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
      color: #fff;
    `};

  ${({ fullWidth }: any) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  .button--text {
    transition: all 0.2s;
  }

  &.button--loading .button__text {
    visibility: hidden;
    opacity: 0;
  }

  &.button--loading::after {
    content: "";
    position: absolute;
    width: 2rem;
    height: 2rem;
    inset: 0;
    margin: auto;
    border: 0.4rem solid transparent;
    border-top-color: ${({ backgroundColor }: any) =>
      backgroundColor ? "#fff" : "#777"};
    border-radius: 50%;
    animation: spinner 1s linear infinite;
  }

  @keyframes spinner {
    from {
      transform: rotate(0turn);
    }
    to {
      transform: rotate(1turn);
    }
  }
`;
