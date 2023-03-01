import { DomainError } from '@/Shared/domain';

export class AccountAlreadyCreated extends DomainError {
	public name = AccountAlreadyCreated.name;
	public message = 'Already has an account for this currency.';
	public code = 'ACCOUNT_ALREADY_CREATED';

	constructor(currency?: string) {
		super();
		this.message = currency
			? `Already has an account for the currency ${currency}`
			: this.message;
	}
}
