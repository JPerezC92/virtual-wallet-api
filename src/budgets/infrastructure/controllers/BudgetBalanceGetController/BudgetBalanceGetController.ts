import { NextFunction, Request, Response } from "express";

import { AuthAccessPayload } from "@/Auth/domain";
import { BudgetCalculateBalance } from "@/Budgets/application/BudgetCalculateBalance";
import { BudgetBalanceGetResponse } from "@/Budgets/infrastructure/controllers/BudgetBalanceGetController";
import { TypeOrmMovementsRepository } from "@/Movements/infrastructure/movements.repository";
import { Uow } from "@/Shared/infrastructure/database/uow";
import { ExceptionListener } from "@/Shared/infrastructure/ExceptionListener";

export const BudgetBalanceGetController = async (
	req: Request,
	res: Response,
	_: NextFunction
) => {
	try {
		const accessPayload = req.body.accessPayload as AuthAccessPayload;
		const uow = Uow();

		const budgetCalculateBalance = BudgetCalculateBalance({
			movementsRepository: TypeOrmMovementsRepository({ db: uow.connection() }),
		});

		const balance = await uow.transactional(
			async () =>
				await budgetCalculateBalance.execute({ userId: accessPayload.id })
		);

		const budgetBalanceGetResponse = new BudgetBalanceGetResponse(balance);

		return res
			.status(budgetBalanceGetResponse.statusCode)
			.json(budgetBalanceGetResponse.json());
	} catch (error) {
		const exceptionListener = ExceptionListener();
		const requestError = exceptionListener.onException(error as Error);

		return res.status(requestError.statusCode).json(requestError.json());
	}
};
