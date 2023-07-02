import { DomainError } from '@/Shared/domain';

export class IncorrectOldPassword extends DomainError {
	public code = 'INCORRECT_OLD_PASSWORD';
	public name = IncorrectOldPassword.name;
	public message = 'Incorrect old password';
}
