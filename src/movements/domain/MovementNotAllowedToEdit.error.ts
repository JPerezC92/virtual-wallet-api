import { Movement } from '@/Movements/domain/Movement.interface';
import { DomainError } from '@/Shared/domain';

export class MovementNotAllowedToEdit extends DomainError {
	public code = 'MOVEMENT_NOT_ALLOWED_TO_EDIT';
	public name: string = MovementNotAllowedToEdit.name;
	public message = 'The movement is not allowed to edit';

	constructor(movementId?: Movement['id']) {
		super();
		this.message = movementId
			? `The movement ${movementId} is not allowed to edit`
			: this.message;
	}
}
