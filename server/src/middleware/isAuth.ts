import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";
import { MyContext } from "../helpers/myContext";
import { CONSTANTS } from "../constants/strings";

interface JwtPayload {
  userId: string;
}

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    const bearer = context.req.headers["authorization"];
    const token = bearer?.split(" ")[1];
    if (!token) throw new Error("Not authenticated");

    const tokenPayload = jwt.verify(
      token,
      CONSTANTS.ACCESS_TOKEN_SECRET
    ) as JwtPayload;
    if (!tokenPayload) throw new Error("Not authenticated");
    context.tokenPayload = tokenPayload;
  } catch (error) {
    throw new Error("Not authenticated");
  }
  return next();
};
