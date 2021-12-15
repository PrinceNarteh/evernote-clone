import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
const PORT = process.env.PORT || 4000;

createConnection()
  .then(async (connection) => {
    const app = express();

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    app.listen(4000, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));
