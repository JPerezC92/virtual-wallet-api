export class MovementIdGetDto {
	movementId: string;

	constructor({ movementId }: { movementId: string }) {
		this.movementId = movementId;
	}
}
