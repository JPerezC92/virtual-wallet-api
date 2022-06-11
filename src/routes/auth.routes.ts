import { Router } from "express";

import { AuthRegisterPostController } from "../auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostController";
import { AuthRegisterPostValidator } from "../auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostValidator";

export const authRouter = Router();
export const authRouterPath = "/auth";
export const authRegisterPath = `${authRouterPath}/register`;

authRouter.post(
  authRegisterPath,
  [AuthRegisterPostValidator],
  AuthRegisterPostController
);
