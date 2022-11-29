import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { UserCreateDto } from "@/Auth/infrastructure/dto";
import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";

interface Schema {
	body: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
	};
}

const schemaValidator = Joi.object<Schema>({
	body: {
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(50).required(),
	},
});

export const AuthRegisterPostValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { error, value } = schemaValidator.validate({ body: req.body });

	if (error || !value) {
		const badRequest = new BadRequest(error?.message);
		return res.status(badRequest.statusCode).json(badRequest.json());
	}

	req.body = new UserCreateDto(value.body);

	next();
};
