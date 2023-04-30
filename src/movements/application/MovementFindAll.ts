import { Account, AccountsRepository } from '@/Accounts/domain';
import {
	AccountNotFound,
	Movement,
	MovementsRepository,
	MovementType,
} from '@/Movements/domain';
import { Adapter, UseCase } from '@/Shared/application';
import { IPaginationCriteria, Pagination } from '@/Shared/domain';
import { User, UserNotFound, UsersRepository } from '@/Users/domain';

type FindAllProps = {
	user: User;
	accountId: Account['id'];
	page: IPaginationCriteria['page'];
	limit: IPaginationCriteria['limit'];
	operation: MovementType;
	concept: Movement['concept'];
};

/**
 * @throws { UserNotFound }
 * @throws { AccountNotFound }
 **/
export const MovementFindByCriteria: <AdapterReturn>(
	accountsRepository: AccountsRepository,
	movementsRepository: MovementsRepository,
	usersRepository: UsersRepository,
	outputAdapter: Adapter<
		{
			movementList: Movement[];
			pagination: Pagination;
		},
		AdapterReturn
	>,
) => UseCase<Promise<AdapterReturn>, FindAllProps> = (
	accountsRepository,
	movementsRepository,
	usersRepository,
	outputAdapter,
) => {
	return {
		execute: async ({ user, accountId, page, limit, concept, operation }) => {
			const [_user, account] = await Promise.all([
				usersRepository.findByUserId(user.id),
				accountsRepository.findById(accountId),
			]);

			if (!_user) throw new UserNotFound(user.id);

			if (!account) throw new AccountNotFound();

			const movementList = await movementsRepository.findByCriteria(
				account.id,
				page,
				limit,
				operation,
				concept,
			);

			return outputAdapter(movementList);
		},
	};
};
