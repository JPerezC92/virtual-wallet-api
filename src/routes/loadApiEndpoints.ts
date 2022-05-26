import { Application, Router } from "express";

import { budgetsRouter } from "./budgets.routes";
import { movementsRouter } from "./movements.routes";

export const mainRouterPath = "/api/v1";
const mainRouter = Router();

// routes
mainRouter.use(movementsRouter);
mainRouter.use(budgetsRouter);

export const loadApiEndpoints = (app: Application): void => {
  app.use(mainRouterPath, mainRouter);
};
