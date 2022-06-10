import JoiDate from "@joi/date";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequest } from "../../../../shared/infrastructure/requestErrors/BadRequest";
import { MovementUpdateDto } from "../../dto/MovementUpdateDto";

const JoiExtended = Joi.extend(JoiDate) as typeof Joi;

const validatorSchema = JoiExtended.object<MovementUpdateDto>({
  id: JoiExtended.string().uuid().required(),
  concept: JoiExtended.string().max(250).required(),
  amount: JoiExtended.number().min(0).required(),
  date: JoiExtended.date().format("YYYY-MM-DD").required(),
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
