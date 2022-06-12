import { Router } from "express";

import { AuthLoginPostController } from "../auth/infrastructure/controllers/AuthLoginPostController/AuthLoginPostController";
import { AuthLoginPostValidator } from "../auth/infrastructure/controllers/AuthLoginPostController/AuthLoginPostValidator";
import { AuthRegisterPostController } from "../auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostController";
import { AuthRegisterPostValidator } from "../auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostValidator";

export const authRouter = Router();
export const authRouterPath = "/auth";
export const authRegisterPath = `${authRouterPath}/register`;
export const authLoginPath = `${authRouterPath}/login`;

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
