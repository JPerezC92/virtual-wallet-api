import { NextFunction, Request, Response } from "express";

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
  const uow = Uow();

  const movementCreate = MovementCreate({
    movementsRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
  });

  await uow.transactional(async () => {
    await movementCreate.execute({
      ...movementCreateDto,
      id: JsUuidGenerator().generate(),
    });
  });

  const movementPostResponse = new MovementPostResponse();

  return res
    .status(movementPostResponse.statusCode)
    .json(movementPostResponse.json());
};
