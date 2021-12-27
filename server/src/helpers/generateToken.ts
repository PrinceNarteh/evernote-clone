import jwt from "jsonwebtoken";
import { CONSTANTS } from "../constants/strings";
import { Response } from "express";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, CONSTANTS.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, CONSTANTS.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie(CONSTANTS.JWT_COOKIE, refreshToken, {
    httpOnly: true,
  });
};
