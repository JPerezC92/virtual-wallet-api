import { Account } from '@/Accounts/domain';
import * as accountsSchemas from '@/Accounts/infrastructure/schemas';

export function AccountModelToEndpoint(
	account: Account,
): accountsSchemas.AccountEndpoint {
	return accountsSchemas.AccountEndpoint.parse(account);
}
