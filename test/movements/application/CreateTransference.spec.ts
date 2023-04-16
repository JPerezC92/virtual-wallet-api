import {
	AccountRecieverNotFound,
	NotEnoughMoney,
	UserIsntOwnerOfAccount,
} from '@/Accounts/domain';
import { AccounstStubRepository } from '@/Accounts/infrastructure/repos';
import { CreateTransference } from '@/Movements/application';
import { AccountSenderAndRecieverAreEqual } from '@/Movements/domain';
import { MovementsStubRepository } from '@/Movements/infrastructure/repos';
import { UserNotFound } from '@/Users/domain';
import {
	userNotRegisteredStub,
	UsersStubRepository,
	userStub1,
	userStub2,
} from '@/Users/infrastructure/repos';

describe('CreateTransference use case', () => {
	test('should create a new transference movement successfully', async () => {
		// GIVEN
		const userSender = userStub1;
		const userReciever = userStub2;
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

		// const usersMockRepository = UsersMockRepository();
		// usersMockRepository.findByUserId.mockResolvedValue(userSender);

		// const accountsMockRepository = AccountsMockRepository();
		// accountsMockRepository.findById.mockResolvedValue(accountReciever);

		// WHEN
		const movement = await CreateTransference(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user: userSender,
			newTransference: transferenceCreate,
		});

		// THEN
		expect(movement).toEqual({
			...transferenceCreate,
			id: expect.any(String),
			currency: expect.any(String),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});

	test('should throw a AccountSenderAndRecieverAreEqual exception', async () => {
		// GIVEN
		const userSender = userStub1;
		const accountSender = userSender.accountList[0];

		const transferenceCreate = {
			accountId: accountSender?.id || '',
			amount: 100,
			concept: 'Test Transference',
			date: new Date(),
			toAccountId: accountSender?.id || '',
			type: 'TRANSFERENCE',
		} as const;

		// WHEN
		const result = CreateTransference(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user: userSender,
			newTransference: transferenceCreate,
		});

		// THEN
		expect(result).rejects.toThrowError(AccountSenderAndRecieverAreEqual);
	});

	test('should throw a UserNotFound exception', async () => {
		// GIVEN
		const userSender = userNotRegisteredStub;
		const userReciever = userStub2;
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

		// WHEN
		const res = CreateTransference(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user: userSender,
			newTransference: transferenceCreate,
		});

		// THEN
		expect(res).rejects.toThrowError(UserNotFound);
	});

	test('should throw a UserIsntOwnerOfAccount exception when the account sender id is not found', async () => {
		// GIVEN
		const userSender = userStub1;
		const userReciever = userStub2;
		const accountReciever = userReciever.accountList[0];

		const transferenceCreate = {
			accountId: 'Wrong Account Id',
			amount: 100,
			concept: 'Test Transference',
			date: new Date(),
			toAccountId: accountReciever?.id || '',
			type: 'TRANSFERENCE',
		} as const;

		// WHEN
		const res = CreateTransference(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user: userSender,
			newTransference: transferenceCreate,
		});

		// THEN
		expect(res).rejects.toThrowError(UserIsntOwnerOfAccount);
	});

	test('should throw a AccountRecieverNotFound exception', async () => {
		// GIVEN
		const userSender = userStub1;
		const accountSender = userSender.accountList[0];

		const transferenceCreate = {
			accountId: accountSender?.id || '',
			amount: 100,
			concept: 'Test Transference',
			date: new Date(),
			toAccountId: 'Wrong Account Id',
			type: 'TRANSFERENCE',
		} as const;

		// WHEN
		const res = CreateTransference(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user: userSender,
			newTransference: transferenceCreate,
		});

		// THEN
		expect(res).rejects.toThrowError(AccountRecieverNotFound);
	});

	test('should throw a NotEnoughMoney exception', async () => {
		// GIVEN
		const userSender = userStub1;
		const userReciever = userStub2;
		const accountSender = userSender.accountList[0];
		const accountReciever = userReciever.accountList[0];

		const transferenceCreate = {
			accountId: accountSender?.id || '',
			amount: 99999999999999,
			concept: 'Test Transference',
			date: new Date(),
			toAccountId: accountReciever?.id || '',
			type: 'TRANSFERENCE',
		} as const;

		// WHEN
		const res = CreateTransference(
			AccounstStubRepository(),
			MovementsStubRepository(),
			UsersStubRepository(),
			(v) => v,
		).execute({
			user: userSender,
			newTransference: transferenceCreate,
		});

		// THEN
		expect(res).rejects.toThrowError(NotEnoughMoney);
	});
});
