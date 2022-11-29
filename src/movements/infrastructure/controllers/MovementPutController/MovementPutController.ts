import { NextFunction, Request, Response } from "express";

import { AuthAccessPayload } from "@/Auth/domain";
import { MovementModify } from "@/Movements/application/MovementModify";
import { MovementNotFound } from "@/Movements/domain";
import { MovementPutResponse } from "@/Movements/infrastructure/controllers/MovementPutController/MovementPutResponse";
import { MovementUpdateDto } from "@/Movements/infrastructure/dto";
import { TypeOrmMovementsRepository } from "@/Movements/infrastructure/movements.repository";
import { Uow } from "@/Shared/infrastructure/database/uow";
import { ExceptionListener } from "@/Shared/infrastructure/ExceptionListener";
import { NotFound } from "@/Shared/infrastructure/requestErrors/NotFound";

export const MovementPutController = async (
	req: Request,
	res: Response,
	_: NextFunction
) => {
	try {
		const movementUpdateDto = req.body.movementUpdateDto as MovementUpdateDto;
		const accessPayload = req.body.accessPayload as AuthAccessPayload;
		const uow = Uow();

		const movementModify = MovementModify({
			movementsRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
		});

		await uow.transactional(async () => {
			await movementModify.execute({
				...movementUpdateDto,
				movementId: movementUpdateDto.id,
				userId: accessPayload.id,
			});
		});

		const movementPutResponse = new MovementPutResponse();

		return res
			.status(movementPutResponse.statusCode)
			.json(movementPutResponse.json());
	} catch (error) {
		const exceptionListener = ExceptionListener({
			[`${MovementNotFound.name}`]: NotFound,
		});

		const errorResponse = exceptionListener.onException(error as Error);

		return res.status(errorResponse.statusCode).json(errorResponse.json());
	}
};
