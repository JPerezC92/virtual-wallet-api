import { Router } from "express";

import { MovementGetController } from "./controllers/MovementGetController";
import { MovementPostController } from "./controllers/MovementPostController/MovementPostController";
import { MovementPostValidator } from "./controllers/MovementPostController/MovementPostValidator";

export const movementsRouter = Router();
export const movementsRouterPath = "/movements";

movementsRouter.get("/", MovementGetController);
movementsRouter.post("/", [MovementPostValidator], MovementPostController);
