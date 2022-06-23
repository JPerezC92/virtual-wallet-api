import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequest } from "../../../../shared/infrastructure/requestErrors/BadRequest";
import { parseBearerToken } from "../../../../shared/infrastructure/utils/parseBearerToken";
import { MovementDeleteDto } from "../../dto/MovementDelete.dto";

interface Schema {
  params: { id: string };
  headers: { authorization: string };
}

const validatorSchema = Joi.object<Schema>({
  params: { id: Joi.string().uuid().required() },
  headers: { authorization: Joi.string().required() },
});

export const MovementDeleteValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = validatorSchema.validate({
    params: req.params,
    headers: { authorization: req.headers.authorization },
  });

  if (error || !value) {
    const badRequest = new BadRequest(error?.message);
    return res.status(badRequest.statusCode).json(badRequest.json());
  }

  const movementDeleteDto = new MovementDeleteDto({ ...value.params });

  req.body.movementDeleteDto = movementDeleteDto;
  req.body.accessToken = parseBearerToken(value.headers.authorization);

  return next();
};
