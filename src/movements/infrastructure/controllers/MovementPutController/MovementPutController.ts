import { NextFunction, Request, Response } from "express";

import { Uow } from "../../../../shared/infrastructure/database/uow";
import { ExceptionListener } from "../../../../shared/infrastructure/ExceptionListener";
import { NotFound } from "../../../../shared/infrastructure/requestErrors/NotFound";
import { MovementModify } from "../../../application/MovementModify";
import { MovementNotFound } from "../../../domain/MovementNotFound";
import { MovementUpdateDto } from "../../dto/MovementUpdateDto";
import { TypeOrmMovementsRepository } from "../../movements.repository";
import { MovementPutResponse } from "./MovementPutResponse";

export const MovementPutController = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  try {
    const movementUpdateDto = req.body.movementUpdateDto as MovementUpdateDto;
    const uow = Uow();

    const movementModify = MovementModify({
      movementsRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
    });

    await uow.transactional(async () => {
      await movementModify.execute(movementUpdateDto);
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
