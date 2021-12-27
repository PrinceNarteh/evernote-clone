import jwt from "jsonwebtoken";
import { CONSTANTS } from "../constants/strings";
import { Response } from "express";
import { User } from "../entity/User";

export const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, CONSTANTS.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.token_version },
    CONSTANTS.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie(CONSTANTS.JWT_COOKIE, refreshToken, {
    httpOnly: true,
  });
};
