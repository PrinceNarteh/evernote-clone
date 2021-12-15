import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { CONSTANTS } from "./constants/strings";
import typeDefs from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

console.log(resolvers);

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
      typeDefs,
      resolvers,
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
