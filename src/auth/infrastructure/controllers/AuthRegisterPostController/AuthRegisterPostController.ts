import { NextFunction, Request, Response } from "express";

import { Uow } from "../../../../shared/infrastructure/database/uow";
import { ExceptionListener } from "../../../../shared/infrastructure/ExceptionListener";
import { JsUuidGenerator } from "../../../../shared/infrastructure/JsUuidGenerator";
import { Conflict } from "../../../../shared/infrastructure/requestErrors/Conflict";
import { TypeOrmUsersRepository } from "../../../../users/infrastructure/TypeOrmUsers.repository";
import { AuthRegister } from "../../../application/AuthRegister";
import { UserAlreadyExists } from "../../../domain/UserAlreadyExists";
import { UserCreateDto } from "../../dto/UserCreate.dto";
import { AuthTokenEncoder } from "../../service/AuthTokenEncoder";
import { BcryptPasswordEncryptor } from "../../service/BcryptPasswordEncryptor";
import { TypeOrmAuthRepository } from "../../TypeOrmAuth.repository";
import { AuthRegisterPostResponse } from "./AuthRegisterPostResponse";

export const AuthRegisterPostController = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  try {
    const userCreateDto = req.body as UserCreateDto;
    const uow = Uow();

    const authRegister = AuthRegister({
      authRepository: TypeOrmAuthRepository({ db: uow.connection() }),
      usersRepository: TypeOrmUsersRepository({ db: uow.connection() }),
      passwordEncryptor: BcryptPasswordEncryptor(),
      tokenEncoder: AuthTokenEncoder(),
    });

    const accessToken = await uow.transactional(
      async () =>
        await authRegister.execute({
          ...userCreateDto,
          id: JsUuidGenerator().generate(),
        })
    );

    const authRegisterGetResponse = new AuthRegisterPostResponse(accessToken);

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
