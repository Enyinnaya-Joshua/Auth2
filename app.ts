import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router/user.route";
import { errorHandler } from "./middlewares/errorhandler";
import { AppError, Httpcode } from "./utils/appErrror";

const appStore = (app: Application) => {
  // MIDDLE-WARE
  app
    .use(express.json())
    .use(cors)
    .use(morgan("dev"))

    // ROUTES
    .use("/api", router)
    .use("/api/product", router)

    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError({
          message: `This route ${req.originalUrl} does not exist`,
          httpCode: Httpcode.NOT_FOUND,
          isOperational: true,
        })
      );
    })

    // error handlers; note: it should be the last in your app
    .use(errorHandler);
};

export default appStore;
