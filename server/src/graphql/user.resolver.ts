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
  async signUp(@Arg("data") data: UserInput): Promise<User> {
    const { email, password } = data;
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
}
