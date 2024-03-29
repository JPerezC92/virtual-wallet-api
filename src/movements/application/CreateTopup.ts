import { AccountsRepository } from '@/Accounts/domain';
import { UserIsntOwnerOfAccount } from '@/Accounts/domain/UserIsntOwnerOfAccount.error';
import { MovementsRepository } from '@/Movements/domain';
import { MovementTopUp } from '@/Movements/domain/MovementTopUp.model';
import { ITopupCreate } from '@/Movements/domain/TopupCreate.interface';
import { Adapter, UseCase } from '@/Shared/application';
import { User, UsersRepository } from '@/Users/domain';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';

type CreateTopupProps = {
	user: User;
	newTopup: Omit<ITopupCreate, 'currency' | 'userId'>;
};

/**
 * @throws { UserNotFound }
 * @throws { UserIsntOwnerOfAccount }
 */
export const CreateTopup: <AdapterReturn>(
	accountsRepository: AccountsRepository,
	movementsRepo: MovementsRepository,
	userRepo: UsersRepository,
	outputAdapter: Adapter<MovementTopUp, AdapterReturn>,
) => UseCase<Promise<AdapterReturn>, CreateTopupProps> = (
	accountsRepo,
	movementsRepo,
	usersRepo,
	outputAdapter,
) => {
	return {
		execute: async ({ user, newTopup }) => {
			const _user = await usersRepo.findByUserId(user.id);

			if (!_user) throw new UserNotFound(user.id);

			let account = _user.findAccount(newTopup.accountId);

			if (!account) {
				throw new UserIsntOwnerOfAccount(newTopup.accountId);
			}

			const topup = MovementTopUp.createNew({
				...newTopup,
				currency: account.currency,
			});

			account = account.doTopup(topup);

			await Promise.all([
				movementsRepo.create(topup),
				accountsRepo.update(account),
			]);

			return outputAdapter(topup);
		},
	};
};
