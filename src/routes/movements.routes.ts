import { Router } from "express";

import { VerifyAccessToken } from "@/Auth/infrastructure/middlewares";
import {
	MovementDeleteController,
	MovementDeleteValidator,
} from "@/Movements/infrastructure/controllers/MovementDeleteController";
import {
	MovementGetController,
	MovementGetValidator,
} from "@/Movements/infrastructure/controllers/MovementGetController";
import {
	MovementIdGetController,
	MovementIdGetValidator,
} from "@/Movements/infrastructure/controllers/MovementIdGetController";
import {
	MovementPostController,
	MovementPostValidator,
} from "@/Movements/infrastructure/controllers/MovementPostController";
import {
	MovementPutController,
	MovementPutValidator,
} from "@/Movements/infrastructure/controllers/MovementPutController";

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
