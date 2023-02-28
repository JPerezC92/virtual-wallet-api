import { DomainError } from '@/Shared/domain';

export class NotEnoughMoney extends DomainError {
	public name = NotEnoughMoney.name;
	public message = 'The account has not enough money';
	public code = 'NOT_ENOUGH_MONEY';
}
