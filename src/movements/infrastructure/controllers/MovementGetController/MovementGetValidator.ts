import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequest } from "../../../../shared/infrastructure/requestErrors/BadRequest";
import { OrderType } from "../../../domain/OrderType";
import { MovementGetDto } from "../../dto/MovementGet.dto";

interface Schema {
  query: {
    page: number;
    limit: number;
    order: OrderType;
  };
}

export const validatorSchema = Joi.object<Schema>({
  query: {
    page: Joi.number().positive(),
    limit: Joi.number().positive(),
    order: Joi.string().valid(OrderType.ASC, OrderType.DESC),
  },
});

export const MovementGetValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = validatorSchema.validate({
    query: req.query,
  });

  if (error || !value) {
    const badRequest = new BadRequest(error?.message);
    return res.status(badRequest.statusCode).json(badRequest.json());
  }

  req.body = new MovementGetDto({
    limit: value.query.limit,
    page: value.query.page,
    order: value.query.order,
  });

  return next();
};
