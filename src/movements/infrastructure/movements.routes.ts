import { Router } from "express";

import { MovementDeleteController } from "./controllers/MovementDeleteController/MovementDeleteController";
import { MovementDeleteValidator } from "./controllers/MovementDeleteController/MovementDeleteValidator";
import { MovementGetController } from "./controllers/MovementGetController";
import { MovementPostController } from "./controllers/MovementPostController/MovementPostController";
import { MovementPostValidator } from "./controllers/MovementPostController/MovementPostValidator";
import { MovementPutController } from "./controllers/MovementPutController/MovementPutController";
import { MovementPutValidator } from "./controllers/MovementPutController/MovementPutValidator";

export const movementsRouter = Router();
export const movementsRouterPath = "/movements";

movementsRouter.get("/", MovementGetController);
movementsRouter.post("/", [MovementPostValidator], MovementPostController);
movementsRouter.put("/:id", [MovementPutValidator], MovementPutController);
movementsRouter.delete(
  "/:id",
  [MovementDeleteValidator],
  MovementDeleteController
);
