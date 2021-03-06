import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GENERICS } from "../components/GlobalStyle";
import { Button, Input } from "../styles";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($data: UserInput!) {
    signUp(data: $data) {
      id
    }
  }
`;

const SignUp = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  let [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION);
  const navigate = useNavigate();

  const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    await signUp({
      variables: {
        data: {
          email: form.email,
          password: form.password,
        },
      },
      onCompleted: () => {
        navigate("/signin");
      },
      onError: () => {
        loading = false;
      },
    });
  };

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [target.name]: target.value });

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
            <Button label="" type="button" id="btn-1">
              <a href="https://www.google.com">
                <img
                  src="google.png"
                  alt="Google logo"
                  width={20}
                  height="auto"
                />
                Create account with Google
              </a>
            </Button>
            <Button label="" type="button">
              <a href="https://www.github.com">
                <img
                  src="github.png"
                  alt="Google logo"
                  width={20}
                  height="auto"
                />
                Create account with Github
              </a>
            </Button>
          </div>
          {error && <p className="error">{error.message}</p>}
          <form onSubmit={onSubmitHandler}>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={onChangeHandler}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChangeHandler}
            />
            <Button
              backgroundColor={`${GENERICS.primaryColor}`}
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Sign Up
            </Button>
            <br />
          </form>
          <span>
            Already have an account?{" "}
            <Link to={"/signin"} className="link">
              Sign in here
            </Link>
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
        margin: 0 auto;
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

  .right-side {
    margin-left: 15rem;
    margin: auto;
    display: grid;
    place-items: center;
    text-align: center;
    position: relative;

    .error {
      font-size: 1.6rem;
      color: crimson;
    }

    .form-wrapper {
      h1 {
        font-size: 3.2rem;
        color: #3a3939;
        margin-bottom: 4rem;
      }

      & button {
        img {
          width: 15px;
          height: auto;
          margin-right: 0.5rem;

          a {
            color: #3a3939;
          }
        }
      }

      #btn-1 {
        margin-right: 2.5rem;
      }

      form {
        line-height: 6rem;
      }

      input[type="submit"] {
        width: 100%;
        padding: 1.4rem;
        outline: none;
        border: none;
        background: #5cc5c8;
        color: #fff;
        border-radius: 1rem;
        font-size: 1.6rem;
        margin-top: 2.5rem;
        cursor: pointer;
      }

      span {
        font-size: 1.6rem;
      }
    }

    .link {
      color: ${GENERICS.primaryColor};
    }
  }
`;

export default SignUp;
