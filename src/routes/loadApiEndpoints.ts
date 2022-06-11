import { Application, Router } from "express";

import { authRouter } from "./auth.routes";
import { budgetsRouter } from "./budgets.routes";
import { movementsRouter } from "./movements.routes";

export const mainRouterPath = "/api/v1";
const mainRouter = Router();

// routes
mainRouter.use(movementsRouter);
mainRouter.use(budgetsRouter);
mainRouter.use(authRouter);

export const loadApiEndpoints = (app: Application): void => {
  app.use(mainRouterPath, mainRouter);
};
