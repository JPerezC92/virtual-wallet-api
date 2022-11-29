import { NextFunction, Request, Response } from "express";

import { AuthRegister } from "@/Auth/application/AuthRegister";
import { UserAlreadyExists } from "@/Auth/domain";
import { AuthRegisterPostResponse } from "@/Auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostResponse";
import { UserCreateDto } from "@/Auth/infrastructure/dto";
import {
	AuthAccessTokenEncoder,
	AuthRefreshTokenEncoder,
	BcryptPasswordEncryptor,
} from "@/Auth/infrastructure/service";
import { Uow } from "@/Shared/infrastructure/database/uow";
import { ExceptionListener } from "@/Shared/infrastructure/ExceptionListener";
import { JsUuidGenerator } from "@/Shared/infrastructure/JsUuidGenerator";
import { Conflict } from "@/Shared/infrastructure/requestErrors/Conflict";
import { TypeOrmUsersRepository } from "@/Users/infrastructure/TypeOrmUsers.repository";

export const AuthRegisterPostController = async (
	req: Request,
	res: Response,
	_: NextFunction
) => {
	try {
		const userCreateDto = req.body as UserCreateDto;
		const uow = Uow();

		const authRegister = AuthRegister({
			usersRepository: TypeOrmUsersRepository({ db: uow.connection() }),
			passwordEncryptor: BcryptPasswordEncryptor(),
			tokenAccessEncoder: AuthAccessTokenEncoder(),
			tokenRefreshEncoder: AuthRefreshTokenEncoder(),
			uuidGenerator: JsUuidGenerator(),
		});

		const { accessToken, refreshToken, user } = await uow.transactional(
			async () => await authRegister.execute({ ...userCreateDto })
		);

		const authRegisterGetResponse = new AuthRegisterPostResponse({
			accessToken,
			refreshToken,
			user,
		});

		return res
			.status(authRegisterGetResponse.statusCode)
			.json(authRegisterGetResponse.json());
	} catch (error) {
		const exceptionListener = ExceptionListener({
			[`${UserAlreadyExists.name}`]: Conflict,
		});

		const errorResponse = exceptionListener.onException(error as Error);

		return res.status(errorResponse.statusCode).json(errorResponse.json());
	}
};
