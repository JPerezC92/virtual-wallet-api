import { NextFunction, Request, Response } from "express";

import { Uow } from "../../../../shared/infrastructure/database/uow";
import { ExceptionListener } from "../../../../shared/infrastructure/ExceptionListener";
import { NotFound } from "../../../../shared/infrastructure/requestErrors/NotFound";
import { TypeOrmUsersRepository } from "../../../../users/infrastructure/TypeOrmUsers.repository";
import { AuthLogout } from "../../../application/AuthLogout";
import { AuthAccessPayload } from "../../../domain/AuthAccessPayload";
import { UserNotFound } from "../../../domain/UserNotFound";
import { AuthLogoutGetResponse } from "./AuthLogoutGetResponse";

export const AuthLogoutGetController = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  try {
    const accessPayload = req.body.accessPayload as AuthAccessPayload;

    const uow = Uow();

    const authLogout = AuthLogout({
      usersRepository: TypeOrmUsersRepository({ db: uow.connection() }),
    });

    await uow.transactional(
      async () => await authLogout.execute(accessPayload)
    );

    const authLogoutGetResponse = new AuthLogoutGetResponse();

    return res
      .status(authLogoutGetResponse.statusCode)
      .json(authLogoutGetResponse.json());
  } catch (error) {
    const exceptionListener = ExceptionListener({
      [`${UserNotFound.name}`]: NotFound,
    });

    const errorResponse = exceptionListener.onException(error as Error);

    return res.status(errorResponse.statusCode).json(errorResponse.json());
  }
};
