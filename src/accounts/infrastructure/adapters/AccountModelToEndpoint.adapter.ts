import { Account } from '@/Accounts/domain';
import * as accountSchemas from '@/Accounts/infrastructure/schemas';

export function AccountModelToEndpoint(
	account: Account,
): accountSchemas.AccountEndpoint {
	return accountSchemas.AccountEndpoint.parse(account);
}
