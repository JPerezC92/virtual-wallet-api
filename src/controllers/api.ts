import { Application, Request, Response, Router } from "express";

import CoursesData from "../../data/courses.json";
import {
  movementsRouter,
  movementsRouterPath,
} from "../movements/infrastructure/movements.routes";

export const mainRouterPath = "/api/v1";

export const loadApiEndpoints = (app: Application): void => {
  const mainRouter = Router();
  mainRouter.use(movementsRouterPath, movementsRouter);

  app.use(mainRouterPath, mainRouter);

  app.get(mainRouterPath, (req: Request, res: Response) => {
    return res.status(200).send(CoursesData);
  });
};
