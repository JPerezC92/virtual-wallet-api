import { Router } from "express";

import {
	AuthLoginPostController,
	AuthLoginPostValidator,
} from "@/Auth/infrastructure/controllers/AuthLoginPostController";
import {
	AuthLogoutGetController,
	AuthLogoutGetValidator,
} from "@/Auth/infrastructure/controllers/AuthLogoutGetController";
import {
	AuthRefreshTokenGetController,
	AuthRefreshTokenGetValidator,
} from "@/Auth/infrastructure/controllers/AuthRefreshTokenGetController";
import {
	AuthRegisterPostController,
	AuthRegisterPostValidator,
} from "@/Auth/infrastructure/controllers/AuthRegisterPostController";
import {
	VerifyAccessToken,
	VerifyRefreshToken,
} from "@/Auth/infrastructure/middlewares";

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
