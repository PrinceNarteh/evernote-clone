import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { FormEvent, useState, ChangeEvent } from "react";
import { GENERICS } from "../components/GlobalStyle";
import Wrapper from "../components/Wrapper";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    await signIn({
      variables: {
        data: {
          email: form.email,
          password: form.password,
        },
      },
      onCompleted: () => {
        navigate("/");
      },
    });
  };

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [target.name]: target.value });

  if (loading) return <p>Loading....</p>;

  return (
    <FormWrapper className="login-container">
      {/* Left Side starts here */}
      <section className="left-side">
        <img src="logo.png" alt="logo" />
        <span>TakingNote</span>
        <div className="content-desc">
          <h1>Explore Modern Web Application For Taking Notes</h1>
          <img src="pencil.png" id="hero-img" alt="Pencil" />
        </div>
        <div className="images">
          <img src="books.png" width={200} alt="" />
        </div>
      </section>

      {/* Right Side starts here */}
      <section className="right-side">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <div className="links">
            <button type="button" id="btn-1">
              <a href="https://www.google.com">
                <img
                  src="google.png"
                  alt="Google logo"
                  width={30}
                  height="auto"
                />
                create account with Google
              </a>
            </button>
            <button type="button" id="btn-1">
              <a href="https://www.github.com">
                <img
                  src="github.png"
                  alt="Google logo"
                  width={30}
                  height="auto"
                />
                create account with Github
              </a>
            </button>
          </div>
          <form onSubmit={onSubmitHandler}>
            <input type="email" placeholder="Email Address" />
            <br />
            <input type="password" placeholder="Password" />
            <br />
            <input type="submit" value="Sign In" />
            <br />
          </form>
          <span>
            Already have an account? <Link to={"/signup"}>sign in</Link>
          </span>
        </div>
      </section>
    </FormWrapper>
  );
};

const FormWrapper = styled("div")`
  width: 100%auto;
  display: flex;
  position: relative;

  .left-side {
    width: 40%;
    min-height: 100vh;
    background: ${GENERICS.primaryColor};
    border-radius: 0 70px 70px 0;
    padding: 1rem;
    position: relative;

    > img {
      width: 2rem;
    }

    span {
      font-size: 2.5rem;
      line-height: 2rem;
      margin-left: 1rem;
      font-weight: bold;
    }

    .content-desc {
      margin-top: 4rem;

      h1 {
        width: 40rem;
        font-size: 4rem;
        color: #fff;
      }

      #hero-img {
        width: 60%;
        /* height: auto; */
        position: absolute;
        top: 30%;
        right: -27%;
      }
    }

    .images {
      position: absolute;
      bottom: 3.2rem;

      img {
        width: 90%;
      }
    }
  }
`;

export default SignIn;
