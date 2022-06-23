import JoiDate from "@joi/date";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequest } from "../../../../shared/infrastructure/requestErrors/BadRequest";
import { parseBearerToken } from "../../../../shared/infrastructure/utils/parseBearerToken";
import { MovementUpdateDto } from "../../dto/MovementUpdateDto";

const JoiExtended = Joi.extend(JoiDate) as typeof Joi;

interface Schema {
  body: MovementUpdateDto;
  headers: { authorization: string };
  params: { id: string };
}

const validatorSchema = JoiExtended.object<Schema>({
  headers: { authorization: Joi.string().required() },
  body: {
    concept: JoiExtended.string().max(250).required(),
    amount: JoiExtended.number().min(0).required(),
    date: JoiExtended.date().format("YYYY-MM-DD").required(),
  },
  params: { id: JoiExtended.string().uuid().required() },
});

export const MovementPutValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = validatorSchema.validate({
    body: { ...req.body },
    headers: { authorization: req.headers.authorization },
    params: { ...req.params },
  });

  if (error || !value) {
    const badRequest = new BadRequest(error?.message);
    return res.status(badRequest.statusCode).json(badRequest.json());
  }

  req.body.movementUpdateDto = new MovementUpdateDto({
    ...value.params,
    ...value.body,
  });

  req.body.accessToken = parseBearerToken(value.headers.authorization);

  return next();
};
