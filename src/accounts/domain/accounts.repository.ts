import { Account } from '@/Accounts/domain/Account.model';

export interface AccountsRepository {
	create: (account: Account) => Promise<Account>;
}
