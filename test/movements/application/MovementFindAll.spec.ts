import { MovementFindAll } from '@/Movements/application/MovementFindAll';
import { AccountNotFound, Movement } from '@/Movements/domain';
import { Pagination } from '@/Shared/domain';
import { AccountsMockRepository } from '@/Test/accounts/infrastructure';
import { MovementsMockRespository } from '@/Test/movements/infrastructure';
import { userMock } from '@/Test/users/fixtures';
import { UsersMockRepository } from '@/Test/users/infrastructure';
import { UserNotFound } from '@/Users/domain';

const movementListMock = [
	'Movement 1',
	'Movement 2',
	'Movement 3',
	'Movement 4',
];

describe('MovementFindAll use case', () => {
	test('should List al the movements successfully', async () => {
		const user = userMock();
		const account = user.accountList[0];

		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValue(user);
		const accountsMockRepository = AccountsMockRepository();
		accountsMockRepository.findById.mockResolvedValue(account);

		const movementsMockRespository = MovementsMockRespository();
		movementsMockRespository.findAll.mockResolvedValue({
			movementList: movementListMock as unknown as Movement[],
			pagination: Pagination.empty(),
		});

		const movementList = await MovementFindAll(
			accountsMockRepository,
			movementsMockRespository,
			usersMockRepository,
			(v) => v,
		).execute({ user, accountId: account?.id || '', limit: 10, page: 1 });

		expect(movementList.movementList).toEqual(movementListMock);
		expect(movementList.pagination).toBeInstanceOf(Pagination);
	});

	test('should thrown an UserNotFound error', async () => {
		const user = userMock();
		const account = user.accountList[0];

		const usersMockRepository = UsersMockRepository();
		const accountsMockRepository = AccountsMockRepository();

		const movementsMockRespository = MovementsMockRespository();
		movementsMockRespository.findAll.mockResolvedValue({
			movementList: movementListMock as unknown as Movement[],
			pagination: Pagination.empty(),
		});

		try {
			const res = await MovementFindAll(
				accountsMockRepository,
				movementsMockRespository,
				usersMockRepository,
				(v) => v,
			).execute({ user, accountId: account?.id || '', limit: 10, page: 1 });

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(UserNotFound);
		}
	});

	test('should thrown an AccountNotFound error', async () => {
		const user = userMock();
		const account = user.accountList[0];

		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValue(user);
		const accountsMockRepository = AccountsMockRepository();

		const movementsMockRespository = MovementsMockRespository();
		movementsMockRespository.findAll.mockResolvedValue({
			movementList: movementListMock as unknown as Movement[],
			pagination: Pagination.empty(),
		});

		try {
			const res = await MovementFindAll(
				accountsMockRepository,
				movementsMockRespository,
				usersMockRepository,
				(v) => v,
			).execute({ user, accountId: account?.id || '', limit: 10, page: 1 });

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(AccountNotFound);
		}
	});
});
