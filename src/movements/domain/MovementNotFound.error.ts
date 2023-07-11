import { Movement } from '@/Movements/domain/Movement.interface';
import { DomainError } from '@/Shared/domain';

export class MovementNotFound extends DomainError {
	public code = 'MOVEMENT_NOT_FOUND';
	public name: string = MovementNotFound.name;
	public message = 'The movement was not found';

	constructor(movementId?: Movement['id']) {
		super();
		this.message = movementId
			? `The movement ${movementId} was not found`
			: this.message;
	}
}
