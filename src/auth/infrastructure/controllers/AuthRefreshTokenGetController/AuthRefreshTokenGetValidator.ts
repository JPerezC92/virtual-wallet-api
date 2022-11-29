import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";
import { parseBearerToken } from "@/Shared/infrastructure/utils/parseBearerToken";

interface Schema {
	headers: {
		"x-refresh-token": string;
	};
}

const validatorSchema = Joi.object<Schema>({
	headers: {
		"x-refresh-token": Joi.string()
			.pattern(/bearer/i)
			.required(),
	},
}).options({
	allowUnknown: true,
});

export const AuthRefreshTokenGetValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { error, value } = validatorSchema.validate({ headers: req.headers });

	if (error || !value) {
		const badRequest = new BadRequest(error?.message);

		return res.status(badRequest.statusCode).json(badRequest.json());
	}

	req.body.refreshToken = parseBearerToken(value.headers["x-refresh-token"]);

	next();
};
