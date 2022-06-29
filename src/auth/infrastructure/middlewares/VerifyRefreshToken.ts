import { NextFunction, Request, Response } from "express";

import { Uow } from "../../../shared/infrastructure/database/uow";
import { BadRequest } from "../../../shared/infrastructure/requestErrors/BadRequest";
import { TypeOrmUsersRepository } from "../../../users/infrastructure/TypeOrmUsers.repository";
import { AuthRefreshTokenEncoder } from "../service/AuthRefreshTokenEncoder";

export const VerifyRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uow = Uow();
  const connection = uow.connection();
  const badRequest = new BadRequest();

  const refreshToken = req.body.refreshToken as string;
  const refreshTokenEncoder = AuthRefreshTokenEncoder();

  try {
    const refreshTokenPayload = refreshTokenEncoder.decode(refreshToken);
    const typeOrmUsersRepository = TypeOrmUsersRepository({ db: connection });

    const user = await typeOrmUsersRepository.findByEmail(
      refreshTokenPayload.email
    );

    if (!user) {
      return res.status(badRequest.statusCode).json(badRequest.json());
    }

    const internalRefreshTokenPayload = refreshTokenEncoder.decode(
      user.refreshToken
    );

    if (internalRefreshTokenPayload.id !== refreshTokenPayload.id) {
      user.logout();

      await typeOrmUsersRepository.update(user);

      return res.status(badRequest.statusCode).json(badRequest.json());
    }

    req.body.userEmail = user.email;

    next();
  } catch (error) {
    return res.status(badRequest.statusCode).json(badRequest.json());
  } finally {
    connection.release();
  }
};
