import { NextFunction, Request, Response } from "express";

import { AuthAccessPayload } from "@/Auth/domain";
import { MovementDelete } from "@/Movements/application/MovementDelete";
import { MovementNotFound } from "@/Movements/domain";
import { MovementDeleteResponse } from "@/Movements/infrastructure/controllers/MovementDeleteController/MovementDeleteResponse";
import { MovementDeleteDto } from "@/Movements/infrastructure/dto";
import { TypeOrmMovementsRepository } from "@/Movements/infrastructure/movements.repository";
import { Uow } from "@/Shared/infrastructure/database/uow";
import { ExceptionListener } from "@/Shared/infrastructure/ExceptionListener";
import { NotFound } from "@/Shared/infrastructure/requestErrors/NotFound";

export const MovementDeleteController = async (
	req: Request,
	res: Response,
	_: NextFunction
) => {
	try {
		const movementDeleteDto = req.body.movementDeleteDto as MovementDeleteDto;
		const accessPayload = req.body.accessPayload as AuthAccessPayload;
		const uow = Uow();

		const movementDelete = MovementDelete({
			movementRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
		});

		await uow.transactional(
			async () =>
				await movementDelete.execute({
					movementId: movementDeleteDto.id,
					userId: accessPayload.id,
				})
		);

		const movementDeleteResponse = new MovementDeleteResponse();

		return res
			.status(movementDeleteResponse.statusCode)
			.json(movementDeleteResponse.json());
	} catch (error) {
		const exceptionListener = ExceptionListener({
			[MovementNotFound.name]: NotFound,
		});

		const errorResponse = exceptionListener.onException(error as Error);

		return res.status(errorResponse.statusCode).json(errorResponse.json());
	}
};
