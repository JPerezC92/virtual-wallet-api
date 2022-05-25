import { Application, Router } from "express";

import { movementsRouter } from "./movements.routes";

export const mainRouterPath = "/api/v1";
const mainRouter = Router();

// routes
mainRouter.use(movementsRouter);

export const loadApiEndpoints = (app: Application): void => {
  app.use(mainRouterPath, mainRouter);
};
