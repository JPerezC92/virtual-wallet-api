import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequest } from "../../../../shared/infrastructure/requestErrors/BadRequest";
import { MovementDeleteDto } from "../../dto/MovementDelete.dto";

const validatorSchema = Joi.object<{ params: { id: string } }>({
  params: { id: Joi.string().uuid().required() },
});

export const MovementDeleteValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = validatorSchema.validate({ params: req.params });

  if (error || !value) {
    const badRequest = new BadRequest(error?.message);
    return res.status(badRequest.statusCode).json(badRequest.json());
  }

  const movementDeleteDto = new MovementDeleteDto({ ...value.params });

  req.body = movementDeleteDto;

  return next();
};
