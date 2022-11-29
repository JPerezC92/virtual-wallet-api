import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { MovementIdGetDto } from "@/Movements/infrastructure/dto";
import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";
import { parseBearerToken } from "@/Shared/infrastructure/utils/parseBearerToken";

interface Schema {
	params: { id: string };
	headers: { authorization: string };
}

const validationSchema = Joi.object<Schema>({
	params: { id: Joi.string().uuid().required() },
	headers: { authorization: Joi.string().required() },
});

export const MovementIdGetValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { error, value } = validationSchema.validate({
		params: req.params,
		headers: { authorization: req.headers.authorization },
	});

	if (error || !value) {
		const badRequest = new BadRequest(error?.message);
		return res.status(badRequest.statusCode).json(badRequest.json());
	}

	req.body.movementIdGetDto = new MovementIdGetDto({
		movementId: value.params.id,
	});

	req.body.accessToken = parseBearerToken(value.headers.authorization);

	return next();
};
