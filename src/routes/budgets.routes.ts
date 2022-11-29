import { Router } from "express";

import { VerifyAccessToken } from "@/Auth/infrastructure/middlewares";
import {
	BudgetBalanceGetController,
	BudgetBalanceGetValidator,
} from "@/Budgets/infrastructure/controllers/BudgetBalanceGetController";

export const budgetsRouter = Router();
export const budgetsRouterPath = "/budgets";
export const budgetBalancePath = `${budgetsRouterPath}/balance`;

budgetsRouter.get(
	budgetBalancePath,
	[BudgetBalanceGetValidator, VerifyAccessToken],
	BudgetBalanceGetController
);
