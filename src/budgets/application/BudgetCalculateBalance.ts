import { Budget } from "@/Budgets/domain";
import { MovementsRepository } from "@/Movements/domain";
import { UseCase } from "@/Shared/domain";
import { User } from "@/Users/domain";

interface Input {
	userId: User["id"];
}

export const BudgetCalculateBalance: (props: {
	movementsRepository: MovementsRepository;
}) => UseCase<Promise<number>, Input> = ({ movementsRepository }) => {
	return {
		execute: async ({ userId }) => {
			const movementsList = await movementsRepository.getAll({ userId });
			const budget = new Budget({ movementsList });

			return budget.calculateBalance();
		},
	};
};
