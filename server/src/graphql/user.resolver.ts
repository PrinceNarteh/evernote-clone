import bcrypt from "bcryptjs";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { MyContext } from "../helpers/myContext";
import { isAuth } from "../middleware/isAuth";
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from "./../helpers/generateToken";
import { UserInput } from "./user.input";

@ObjectType()
class LoginResponse {
  @Field(() => String)
  access_token: string;
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
    @Arg("data") { email, password }: UserInput,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Invalid credentials");

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      sendRefreshToken(res, refreshToken);

      return {
        access_token: accessToken,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: MyContext) {
    const payload = ctx.tokenPayload;
    if (!payload) return null;
    try {
      const user = await User.findOne(payload.userId);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async revokeUserSession(@Arg("userId") userId: string): Promise<Boolean> {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "token_version", 1);
    return true;
  }
}
