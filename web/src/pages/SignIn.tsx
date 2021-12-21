import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { FormEvent, useState, ChangeEvent } from "react";
import { GENERICS } from "../components/GlobalStyle";
import Wrapper from "../components/Wrapper";

const SIGN_IN_MUTATION = gql`
  mutation ($data: UserInput!) {
    signIn(data: $data) {
      access_token
    }
  }
`;

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [signIn, { loading, error, data }] = useMutation(SIGN_IN_MUTATION);

  const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    console.log(form);
    try {
      await signIn({
        variables: {
          data: {
            email: form.email,
            password: form.password,
          },
        },
        onCompleted: () => {
          console.log(data);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [target.name]: target.value });

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
    <Wrapper center>
      <FormWrapper className="login-container">
        <div className="left-side">
          <img src="login.png" alt="" />
        </div>
        <div className="right-side">
          <form onSubmit={onSubmitHandler}>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={form.password}
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </FormWrapper>
    </Wrapper>
  );
};

const FormWrapper = styled("div")`
  display: flex;
  align-items: center;
  border: ${GENERICS.border};
  border-radius: 5px;
  padding: 50px;

  > div {
    flex: 0.5;
  }

  .left-side {
    img {
      width: 200px;
    }
  }
`;

export default SignIn;
