import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { CONSTANTS } from "./constants/strings";
import { resolvers } from "./graphql";
import { MyContext } from "./helpers/myContext";
import { User } from "./entity/User";
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from "./helpers/generateToken";
import cookieParser from "cookie-parser";

createConnection()
  .then(async (connection) => {
    const app = express();

    // Express middleware
    app.use(cookieParser());
    app.use(
      cors({
        origin: ["http://localhost:3000", "https://studio.apollographql.com"],
        credentials: true,
      })
    );
    app.use(morgan("dev"));

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    app.post("/refresh-token", async (req, res) => {
      const token = req.cookies[CONSTANTS.JWT_COOKIE];
      if (!token) return res.send({ success: false, access_token: "" });

      let data: any = null;

      try {
        data = jwt.verify(token, CONSTANTS.REFRESH_TOKEN_SECRET);
      } catch (error) {
        return res.send({ success: false, access_token: "" });
      }

      const user = await User.findOne(data.userId);
      if (!user) return res.send({ success: false, access_token: "" });

      if (user.token_version !== data.tokenVersion) {
        return res.send({ success: false, access_token: "" });
      }

      const access_token = generateAccessToken(user);
      sendRefreshToken(res, generateRefreshToken(user));
      return res.send({ success: true, access_token });
    });

    // setup ApolloServer
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [...resolvers],
      }),
      context: ({ req, res }: MyContext) => ({ req, res }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    // listening to port
    app.listen(CONSTANTS.PORT, () =>
      console.log(
        `Server running on http://localhost:${CONSTANTS.PORT}/graphql`
      )
    );
  })
  .catch((error) => console.log(error));
