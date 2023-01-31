import { DomainError } from '@/Shared/domain';

export class UserAlreadyRegistered extends DomainError {
	public readonly name = UserAlreadyRegistered.name;
	public readonly message = 'Already have an account?';
	readonly code = 'USER_ALREADY_REGISTERED';
}
