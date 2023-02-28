import { DomainError } from '@/Shared/domain';

export class CurrencyDoesntMatch extends DomainError {
	public name = CurrencyDoesntMatch.name;
	public message = 'Currency suplied and the account currency are not the same';
	public code = 'CURRENCY_INVALID';
}
