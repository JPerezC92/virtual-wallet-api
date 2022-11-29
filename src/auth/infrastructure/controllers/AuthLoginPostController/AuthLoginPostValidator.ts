import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { AuthLoginDto } from "@/Auth/infrastructure/dto";
import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";

interface Schema {
	body: {
		email: string;
		password: string;
	};
}

const validateSchema = Joi.object<Schema>({
	body: {
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	},
});

export const AuthLoginPostValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { error, value } = validateSchema.validate({ body: req.body });

	if (error || !value) {
		const badRequest = new BadRequest(error?.message);

		return res.status(badRequest.statusCode).json(badRequest.json());
	}

	const authLoginDto = new AuthLoginDto({
		email: value.body.email,
		password: value.body.password,
	});

	req.body = authLoginDto;

	return next();
};
