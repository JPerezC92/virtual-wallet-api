import { Application, Request, Response, Router } from "express";

import CoursesData from "../../data/courses.json";
import { movementsRouter } from "./movements.routes";

export const mainRouterPath = "/api/v1";
const mainRouter = Router();

// routes
mainRouter.use(movementsRouter);

export const loadApiEndpoints = (app: Application): void => {
  app.use(mainRouterPath, mainRouter);
  app.get(mainRouterPath, (req: Request, res: Response) => {
    return res.status(200).send(CoursesData);
  });
};
