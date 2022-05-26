import { NextFunction, Request, Response } from "express";

import { Uow } from "../../../../shared/infrastructure/database/uow";
import { MovementQuery } from "../../../application/MovementQuery";
import { MovementGetDto } from "../../dto/MovementGet.dto";
import { TypeOrmMovementsRepository } from "../../movements.repository";
import { MovementsGetResponse } from "./MovementsGetResponse";

export const MovementGetController = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const movementGetDto = req.body as MovementGetDto;
  const uow = Uow();

  const movementQuery = MovementQuery({
    movementsRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
  });

  const movementList = await uow.transactional(
    async () =>
      await movementQuery.execute({
        limit: movementGetDto.limit,
        page: movementGetDto.page,
        order: movementGetDto.order,
      })
  );

  const movementsGetResponse = new MovementsGetResponse(movementList);

  return res
    .status(movementsGetResponse.statusCode)
    .json(movementsGetResponse.json());
};
