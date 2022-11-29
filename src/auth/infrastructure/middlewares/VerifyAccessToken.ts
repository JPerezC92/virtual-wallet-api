import { NextFunction, Request, Response } from "express";

import { AuthAccessTokenEncoder } from "@/Auth/infrastructure/service";
import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";

export const VerifyAccessToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const accessToken = req.body.accessToken as string;
		const accessTokenEncoder = AuthAccessTokenEncoder();

		const accessTokenPayload = accessTokenEncoder.decode(accessToken);

		req.body.accessPayload = accessTokenPayload;

		return next();
	} catch (error) {
		const badRequest = new BadRequest();

		return res.status(badRequest.statusCode).json(badRequest.json());
	}
};
