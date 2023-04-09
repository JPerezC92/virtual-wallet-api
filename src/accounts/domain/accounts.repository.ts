import { Account } from '@/Accounts/domain';
import { User } from '@/Users/domain';

export interface AccountsRepository {
	findById(accountId: Account['id']): Promise<Account | undefined>;
	update(account: Account): Promise<void>;
	create: (account: Account, user: User) => Promise<Account>;
	createDefault: (account: Account) => Promise<Account>;
}
