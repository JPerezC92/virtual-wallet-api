import { AccounstStubRepository } from '@/Accounts/infrastructure/repos';
import { MovementFindAll } from '@/Movements/application/MovementFindAll';
import { AccountNotFound } from '@/Movements/domain';
import {
	movementListStub,
	MovementsStubRepository,
} from '@/Movements/infrastructure/repos';
import { Pagination } from '@/Shared/domain';
import { UserNotFound } from '@/Users/domain';
import {
	userNotRegisteredStub,
	UsersStubRepository,
	userStub1,
} from '@/Users/infrastructure/repos';

describe('MovementFindAll use case', () => {
	test('should List al the movements successfully', async () => {
		const user = userStub1;
		const account = user.accountList[0];

		const movementList = await MovementFindAll(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({ user, accountId: account?.id || '', limit: 10, page: 1 });

		expect(movementList.movementList).toEqual(movementListStub);
		expect(movementList.pagination).toBeInstanceOf(Pagination);
	});

	test('should thrown an UserNotFound error', async () => {
		// GIVEN
		const user = userNotRegisteredStub;
		const account = user.accountList[0];

		// WHEN
		const res = MovementFindAll(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),

			(v) => v,
		).execute({ user, accountId: account?.id || '', limit: 10, page: 1 });

		// THEN
		expect(res).rejects.toThrowError(UserNotFound);
	});

	test('should thrown an AccountNotFound error', async () => {
		// GIVEN
		const user = userStub1;

		// WHEN
		const res = MovementFindAll(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({ user, accountId: 'wrong-account-id', limit: 10, page: 1 });

		// THEN
		expect(res).rejects.toThrowError(AccountNotFound);
	});
});
