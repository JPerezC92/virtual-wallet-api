import { Router } from "express";

import { AuthLoginPostController } from "../auth/infrastructure/controllers/AuthLoginPostController/AuthLoginPostController";
import { AuthLoginPostValidator } from "../auth/infrastructure/controllers/AuthLoginPostController/AuthLoginPostValidator";
import { AuthLogoutGetController } from "../auth/infrastructure/controllers/AuthLogoutGetController/AuthLogoutGetController";
import { AuthLogoutGetValidator } from "../auth/infrastructure/controllers/AuthLogoutGetController/AuthLogoutGetValidator";
import { AuthRefreshTokenGetController } from "../auth/infrastructure/controllers/AuthRefreshTokenGetController/AuthRefreshTokenGetController";
import { AuthRefreshTokenGetValidator } from "../auth/infrastructure/controllers/AuthRefreshTokenGetController/AuthRefreshTokenGetValidator";
import { AuthRegisterPostController } from "../auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostController";
import { AuthRegisterPostValidator } from "../auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostValidator";
import { VerifyAccessToken } from "../auth/infrastructure/middlewares/VerifyAccessToken";
import { VerifyRefreshToken } from "../auth/infrastructure/middlewares/VerifyRefreshToken";

export const authRouter = Router();
export const authRouterPath = "/auth";
export const authRegisterPath = `${authRouterPath}/register`;
export const authLoginPath = `${authRouterPath}/login`;
export const authLogoutPath = `${authRouterPath}/logout`;
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
  authLogoutPath,
  [AuthLogoutGetValidator, VerifyAccessToken],
  AuthLogoutGetController
);

authRouter.get(
  authRefreshTokenPath,
  [AuthRefreshTokenGetValidator, VerifyRefreshToken],
  AuthRefreshTokenGetController
);
