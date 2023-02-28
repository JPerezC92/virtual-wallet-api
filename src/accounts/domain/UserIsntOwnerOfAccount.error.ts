import { Account } from '@/Accounts/domain/Account.model';
import { DomainError } from '@/Shared/domain';

export class UserIsntOwnerOfAccount extends DomainError {
	public name = UserIsntOwnerOfAccount.name;
	public message = 'User does not have register the account suplied';
	public code = 'USER_NOT_OWNER';

	constructor(accountId?: Account['id']) {
		super();
		this.message = accountId
			? `User does not have register the account id: ${accountId}`
			: this.message;
	}
}
