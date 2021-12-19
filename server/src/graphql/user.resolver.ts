import { UserInput } from "./user.input";
import { User } from "../entity/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello, World!";
  }

  @Mutation(() => User)
  async signUp(@Arg("data") { email, password }: UserInput): Promise<User> {
    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) throw new Error("User with this email already exists");
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({
        email,
        password: hashedPassword,
        username: email.split("@")[0],
      });
      await user.save();
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => User)
  async signIn(@Arg("data") { email, password }: UserInput): Promise<User> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Invalid credentials");

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
