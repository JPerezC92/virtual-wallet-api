import { DomainError } from '@/Shared/domain';

export class CurrencyNotFound extends DomainError {
	public code = 'CURRENCY_NOT_FOUND';
	public name: string = CurrencyNotFound.name;
	public message = 'The currency was not found';
	constructor(currency?: string) {
		super();
		this.message = currency
			? `Currency ${currency} was not found`
			: this.message;
	}
}
