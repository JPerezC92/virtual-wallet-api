import { DomainError } from '@/Shared/domain';

export class AccountSenderAndRecieverAreEqual extends DomainError {
	public code = 'ACCOUNT_SENDER_AND_RECIEVER_ARE_EQUAL';
	public name: string = AccountSenderAndRecieverAreEqual.name;
	public message = 'The account sender and reciever cant be equal.';
}
