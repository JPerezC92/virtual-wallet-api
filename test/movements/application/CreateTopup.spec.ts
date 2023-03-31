import { UserIsntOwnerOfAccount } from '@/Accounts/domain';
import { CreateTopup } from '@/Movements/application';
import { MovementModelToEndpoint } from '@/Movements/infrastructure/adapter';
import { AccountsMockRepository } from '@/Test/accounts/infrastructure';
import { MovementsMockRespository } from '@/Test/movements/infrastructure';
import { userMock } from '@/Test/users/fixtures';
import { UsersMockRepository } from '@/Test/users/infrastructure';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';

describe('CreateTopup use case', () => {
	test('should create a new topup movement successfully', async () => {
		const user = userMock();
		const topupCreate = {
			accountId: user.accountList[0]?.id || '',
			amount: 100,
			concept: 'Test topup',
			date: new Date(),
			type: 'TOPUP' as const,
		};

		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValue(user);

		const movement = await CreateTopup(
			AccountsMockRepository(),
			MovementsMockRespository(),
			usersMockRepository,
			MovementModelToEndpoint,
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
		const user = userMock();
		const topupCreate = {
			accountId: user.accountList[0]?.id || '',
			amount: 100,
			concept: 'Test topup',
			date: new Date(),
			type: 'TOPUP' as const,
		};

		const usersMockRepository = UsersMockRepository();

		try {
			await CreateTopup(
				AccountsMockRepository(),
				MovementsMockRespository(),
				usersMockRepository,
				MovementModelToEndpoint,
			).execute({
				user,
				newTopup: topupCreate,
			});
		} catch (error) {
			expect(error).toBeInstanceOf(UserNotFound);
		}
	});

	test('should throw a UserIsntOwnerOfAccount exception', async () => {
		const user = userMock();
		user.findAccount = jest.fn().mockReturnValue(null);
		const topupCreate = {
			accountId: user.accountList[0]?.id || '',
			amount: 100,
			concept: 'Test topup',
			date: new Date(),
			type: 'TOPUP' as const,
		};

		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValue(user);

		try {
			await CreateTopup(
				AccountsMockRepository(),
				MovementsMockRespository(),
				usersMockRepository,
				MovementModelToEndpoint,
			).execute({
				user,
				newTopup: topupCreate,
			});
		} catch (error) {
			expect(error).toBeInstanceOf(UserIsntOwnerOfAccount);
		}
	});
});
