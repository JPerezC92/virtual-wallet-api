import { Router } from "express";

import { BudgetBalanceGetController } from "../budgets/infrastructure/controllers/BudgetBalanceGetController/BudgetBalanceGetController";

export const budgetsRouter = Router();
export const budgetsRouterPath = "/budgets";
export const budgetBalancePath = `${budgetsRouterPath}/balance`;

budgetsRouter.get(budgetBalancePath, BudgetBalanceGetController);
