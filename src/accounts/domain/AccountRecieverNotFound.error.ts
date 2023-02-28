import { DomainError } from '@/Shared/domain';

export class AccountRecieverNotFound extends DomainError {
	public name = AccountRecieverNotFound.name;
	public message = 'The reciever account does not exist';
	public code = 'ACCOUNT_RECIVEVER_NOT_FOUND';
}
