import { UserIsntOwnerOfAccount } from '@/Accounts/domain';
import { AccounstStubRepository } from '@/Accounts/infrastructure/repos';
import { CreateTopup } from '@/Movements/application';
import { MovementsStubRepository } from '@/Movements/infrastructure/repos';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';
import {
	userNotRegisteredStub,
	UsersStubRepository,
	userStub1,
} from '@/Users/infrastructure/repos';

describe('CreateTopup use case', () => {
	test('should create a new topup movement successfully', async () => {
		// GIVEN
		const user = userStub1;
		const topupCreate = {
			accountId: user.accountList[0]?.id || '',
			amount: 100,
			concept: 'Test topup',
			date: new Date(),
			type: 'TOPUP' as const,
		};

		const movement = await CreateTopup(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user,
			newTopup: topupCreate,
		});

		expect(movement).toEqual({
			...topupCreate,
			currency: expect.any(String),
			id: expect.any(String),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});

	test('should throw a UserNotFound exception', async () => {
		// GIVEN
		const user = userNotRegisteredStub;
		const topupCreate = {
			accountId: user.accountList[0]?.id || '',
			amount: 100,
			concept: 'Test topup',
			date: new Date(),
			type: 'TOPUP' as const,
		};

		// WHEN
		const res = CreateTopup(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user,
			newTopup: topupCreate,
		});

		// THEN
		expect(res).rejects.toThrowError(UserNotFound);
	});

	test('should throw a UserIsntOwnerOfAccount exception', async () => {
		// GIVEN
		const user = userStub1;

		const topupCreate = {
			accountId: 'wrong-account-id',
			amount: 100,
			concept: 'Test topup',
			date: new Date(),
			type: 'TOPUP' as const,
		};

		// WHEN
		const res = CreateTopup(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user,
			newTopup: topupCreate,
		});

		// THEN
		expect(res).rejects.toThrowError(UserIsntOwnerOfAccount);
	});
});
