import express, { Application, Response, Request } from "express";
import dbConfig from "./config/db";
import appStore from "./app";
const port: number = 4111;

const app: Application = express();

process.on("uncaughtException", (err: Error) => {
  console.log(`UncaughtException, server shutting down`);
  console.log(err.name, err.message);
  process.exit(1);
});

appStore(app);

dbConfig();

const server = app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});

process.on("unhandledRejection", (reason: any) => {
  console.log(`unhandleRejection, server is shutting down`);
  console.log(reason.message);
  server.close(() => {
    process.exit(1);
  });
});
