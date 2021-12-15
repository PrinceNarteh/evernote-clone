import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { CONSTANTS } from "./constants/strings";
import { resolvers } from "./graphql";

createConnection()
  .then(async (connection) => {
    const app = express();

    // Express middlewares
    app.use(cors());
    app.use(morgan("dev"));

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    // setup ApolloServer
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [...resolvers],
      }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    // listening to port
    app.listen(CONSTANTS.PORT, () =>
      console.log(
        `Server running on http://localhost:${CONSTANTS.PORT}/graphql`
      )
    );
  })
  .catch((error) => console.log(error));
