import jwt from "jsonwebtoken";
import { CONSTANTS } from "../constants/strings";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, CONSTANTS.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, CONSTANTS.ACCESS_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
