import { NextFunction, Request, Response } from "express";

import { AuthAccessPayload } from "@/Auth/domain";
import { MovementFind } from "@/Movements/application/MovementFind";
import { MovementNotFound } from "@/Movements/domain";
import { MovementIdGetResponse } from "@/Movements/infrastructure/controllers/MovementIdGetController/MovementIdGetResponse";
import { MovementIdGetDto } from "@/Movements/infrastructure/dto";
import { TypeOrmMovementsRepository } from "@/Movements/infrastructure/movements.repository";
import { Uow } from "@/Shared/infrastructure/database/uow";
import { ExceptionListener } from "@/Shared/infrastructure/ExceptionListener";
import { NotFound } from "@/Shared/infrastructure/requestErrors/NotFound";

export const MovementIdGetController = async (
	req: Request,
	res: Response,
	_: NextFunction
) => {
	try {
		const movementGetDto = req.body.movementIdGetDto as MovementIdGetDto;
		const accessPayload = req.body.accessPayload as AuthAccessPayload;
		const uow = Uow();

		const movementFind = MovementFind({
			movementRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
		});

		const movement = await uow.transactional(
			async () =>
				await movementFind.execute({
					...movementGetDto,
					userId: accessPayload.id,
				})
		);

		const movementIdGetResponse = new MovementIdGetResponse(movement);

		return res
			.status(movementIdGetResponse.statusCode)
			.json(movementIdGetResponse.json());
	} catch (error) {
		const exceptionListener = ExceptionListener({
			[MovementNotFound.name]: NotFound,
		});

		const errorResponse = exceptionListener.onException(error as Error);

		return res.status(errorResponse.statusCode).json(errorResponse.json());
	}
};
