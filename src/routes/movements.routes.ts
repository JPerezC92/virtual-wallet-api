import { Router } from "express";

import { MovementDeleteController } from "../movements/infrastructure/controllers/MovementDeleteController/MovementDeleteController";
import { MovementDeleteValidator } from "../movements/infrastructure/controllers/MovementDeleteController/MovementDeleteValidator";
import { MovementGetController } from "../movements/infrastructure/controllers/MovementGetController/MovementGetController";
import { MovementGetValidator } from "../movements/infrastructure/controllers/MovementGetController/MovementGetValidator";
import { MovementPostController } from "../movements/infrastructure/controllers/MovementPostController/MovementPostController";
import { MovementPostValidator } from "../movements/infrastructure/controllers/MovementPostController/MovementPostValidator";
import { MovementPutController } from "../movements/infrastructure/controllers/MovementPutController/MovementPutController";
import { MovementPutValidator } from "../movements/infrastructure/controllers/MovementPutController/MovementPutValidator";

export const movementsRouter = Router();
export const movementsRouterPath = "/movements";

movementsRouter.get(
  movementsRouterPath,
  [MovementGetValidator],
  MovementGetController
);

movementsRouter.post(
  movementsRouterPath,
  [MovementPostValidator],
  MovementPostController
);

movementsRouter.put(
  `${movementsRouterPath}/:id`,
  [MovementPutValidator],
  MovementPutController
);

movementsRouter.delete(
  `${movementsRouterPath}/:id`,
  [MovementDeleteValidator],
  MovementDeleteController
);
