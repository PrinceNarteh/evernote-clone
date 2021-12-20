import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { CONSTANTS } from "./constants/strings";
import { resolvers } from "./graphql";
import { MyContext } from "./helpers/myContext";

createConnection()
  .then(async (connection) => {
    const app = express();

    // Express middleware
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
