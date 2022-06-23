import { Router } from "express";

import { VerifyAccessToken } from "../auth/infrastructure/middlewares/VerifyAccessToken";
import { BudgetBalanceGetController } from "../budgets/infrastructure/controllers/BudgetBalanceGetController/BudgetBalanceGetController";
import { BudgetBalanceGetValidator } from "../budgets/infrastructure/controllers/BudgetBalanceGetController/BudgetBalanceGetValidator";

export const budgetsRouter = Router();
export const budgetsRouterPath = "/budgets";
export const budgetBalancePath = `${budgetsRouterPath}/balance`;

budgetsRouter.get(
  budgetBalancePath,
  [BudgetBalanceGetValidator, VerifyAccessToken],
  BudgetBalanceGetController
);
