import { NextFunction, Request, Response } from "express";

import { Uow } from "../../../shared/infrastructure/database/uow";
import { MovementFindAll } from "../../application/MovementFindAll";
import { MovementsGetResponseDTO } from "../dto/MovementsGetResponse.dto";
import { TypeOrmMovementsRepository } from "../movements.repository";

export const MovementGetController = async (
  req: Request,
  res: Response<MovementsGetResponseDTO>,
  _: NextFunction
) => {
  const uow = Uow();

  const movementsFindAll = MovementFindAll({
    movementsRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
  });

  const movementList = await uow.transactional(
    async () => await movementsFindAll.execute()
  );

  const movementsGetResponseDTO = new MovementsGetResponseDTO(movementList);

  return res
    .status(movementsGetResponseDTO.statusCode)
    .json(movementsGetResponseDTO);
};
