import { Account } from '@/Accounts/domain';
import { User } from '@/Users/domain';

export interface AccountsRepository {
	create: (account: Account, user: User) => Promise<Account>;
	createDefault: (account: Account) => Promise<Account>;
}
