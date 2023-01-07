import { DomainError } from '@/Shared/domain';
import { User } from '@/Users/domain';

export class UserNotFound extends DomainError {
	public name = UserNotFound.name;
	public message = 'User was not found';
	public code = 'USER_NOT_FOUND';

	constructor(userId?: User['id']) {
		super();
		this.message = userId ? `${this.message} id: ${userId}` : this.message;
	}
}
