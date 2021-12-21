import styled from "@emotion/styled";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <LayoutStyled>{children}</LayoutStyled>;
};

const LayoutStyled = styled.div`
  width: 100%;
  height: 100vh;
`;

export default Layout;
