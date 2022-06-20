import { NextFunction, Request, Response } from "express";

import { Uow } from "../../../../shared/infrastructure/database/uow";
import { ExceptionListener } from "../../../../shared/infrastructure/ExceptionListener";
import { JsUuidGenerator } from "../../../../shared/infrastructure/JsUuidGenerator";
import { BadRequest } from "../../../../shared/infrastructure/requestErrors/BadRequest";
import { TypeOrmUsersRepository } from "../../../../users/infrastructure/TypeOrmUsers.repository";
import { AuthRefreshToken } from "../../../application/AuthRefreshToken";
import { UserNotFound } from "../../../domain/UserNotFound";
import { AuthAccessTokenEncoder } from "../../service/AuthAccessTokenEncoder";
import { AuthRefreshTokenEncoder } from "../../service/AuthRefreshTokenEncoder";
import { AuthRefreshTokenGetResponse } from "./AuthRefreshTokenGetResponse";

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
