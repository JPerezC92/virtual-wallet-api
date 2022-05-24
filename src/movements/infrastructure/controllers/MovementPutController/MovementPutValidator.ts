import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequest } from "../../../../shared/infrastructure/requestErrors/BadRequest";
import { MovementUpdateDto } from "../../dto/MovementUpdateDto";

const validatorSchema = Joi.object<MovementUpdateDto>({
  id: Joi.string().uuid().required(),
  concept: Joi.string().max(250).required(),
  amount: Joi.number().min(0).required(),
  date: Joi.date().required(),
});

export const MovementPutValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = validatorSchema.validate({
    ...req.body,
    ...req.params,
  });

  if (error || !value) {
    const badRequest = new BadRequest(error?.message);
    return res.status(badRequest.statusCode).json(badRequest.json());
  }

  req.body = new MovementUpdateDto(value);

  return next();
};
