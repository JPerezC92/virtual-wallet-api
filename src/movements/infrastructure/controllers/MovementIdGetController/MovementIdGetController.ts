import { NextFunction, Request, Response } from "express";

import { Uow } from "../../../../shared/infrastructure/database/uow";
import { ExceptionListener } from "../../../../shared/infrastructure/ExceptionListener";
import { NotFound } from "../../../../shared/infrastructure/requestErrors/NotFound";
import { MovementFind } from "../../../application/MovementFind";
import { MovementNotFound } from "../../../domain/MovementNotFound";
import { MovementIdGetDto } from "../../dto/MovementIdGet.dto";
import { TypeOrmMovementsRepository } from "../../movements.repository";
import { MovementIdGetResponse } from "./MovementIdGetResponse";

export const MovementIdGetController = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const movementGetDto = req.body as MovementIdGetDto;
  const uow = Uow();

  const movementFind = MovementFind({
    movementRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
  });

  try {
    const movement = await uow.transactional(
      async () => await movementFind.execute(movementGetDto)
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
