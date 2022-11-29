export class MovementDeleteDto {
	readonly id: string;

	constructor(props: { id: string }) {
		this.id = props.id;
	}
}
