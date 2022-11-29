import { BudgetMovementType, Movement } from "@/Movements/domain";

export class Budget {
	movementsList: Movement[];

	constructor(props: { movementsList: Movement[] }) {
		this.movementsList = props.movementsList;
	}

	public calculateBalance(): number {
		return this.calculateIncome() - this.calculateExpense();
	}

	public calculateIncome(): number {
		return this.movementsList
			.filter((movement) => movement.type === BudgetMovementType.INCOME)
			.reduce((acc, movement) => {
				return acc + movement.amount;
			}, 0);
	}

	public calculateExpense(): number {
		return this.movementsList
			.filter((movement) => movement.type === BudgetMovementType.EXPENSE)
			.reduce((acc, movement) => {
				return acc + movement.amount;
			}, 0);
	}
}
