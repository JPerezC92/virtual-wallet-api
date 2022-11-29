import { NextFunction, Request, Response } from "express";

import { AuthAccessPayload } from "@/Auth/domain";
import { MovementCreate } from "@/Movements/application/MovementCreate";
import { MovementPostResponse } from "@/Movements/infrastructure/controllers/MovementPostController/MovementPostResponse";
import { MovementCreateDto } from "@/Movements/infrastructure/dto";
import { TypeOrmMovementsRepository } from "@/Movements/infrastructure/movements.repository";
import { Uow } from "@/Shared/infrastructure/database/uow";
import { JsUuidGenerator } from "@/Shared/infrastructure/JsUuidGenerator";

export const MovementPostController = async (
	req: Request,
	res: Response,
	_: NextFunction
) => {
	const movementCreateDto = req.body.movementCreateDto as MovementCreateDto;
	const accessPayload = req.body.accessPayload as AuthAccessPayload;

	const uow = Uow();

	const movementCreate = MovementCreate({
		movementsRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
	});

	await uow.transactional(async () => {
		await movementCreate.execute({
			...movementCreateDto,
			movementId: JsUuidGenerator().generate(),
			userId: accessPayload.id,
		});
	});

	const movementPostResponse = new MovementPostResponse();

	return res
		.status(movementPostResponse.statusCode)
		.json(movementPostResponse.json());
};
