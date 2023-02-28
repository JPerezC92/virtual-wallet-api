import {
	AccountRecieverNotFound,
	NotEnoughMoney,
	UserIsntOwnerOfAccount,
} from '@/Accounts/domain';
import { CreateTransference } from '@/Movements/application';
import { AccountSenderAndRecieverAreEqual } from '@/Movements/domain';
import { MovementModelToEndpoint } from '@/Movements/infrastructure/adapter';
import { AccountsMockRepository } from '@/Test/accounts/infrastructure';
import { MovementsMockRespository } from '@/Test/movements/infrastructure';
import { userMock, userMock2 } from '@/Test/users/fixtures';
import { UsersMockRepository } from '@/Test/users/infrastructure';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';

describe('CreateTopup use case', () => {
	test('should create a new transference movement successfully', async () => {
		const userSender = userMock(100);
		const userReciever = userMock2(0);
		const accountSender = userSender.accountList[0];
		const accountReciever = userReciever.accountList[0];

		const transferenceCreate = {
			accountId: accountSender?.id || '',
			amount: 100,
			concept: 'Test Transference',
			date: new Date(),
			toAccountId: accountReciever?.id || '',
			type: 'TRANSFERENCE',
		} as const;

		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValue(userSender);

		const accountsMockRepository = AccountsMockRepository();
		accountsMockRepository.findById.mockResolvedValue(accountReciever);

		const movement = await CreateTransference(
			accountsMockRepository,
			MovementsMockRespository(),
			usersMockRepository,
			MovementModelToEndpoint,
		).execute({
			user: userSender,
			newTransference: transferenceCreate,
		});

		expect(movement).toEqual({
			...transferenceCreate,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});

	test('should throw a UserNotFound exception', async () => {
		const userSender = userMock(100);

		const accountSender = userSender.accountList[0];

		const transferenceCreate = {
			accountId: accountSender?.id || '',
			amount: 100,
			concept: 'Test Transference',
			date: new Date(),
			toAccountId: accountSender?.id || '',
			type: 'TRANSFERENCE',
		} as const;

		const usersMockRepository = UsersMockRepository();

		try {
			const res = await CreateTransference(
				AccountsMockRepository(),
				MovementsMockRespository(),
				usersMockRepository,
				MovementModelToEndpoint,
			).execute({
				user: userSender,
				newTransference: transferenceCreate,
			});

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(AccountSenderAndRecieverAreEqual);
		}
	});

	test('should throw a UserNotFound exception', async () => {
		const userSender = userMock(100);
		const userReciever = userMock2(0);
		const accountSender = userSender.accountList[0];
		const accountReciever = userReciever.accountList[0];

		const transferenceCreate = {
			accountId: accountSender?.id || '',
			amount: 100,
			concept: 'Test Transference',
			date: new Date(),
			toAccountId: accountReciever?.id || '',
			type: 'TRANSFERENCE',
		} as const;

		const usersMockRepository = UsersMockRepository();

		try {
			const res = await CreateTransference(
				AccountsMockRepository(),
				MovementsMockRespository(),
				usersMockRepository,
				MovementModelToEndpoint,
			).execute({
				user: userSender,
				newTransference: transferenceCreate,
			});

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(UserNotFound);
		}
	});

	test('should throw a UserIsntOwnerOfAccount exception', async () => {
		const userSender = userMock(100);
		const userReciever = userMock2(0);
		const accountSender = userSender.accountList[0];
		const accountReciever = userReciever.accountList[0];

		const transferenceCreate = {
			accountId: accountSender?.id || '',
			amount: 100,
			concept: 'Test Transference',
			date: new Date(),
			toAccountId: accountReciever?.id || '',
			type: 'TRANSFERENCE',
		} as const;

		userSender.findAccount = jest.fn().mockReturnValue(null);
		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValue(userSender);

		try {
			const res = await CreateTransference(
				AccountsMockRepository(),
				MovementsMockRespository(),
				usersMockRepository,
				MovementModelToEndpoint,
			).execute({
				user: userSender,
				newTransference: transferenceCreate,
			});
			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(UserIsntOwnerOfAccount);
		}
	});

	test('should throw a NotEnoughMoney exception', async () => {
		const userSender = userMock(99);
		const userReciever = userMock2(0);
		const accountSender = userSender.accountList[0];
		const accountReciever = userReciever.accountList[0];

		const transferenceCreate = {
			accountId: accountSender?.id || '',
			amount: 100,
			concept: 'Test Transference',
			date: new Date(),
			toAccountId: accountReciever?.id || '',
			type: 'TRANSFERENCE',
		} as const;

		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValueOnce(userSender);
		const accountsMockRepository = AccountsMockRepository();

		try {
			const res = await CreateTransference(
				accountsMockRepository,
				MovementsMockRespository(),
				usersMockRepository,
				MovementModelToEndpoint,
			).execute({
				user: userSender,
				newTransference: transferenceCreate,
			});

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(AccountRecieverNotFound);
		}
	});

	test('should throw a NotEnoughMoney exception', async () => {
		const userSender = userMock(99);
		const userReciever = userMock2(0);
		const accountSender = userSender.accountList[0];
		const accountReciever = userReciever.accountList[0];

		const transferenceCreate = {
			accountId: accountSender?.id || '',
			amount: 100,
			concept: 'Test Transference',
			date: new Date(),
			toAccountId: accountReciever?.id || '',
			type: 'TRANSFERENCE',
		} as const;

		const usersMockRepository = UsersMockRepository();
		usersMockRepository.findByUserId.mockResolvedValueOnce(userSender);
		const accountsMockRepository = AccountsMockRepository();
		accountsMockRepository.findById.mockResolvedValue(accountReciever);

		try {
			const res = await CreateTransference(
				accountsMockRepository,
				MovementsMockRespository(),
				usersMockRepository,
				MovementModelToEndpoint,
			).execute({
				user: userSender,
				newTransference: transferenceCreate,
			});

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(NotEnoughMoney);
		}
	});
});
