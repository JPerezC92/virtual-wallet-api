import { BudgetMovementType } from "@/Movements/domain";

export class MovementEndpointDto {
	public id: string;
	public concept: string;
	public amount: number;
	public date: string;
	public type: BudgetMovementType;

	constructor(props: {
		id: string;
		concept: string;
		amount: number;
		date: string;
		type: BudgetMovementType;
	}) {
		this.id = props.id;
		this.concept = props.concept;
		this.amount = props.amount;
		this.date = props.date;
		this.type = props.type;
	}
}
