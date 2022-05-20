import { Router } from "express";

import { MovementGetController } from "./controllers/MovementGetController";

export const movementsRouter = Router();
export const movementsRouterPath = "/movements";

movementsRouter.get("/", MovementGetController);
