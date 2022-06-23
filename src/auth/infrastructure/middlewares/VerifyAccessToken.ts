import { NextFunction, Request, Response } from "express";

import { BadRequest } from "../../../shared/infrastructure/requestErrors/BadRequest";
import { AuthAccessTokenEncoder } from "../service/AuthAccessTokenEncoder";

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

    next();
  } catch (error) {
    const badRequest = new BadRequest();

    return res.status(badRequest.statusCode).json(badRequest.json());
  }
};
