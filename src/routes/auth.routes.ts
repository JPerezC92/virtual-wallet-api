import { Router } from "express";

import { AuthLoginPostController } from "../auth/infrastructure/controllers/AuthLoginPostController/AuthLoginPostController";
import { AuthLoginPostValidator } from "../auth/infrastructure/controllers/AuthLoginPostController/AuthLoginPostValidator";
import { AuthRefreshTokenGetController } from "../auth/infrastructure/controllers/AuthRefreshTokenGetController/AuthRefreshTokenGetController";
import { AuthRefreshTokenGetValidator } from "../auth/infrastructure/controllers/AuthRefreshTokenGetController/AuthRefreshTokenGetValidator";
import { AuthRegisterPostController } from "../auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostController";
import { AuthRegisterPostValidator } from "../auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostValidator";
import { VerifyRefreshToken } from "../auth/infrastructure/middlewares/VerifyRefreshToken";

export const authRouter = Router();
export const authRouterPath = "/auth";
export const authRegisterPath = `${authRouterPath}/register`;
export const authLoginPath = `${authRouterPath}/login`;
export const authRefreshTokenPath = `${authRouterPath}/refresh-token`;

authRouter.post(
  authRegisterPath,
  [AuthRegisterPostValidator],
  AuthRegisterPostController
);

authRouter.post(
  authLoginPath,
  [AuthLoginPostValidator],
  AuthLoginPostController
);

authRouter.get(
  authRefreshTokenPath,
  [AuthRefreshTokenGetValidator, VerifyRefreshToken],
  AuthRefreshTokenGetController
);
