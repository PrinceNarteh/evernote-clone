import cors from "cors";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { CONSTANTS } from "./constants/strings";

createConnection()
  .then(async (connection) => {
    const app = express();

    // Express middlewares
    app.use(cors());
    app.use(morgan("dev"));

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    app.listen(CONSTANTS.PORT, () =>
      console.log(`Server running on http://localhost:${CONSTANTS.PORT}`)
    );
  })
  .catch((error) => console.log(error));
