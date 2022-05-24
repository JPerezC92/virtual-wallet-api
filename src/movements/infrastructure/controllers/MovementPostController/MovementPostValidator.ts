import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequest } from "../../../../shared/infrastructure/requestErrors/BadRequest";
import { BudgetMovementType } from "../../../domain/BudgetMovementType";
import { MovementCreateDto } from "../../dto/MovementCreate.dto";

const reqBodySchema = Joi.object<MovementCreateDto>({
  amount: Joi.number().min(0).required(),
  concept: Joi.string().max(250).required(),
  type: Joi.string()
    .lowercase()
    .valid(
      BudgetMovementType.EXPENSE.toLowerCase(),
      BudgetMovementType.INCOME.toLowerCase()
    )
    .required(),
});

export const MovementPostValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = reqBodySchema.validate(req.body);

  if (error || !value) {
    const badRequest = new BadRequest(error?.message);
    return res.status(badRequest.statusCode).json(badRequest.json());
  }

  req.body = new MovementCreateDto(value);

  return next();
};
