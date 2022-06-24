import { NextFunction, Request, Response } from "express";

import { AuthAccessPayload } from "../../../../auth/domain/AuthAccessPayload";
import { Uow } from "../../../../shared/infrastructure/database/uow";
import { JsUuidGenerator } from "../../../../shared/infrastructure/JsUuidGenerator";
import { MovementCreate } from "../../../application/MovementCreate";
import { MovementCreateDto } from "../../dto/MovementCreate.dto";
import { TypeOrmMovementsRepository } from "../../movements.repository";
import { MovementPostResponse } from "./MovementPostResponse";

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
