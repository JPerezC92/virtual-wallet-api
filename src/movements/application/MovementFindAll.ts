import { Account, AccountsRepository } from '@/Accounts/domain';
import {
	AccountNotFound,
	Movement,
	MovementsRepository,
} from '@/Movements/domain';
import { Adapter, UseCase } from '@/Shared/application';
import { IPaginationCriteria, Pagination } from '@/Shared/domain';
import { User, UserNotFound, UsersRepository } from '@/Users/domain';

type FindAllProps = {
	user: User;
	accountId: Account['id'];
	page: IPaginationCriteria['page'];
	limit: IPaginationCriteria['limit'];
};

/**
 * @throws { UserNotFound }
 * @throws { AccountNotFound }
 **/
export const MovementFindAll: <AdapterReturn>(
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
		execute: async ({ user, accountId, page, limit }) => {
			const [_user, account] = await Promise.all([
				usersRepository.findByUserId(user.id),
				accountsRepository.findById(accountId),
			]);

			if (!_user) throw new UserNotFound(user.id);

			if (!account) throw new AccountNotFound();

			const movementList = await movementsRepository.findAll(
				account.id,
				page,
				limit,
			);

			return outputAdapter(movementList);
		},
	};
};
