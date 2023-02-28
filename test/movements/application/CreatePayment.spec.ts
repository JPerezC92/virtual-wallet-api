import { NotEnoughMoney, UserIsntOwnerOfAccount } from '@/Accounts/domain';
import { CreatePayment } from '@/Movements/application';
import { MovementModelToEndpoint } from '@/Movements/infrastructure/adapter';
import { AccountsMockRepository } from '@/Test/accounts/infrastructure';
import { MovementsMockRespository } from '@/Test/movements/infrastructure';
import { userMock } from '@/Test/users/fixtures';
import { UsersMockRepository } from '@/Test/users/infrastructure';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';

describe('CreateTopup use case', () => {
	test('should create a new payment movement successfully', async () => {
		const user = userMock(100);
		const account = user.accountList[0];

		const paymentCreate = {
			accountId: account?.id || '',
			amount: 100,
			concept: 'Test payment',
			date: new Date(),
			type: 'PAYMENT' as const,
		};

		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValue(user);

		const movement = await CreatePayment(
			AccountsMockRepository(),
			MovementsMockRespository(),
			usersMockRepository,
			MovementModelToEndpoint,
		).execute({
			user,
			newPayment: paymentCreate,
		});

		expect(movement).toEqual({
			...paymentCreate,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});

	test('should throw a UserNotFound exception', async () => {
		const user = userMock(0);
		const account = user.accountList[0];
		const paymentCreate = {
			accountId: account?.id || '',
			amount: 100,
			concept: 'Test payment',
			date: new Date(),
			type: 'PAYMENT' as const,
		};

		const usersMockRepository = UsersMockRepository();

		try {
			const res = await CreatePayment(
				AccountsMockRepository(),
				MovementsMockRespository(),
				usersMockRepository,
				MovementModelToEndpoint,
			).execute({
				user,
				newPayment: paymentCreate,
			});

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(UserNotFound);
		}
	});

	test('should throw a UserIsntOwnerOfAccount exception', async () => {
		const user = userMock(0);
		const account = user.accountList[0];
		const paymentCreate = {
			accountId: account?.id || '',
			amount: 100,
			concept: 'Test payment',
			date: new Date(),
			type: 'PAYMENT' as const,
		};

		user.findAccount = jest.fn().mockReturnValue(null);
		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValue(user);

		try {
			const res = await CreatePayment(
				AccountsMockRepository(),
				MovementsMockRespository(),
				usersMockRepository,
				MovementModelToEndpoint,
			).execute({
				user,
				newPayment: paymentCreate,
			});
			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(UserIsntOwnerOfAccount);
		}
	});

	test('should throw a NotEnoughMoney exception', async () => {
		const user = userMock(99);
		const paymentCreate = {
			accountId: user.accountList[0]?.id || '',
			amount: 100,
			concept: 'Test payment',
			date: new Date(),
			type: 'PAYMENT' as const,
		};

		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValue(user);

		try {
			const res = await CreatePayment(
				AccountsMockRepository(),
				MovementsMockRespository(),
				usersMockRepository,
				MovementModelToEndpoint,
			).execute({
				user,
				newPayment: paymentCreate,
			});

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(NotEnoughMoney);
		}
	});
});
