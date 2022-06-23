import { Router } from "express";

import { VerifyAccessToken } from "../auth/infrastructure/middlewares/VerifyAccessToken";
import { MovementDeleteController } from "../movements/infrastructure/controllers/MovementDeleteController/MovementDeleteController";
import { MovementDeleteValidator } from "../movements/infrastructure/controllers/MovementDeleteController/MovementDeleteValidator";
import { MovementGetController } from "../movements/infrastructure/controllers/MovementGetController/MovementGetController";
import { MovementGetValidator } from "../movements/infrastructure/controllers/MovementGetController/MovementGetValidator";
import { MovementIdGetController } from "../movements/infrastructure/controllers/MovementIdGetController/MovementIdGetController";
import { MovementIdGetValidator } from "../movements/infrastructure/controllers/MovementIdGetController/MovementIdGetValidator";
import { MovementPostController } from "../movements/infrastructure/controllers/MovementPostController/MovementPostController";
import { MovementPostValidator } from "../movements/infrastructure/controllers/MovementPostController/MovementPostValidator";
import { MovementPutController } from "../movements/infrastructure/controllers/MovementPutController/MovementPutController";
import { MovementPutValidator } from "../movements/infrastructure/controllers/MovementPutController/MovementPutValidator";

export const movementsRouter = Router();
export const movementsRouterPath = "/movements";

movementsRouter.get(
  movementsRouterPath,
  [MovementGetValidator, VerifyAccessToken],
  MovementGetController
);

movementsRouter.post(
  movementsRouterPath,
  [MovementPostValidator, VerifyAccessToken],
  MovementPostController
);

movementsRouter.get(
  `${movementsRouterPath}/:id`,
  [MovementIdGetValidator, VerifyAccessToken],
  MovementIdGetController
);

movementsRouter.put(
  `${movementsRouterPath}/:id`,
  [MovementPutValidator, VerifyAccessToken],
  MovementPutController
);

movementsRouter.delete(
  `${movementsRouterPath}/:id`,
  [MovementDeleteValidator, VerifyAccessToken],
  MovementDeleteController
);
