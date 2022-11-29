export class MovementUpdateDto {
	id: string;
	concept: string;
	amount: number;
	date: string;

	constructor(props: {
		id: string;
		concept: string;
		amount: number;
		date: string;
	}) {
		this.id = props.id;
		this.concept = props.concept;
		this.amount = props.amount;
		this.date = props.date;
	}
}
