import { Account } from '@/Accounts/domain';
import { AccountNotFound } from '@/Movements/domain';
import { Adapter, UseCase } from '@/Shared/application';
import { User, UserNotFound, UsersRepository } from '@/Users/domain';

/**
 * @throws { UserNotFound }
 * @throws { AccountNotFound }
 */
export const AccountFind: <OutputResult>(
	usersRepo: UsersRepository,
	adapter: Adapter<Account, OutputResult>,
) => UseCase<
	Promise<OutputResult>,
	{ accountId: Account['id']; userId: User['id'] }
> = (userRepo, adapter) => {
	return {
		execute: async ({ accountId, userId }) => {
			const user = await userRepo.findByUserId(userId);

			if (!user) throw new UserNotFound();

			const account = user.findAccount(accountId);

			if (!account) throw new AccountNotFound();

			return adapter(account);
		},
	};
};
