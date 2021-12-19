import bcrypt from "bcryptjs";
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entity/User";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./../helpers/generateToken";
import { UserInput } from "./user.input";

@ObjectType()
class LoginResponse {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;
}

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

  @Mutation(() => LoginResponse)
  async signIn(
    @Arg("data") { email, password }: UserInput
  ): Promise<LoginResponse> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Invalid credentials");

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
