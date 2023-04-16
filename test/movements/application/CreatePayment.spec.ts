import { NotEnoughMoney, UserIsntOwnerOfAccount } from '@/Accounts/domain';
import { AccounstStubRepository } from '@/Accounts/infrastructure/repos';
import { CreatePayment } from '@/Movements/application';
import { MovementsStubRepository } from '@/Movements/infrastructure/repos';
import { UserNotFound } from '@/Users/domain';
import {
	userNotRegisteredStub,
	UsersStubRepository,
	userStub1,
} from '@/Users/infrastructure/repos';

describe('CreatePayment use case', () => {
	test('should create a new payment movement successfully', async () => {
		// GIVEN
		const user = userStub1;
		const account = user.accountList[0];

		const paymentCreate = {
			accountId: account?.id || '',
			amount: 100,
			concept: 'Test payment',
			date: new Date(),
			type: 'PAYMENT' as const,
		};

		// WHEN
		const movement = await CreatePayment(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user,
			newPayment: paymentCreate,
		});

		// THEN
		expect(movement).toEqual({
			...paymentCreate,
			currency: expect.any(String),
			id: expect.any(String),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});

	test('should throw a UserNotFound exception', async () => {
		// GIVEN
		const user = userNotRegisteredStub;
		const account = user.accountList[0];
		const paymentCreate = {
			accountId: account?.id || '',
			amount: 100,
			concept: 'Test payment',
			date: new Date(),
			type: 'PAYMENT' as const,
		};

		// WHEN
		const res = CreatePayment(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user,
			newPayment: paymentCreate,
		});

		// THEN
		expect(res).rejects.toThrowError(UserNotFound);
	});

	test('should throw a UserIsntOwnerOfAccount exception', async () => {
		// GIVEN
		const user = userStub1;
		const paymentCreate = {
			accountId: 'Wrong-account-id',
			amount: 100,
			concept: 'Test payment',
			date: new Date(),
			type: 'PAYMENT' as const,
		};

		// WHEN
		const res = CreatePayment(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user,
			newPayment: paymentCreate,
		});

		// THEN
		expect(res).rejects.toThrowError(UserIsntOwnerOfAccount);
	});

	test('should throw a NotEnoughMoney exception', async () => {
		// GIVEN
		const user = userStub1;
		const paymentCreate = {
			accountId: user.accountList[0]?.id || '',
			amount: 999999999999,
			concept: 'Test payment',
			date: new Date(),
			type: 'PAYMENT' as const,
		};

		// WHEN
		const res = CreatePayment(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user,
			newPayment: paymentCreate,
		});

		// THEN
		expect(res).rejects.toThrowError(NotEnoughMoney);
	});
});
