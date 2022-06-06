import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequest } from "../../../../shared/infrastructure/requestErrors/BadRequest";
import { MovementIdGetDto } from "../../dto/MovementIdGet.dto";

interface Schema {
  params: {
    id: string;
  };
}

const validationSchema = Joi.object<Schema>({
  params: {
    id: Joi.string().uuid().required(),
  },
});

export const MovementIdGetValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = validationSchema.validate({
    params: req.params,
  });

  if (error || !value) {
    const badRequest = new BadRequest(error?.message);
    return res.status(badRequest.statusCode).json(badRequest.json());
  }

  req.body = new MovementIdGetDto({
    movementId: value.params.id,
  });

  next();
};
