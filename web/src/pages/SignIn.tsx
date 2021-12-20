import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState, ChangeEvent } from "react";

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
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
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
  );
};

export default SignIn;
