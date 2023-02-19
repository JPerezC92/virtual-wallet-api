import { AccountsRepository } from '@/Accounts/domain';
import { Repository } from '@/Shared/infrastructure/repos';

export const AccountsPrismaRepository: Repository<AccountsRepository> = (
	db,
) => {
	return {
		create: async (account) => {
			await db.accountDB.create({
				data: {
					id: account.id,
					money: account.money,
					currencyValue: account.currency,
					userId: account.userId,
					updatedAt: account.updatedAt,
					createdAt: account.createdAt,
				},
			});

			return account;
		},
	};
};
