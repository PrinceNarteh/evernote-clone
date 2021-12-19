import "dotenv/config";

export const CONSTANTS = {
  PORT: process.env.PORT!,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  ACCESS_REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET!,
};
