import {
	BudgetMovementType,
	Movement,
	MovementsRepository,
	OrderType,
} from "@/Movements/domain";
import { UseCase } from "@/Shared/domain";

interface Input {
	page: number;
	limit: number;
	order: OrderType;
	movementType?: BudgetMovementType;
	userId: string;
}

interface Output {
	movementList: Movement[];
	pages: number;
}

export const MovementQuery: (props: {
	movementsRepository: MovementsRepository;
}) => UseCase<Promise<Output>, Input> = ({ movementsRepository }) => {
	return {
		execute: async ({ page, limit, order, movementType, userId }) => {
			const { movementList, pages } = await movementsRepository.query({
				page,
				limit,
				order,
				movementType,
				userId,
			});

			return { movementList, pages };
		},
	};
};
