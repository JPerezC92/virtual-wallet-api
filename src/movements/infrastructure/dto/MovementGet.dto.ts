import { BudgetMovementType, OrderType } from "@/Movements/domain";

export class MovementGetDto {
	page: number;
	limit: number;
	order: OrderType;
	movementType?: BudgetMovementType;

	constructor(props: {
		page: number;
		limit: number;
		order: OrderType;
		movementType?: BudgetMovementType;
	}) {
		this.page = props.page || 0;
		this.limit = props.limit || 0;
		this.order = props.order || OrderType.ASC;
		this.movementType = props.movementType;
	}
}
