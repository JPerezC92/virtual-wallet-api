import { Account } from '@/Accounts/domain';
import { DomainError } from '@/Shared/domain';

export class AccountNotFound extends DomainError {
	public code = 'ACCOUNT_NOT_FOUND';
	public name: string = AccountNotFound.name;
	public message = 'The account was not found';

	constructor(accountId?: Account['id']) {
		super();
		this.message = accountId
			? `The account ${accountId} was not found`
			: this.message;
	}
}
