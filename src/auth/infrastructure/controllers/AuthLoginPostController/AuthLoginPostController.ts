import { Request, Response } from "express";

import { AuthLogin } from "@/Auth/application/AuthLogin";
import { InvalidCredentials } from "@/Auth/domain";
import { AuthLoginPostResponse } from "@/Auth/infrastructure/controllers/AuthLoginPostController";
import { AuthLoginDto } from "@/Auth/infrastructure/dto";
import {
	AuthAccessTokenEncoder,
	AuthRefreshTokenEncoder,
	BcryptPasswordEncryptor,
} from "@/Auth/infrastructure/service";
import { Uow } from "@/Shared/infrastructure/database/uow";
import { ExceptionListener } from "@/Shared/infrastructure/ExceptionListener";
import { JsUuidGenerator } from "@/Shared/infrastructure/JsUuidGenerator";
import { UnprocessableEntity } from "@/Shared/infrastructure/requestErrors/UnprocessableEntity";
import { TypeOrmUsersRepository } from "@/Users/infrastructure/TypeOrmUsers.repository";

export const AuthLoginPostController = async (req: Request, res: Response) => {
	try {
		const authLoginDto = req.body as AuthLoginDto;
		const uow = Uow();

		const authLogin = AuthLogin({
			usersRepository: TypeOrmUsersRepository({ db: uow.connection() }),
			passwordEncryptor: BcryptPasswordEncryptor(),
			tokenAccessEncoder: AuthAccessTokenEncoder(),
			tokenRefreshEncoder: AuthRefreshTokenEncoder(),
			uuidGenerator: JsUuidGenerator(),
		});

		const { accessToken, refreshToken, user } = await uow.transactional(
			async () => await authLogin.execute(authLoginDto)
		);

		const authLoginPostResponse = new AuthLoginPostResponse({
			accessToken,
			refreshToken,
			user,
		});

		return res
			.status(authLoginPostResponse.statusCode)
			.json(authLoginPostResponse.json());
	} catch (error) {
		const exceptionListener = ExceptionListener({
			[`${InvalidCredentials.name}`]: UnprocessableEntity,
		});

		const exceptionResponse = exceptionListener.onException(error as Error);

		return res
			.status(exceptionResponse.statusCode)
			.json(exceptionResponse.json());
	}
};
