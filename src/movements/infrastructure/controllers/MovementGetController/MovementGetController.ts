import { NextFunction, Request, Response } from "express";

import { AuthAccessPayload } from "@/Auth/domain";
import { MovementQuery } from "@/Movements/application/MovementQuery";
import { MovementsGetResponse } from "@/Movements/infrastructure/controllers/MovementGetController/MovementsGetResponse";
import { MovementGetDto } from "@/Movements/infrastructure/dto";
import { TypeOrmMovementsRepository } from "@/Movements/infrastructure/movements.repository";
import { Uow } from "@/Shared/infrastructure/database/uow";

export const MovementGetController = async (
	req: Request,
	res: Response,
	_: NextFunction
) => {
	const movementGetDto = req.body.movementGetDto as MovementGetDto;
	const accessPayload = req.body.accessPayload as AuthAccessPayload;
	const uow = Uow();

	const movementQuery = MovementQuery({
		movementsRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
	});

	const { movementList, pages } = await uow.transactional(
		async () =>
			await movementQuery.execute({
				limit: movementGetDto.limit,
				page: movementGetDto.page,
				order: movementGetDto.order,
				movementType: movementGetDto.movementType,
				userId: accessPayload.id,
			})
	);

	const movementsGetResponse = new MovementsGetResponse({
		movementList,
		pages,
	});

	return res
		.status(movementsGetResponse.statusCode)
		.json(movementsGetResponse.json());
};
