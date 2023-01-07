import { DomainError } from '@/Shared/domain';

export class InvalidCredentials extends DomainError {
	public readonly name = InvalidCredentials.name;
	public readonly message = 'Invalid credentials';
	readonly code = 'INVALID_CREDENTIALS';

	constructor() {
		super();
	}
}
