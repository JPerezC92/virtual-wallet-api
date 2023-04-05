import { AccountsRepository } from '@/Accounts/domain';
import { AccountDBToModel } from '@/Accounts/infrastructure/adapters';
import { Repository } from '@/Shared/infrastructure/repos';

export const AccountsPrismaRepository: Repository<AccountsRepository> = (
	db,
) => {
	return {
		createDefault: async (account) => {
			await db.accountDB.create({
				data: {
					id: account.id,
					currencyValue: account.currency,
					userId: account.userId,
					updatedAt: account.updatedAt,
					createdAt: account.createdAt,
				},
			});

			return account;
		},
		create: async (account, user) => {
			await db.userDB.update({
				where: { id: user.id, updatedAt: user.updatedAt },
				data: {
					accountList: {
						create: {
							id: account.id,
							currencyValue: account.currency,
							createdAt: account.createdAt,
						},
					},
				},
			});

			return account;
		},
		update: async (account) => {
			await db.accountDB.update({
				where: {
					id: account.id,
					updatedAt: account.updatedAt,
				},
				data: {
					income: account.income,
					expense: account.expense,
				},
			});
		},

		findById: async (accountId) => {
			const account = await db.accountDB.findUnique({
				where: { id: accountId },
			});

			if (!account) return;

			return AccountDBToModel(account);
		},
	};
};
