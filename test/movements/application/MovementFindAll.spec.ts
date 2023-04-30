import { AccounstStubRepository } from '@/Accounts/infrastructure/repos';
import { MovementFindByCriteria } from '@/Movements/application/MovementFindAll';
import { AccountNotFound, MovementType } from '@/Movements/domain';
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

		const movementList = await MovementFindByCriteria(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user,
			accountId: account?.id || '',
			limit: 10,
			page: 1,
			operation: MovementType.ALL,
			concept: '',
		});

		expect(movementList.movementList).toEqual(movementListStub);
		expect(movementList.pagination).toBeInstanceOf(Pagination);
	});

	test('should thrown an UserNotFound error', async () => {
		// GIVEN
		const user = userNotRegisteredStub;
		const account = user.accountList[0];

		// WHEN
		const res = MovementFindByCriteria(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),

			(v) => v,
		).execute({
			user,
			accountId: account?.id || '',
			limit: 10,
			page: 1,
			operation: MovementType.ALL,
			concept: '',
		});

		// THEN
		expect(res).rejects.toThrowError(UserNotFound);
	});

	test('should thrown an AccountNotFound error', async () => {
		// GIVEN
		const user = userStub1;

		// WHEN
		const res = MovementFindByCriteria(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user,
			accountId: 'wrong-account-id',
			limit: 10,
			page: 1,
			operation: MovementType.ALL,
			concept: '',
		});

		// THEN
		expect(res).rejects.toThrowError(AccountNotFound);
	});
});
