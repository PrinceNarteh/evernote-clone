import styled from "@emotion/styled";
import { MIXINS } from "./GlobalStyle";

const Wrapper = ({ children, ...props }: any) => {
  return <WrapperStyles {...props}>{children}</WrapperStyles>;
};

const WrapperStyles = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;

  ${(props: any) => (props.center ? MIXINS.va() : "")}
  background-color: ${(props: any) =>
    props.backgroundColor ? props.backgroundColor : `unset`}
`;

export default Wrapper;
