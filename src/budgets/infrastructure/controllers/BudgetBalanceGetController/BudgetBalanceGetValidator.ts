import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";
import { parseBearerToken } from "@/Shared/infrastructure/utils/parseBearerToken";

interface Schema {
	headers: { authorization: string };
}

const validatorSchema = Joi.object<Schema>({
	headers: { authorization: Joi.string().required() },
});

export const BudgetBalanceGetValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { value, error } = validatorSchema.validate({
		headers: { authorization: req.headers.authorization },
	});

	if (error || !value) {
		const badRequest = new BadRequest(error?.message);

		return res.status(badRequest.statusCode).json(badRequest.json());
	}

	req.body.accessToken = parseBearerToken(value.headers.authorization);

	next();
};
