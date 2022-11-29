import { NextFunction, Request, Response } from "express";

import { AuthRefreshToken } from "@/Auth/application/AuthRefreshToken";
import { UserNotFound } from "@/Auth/domain";
import { AuthRefreshTokenGetResponse } from "@/Auth/infrastructure/controllers/AuthRefreshTokenGetController/AuthRefreshTokenGetResponse";
import {
	AuthAccessTokenEncoder,
	AuthRefreshTokenEncoder,
} from "@/Auth/infrastructure/service";
import { Uow } from "@/Shared/infrastructure/database/uow";
import { ExceptionListener } from "@/Shared/infrastructure/ExceptionListener";
import { JsUuidGenerator } from "@/Shared/infrastructure/JsUuidGenerator";
import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";
import { TypeOrmUsersRepository } from "@/Users/infrastructure/TypeOrmUsers.repository";

export const AuthRefreshTokenGetController = async (
	req: Request,
	res: Response,
	_: NextFunction
) => {
	try {
		const email = req.body.userEmail as string;
		const uow = Uow();

		const authRefreshToken = AuthRefreshToken({
			usersRepository: TypeOrmUsersRepository({ db: uow.connection() }),
			tokenAccessEncoder: AuthAccessTokenEncoder(),
			tokenRefreshEncoder: AuthRefreshTokenEncoder(),
			uuidGenerator: JsUuidGenerator(),
		});

		const { accessToken, refreshToken, user } = await uow.transactional(
			async () => {
				return await authRefreshToken.execute({ email });
			}
		);

		const authRefreshTokenGetResponse = new AuthRefreshTokenGetResponse({
			accessToken,
			refreshToken,
			user,
		});

		return res
			.status(authRefreshTokenGetResponse.statusCode)
			.json(authRefreshTokenGetResponse.json());
	} catch (error) {
		const exceptionListener = ExceptionListener({
			[`${UserNotFound.name}`]: BadRequest,
		});

		const exceptionResponse = exceptionListener.onException(error as Error);

		return res
			.status(exceptionResponse.statusCode)
			.json(exceptionResponse.json());
	}
};
