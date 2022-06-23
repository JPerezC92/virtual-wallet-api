import { NextFunction, Request, Response } from "express";

import { Uow } from "../../../../shared/infrastructure/database/uow";
import { ExceptionListener } from "../../../../shared/infrastructure/ExceptionListener";
import { NotFound } from "../../../../shared/infrastructure/requestErrors/NotFound";
import { MovementDelete } from "../../../application/MovementDelete";
import { MovementNotFound } from "../../../domain/MovementNotFound";
import { MovementDeleteDto } from "../../dto/MovementDelete.dto";
import { TypeOrmMovementsRepository } from "../../movements.repository";
import { MovementDeleteResponse } from "./MovementDeleteResponse";

export const MovementDeleteController = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  try {
    const movementDeleteDto = req.body.movementDeleteDto as MovementDeleteDto;
    const uow = Uow();

    const movementDelete = MovementDelete({
      movementRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
    });

    await uow.transactional(
      async () =>
        await movementDelete.execute({ movementId: movementDeleteDto.id })
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
