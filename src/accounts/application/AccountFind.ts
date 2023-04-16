import { Account, AccountsRepository } from '@/Accounts/domain';
import { AccountNotFound } from '@/Movements/domain';
import { Adapter, UseCase } from '@/Shared/application';
import { User, UserNotFound, UsersRepository } from '@/Users/domain';

/**
 * @throws { UserNotFound }
 * @throws { AccountNotFound }
 */
export const AccountFind: <OutputResult>(
	accountsRepo: AccountsRepository,
	usersRepo: UsersRepository,
	adapter: Adapter<Account, OutputResult>,
) => UseCase<
	Promise<OutputResult>,
	{ accountId: Account['id']; userId: User['id'] }
> = (accountsRepo, userRepo, adapter) => {
	return {
		execute: async ({ accountId, userId }) => {
			const user = await userRepo.findByUserId(userId);

			if (!user) throw new UserNotFound();

			const account = await accountsRepo.findById(accountId);

			if (!account || !user.findAccount(accountId)) throw new AccountNotFound();

			return adapter(account);
		},
	};
};
