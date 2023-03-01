import { Account, AccountsRepository } from '@/Accounts/domain';
import {
	AccountNotFound,
	Movement,
	MovementsRepository,
} from '@/Movements/domain';
import { Adapter, UseCase } from '@/Shared/application';
import { User, UserNotFound, UsersRepository } from '@/Users/domain';

type FindAllProps = { user: User; accountId: Account['id'] };

/**
 * @throws { UserNotFound }
 * @throws { AccountNotFound }
 **/
export const MovementFindAll: <AdapterReturn>(
	accountsRepository: AccountsRepository,
	movementsRepository: MovementsRepository,
	usersRepository: UsersRepository,
	outputAdapter: Adapter<Movement[], AdapterReturn>,
) => UseCase<Promise<AdapterReturn>, FindAllProps> = (
	accountsRepository,
	movementsRepository,
	usersRepository,
	outputAdapter,
) => {
	return {
		execute: async ({ user, accountId }) => {
			const [_user, account] = await Promise.all([
				usersRepository.findByUserId(user.id),
				accountsRepository.findById(accountId),
			]);

			if (!_user) throw new UserNotFound(user.id);

			if (!account) throw new AccountNotFound();

			const movementList = await movementsRepository.findAll(account.id);

			return outputAdapter(movementList);
		},
	};
};
