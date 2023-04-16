import { Account, AccountsRepository } from '@/Accounts/domain';
import { AccountNotFound } from '@/Movements/domain';
import { UseCase } from '@/Shared/application';
import { UserDetails, UserNotFound, UsersRepository } from '@/Users/domain';

export interface AccountFindTransferenceDetailsOut {
	account: Account;
	userDetails: UserDetails;
}

/**
 * @throws { UserNotFound }
 * @throws { AccountNotFound }
 **/
export const AccountFindTransferenceDetails: <AdapterReturn>(
	accountsRepo: AccountsRepository,
	usersRepo: UsersRepository,
	outputAdapter: (out: AccountFindTransferenceDetailsOut) => AdapterReturn,
) => UseCase<Promise<AdapterReturn>, { accountId: Account['id'] }> = (
	accountsRepo,
	usersRepo,
	outputAdapter,
) => {
	return {
		execute: async ({ accountId }) => {
			const account = await accountsRepo.findById(accountId);

			if (!account) throw new AccountNotFound();

			const user = await usersRepo.findByUserId(account.userId);

			if (!user) throw new UserNotFound();

			return outputAdapter({
				userDetails: user.userDetails,
				account,
			});
		},
	};
};
