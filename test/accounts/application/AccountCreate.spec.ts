import { AccountCreate } from '@/Accounts/application';
import { AccountAlreadyCreated } from '@/Accounts/domain';
import { AccountModelToEndpoint } from '@/Accounts/infrastructure/adapters';
import {
	AccounstStubRepository,
	accountStub1,
} from '@/Accounts/infrastructure/repos';
import { CurrencyNotFound } from '@/Currencies/domain';
import {
	CurrenciesStubRepository,
	currencyStub2,
} from '@/Currencies/infrastructure/repos';
import { UserNotFound } from '@/Users/domain';
import {
	userNotRegisteredStub,
	UsersStubRepository,
	userStub1,
} from '@/Users/infrastructure/repos';

describe('AccountCreate use case', () => {
	test('should create an account successfully', async () => {
		// GIVEN
		const user = userStub1;
		const currency = currencyStub2;

		// WHEN
		const result = await AccountCreate(
			AccounstStubRepository(),
			CurrenciesStubRepository(),
			UsersStubRepository(),
			AccountModelToEndpoint,
		).execute({
			user: user,
			currency: currency,
		});

		// THEN
		expect(result).toEqual({
			currency: currency,
			id: expect.any(String),
			balance: 0,
			income: 0,
			expense: 0,
			userId: user.id,
			updatedAt: expect.any(Date),
			createdAt: expect.any(Date),
		});
	});

	test('should throw an AccountAlreadyCreated error', async () => {
		// GIVEN
		const user = userStub1;
		const account = accountStub1;

		// WHEN
		const result = AccountCreate(
			AccounstStubRepository(),
			CurrenciesStubRepository(),
			UsersStubRepository(),
			AccountModelToEndpoint,
		).execute({
			user: user,
			currency: account.currency,
		});

		// THEN
		await expect(result).rejects.toThrowError(AccountAlreadyCreated);
	});

	test('should throw an UserNotFound error', async () => {
		// GIVEN
		const user = userNotRegisteredStub;
		const currency = currencyStub2;

		// WHEN
		const result = AccountCreate(
			AccounstStubRepository(),
			CurrenciesStubRepository(),
			UsersStubRepository(),
			AccountModelToEndpoint,
		).execute({
			user,
			currency,
		});

		// THEN
		await expect(result).rejects.toThrowError(UserNotFound);
	});

	test('should throw an CurrencyNotFound error', async () => {
		// GIVEN
		const user = userStub1;

		// WHEN
		const result = AccountCreate(
			AccounstStubRepository(),
			CurrenciesStubRepository(),
			UsersStubRepository(),
			AccountModelToEndpoint,
		).execute({
			user: user,
			currency: '---',
		});

		// THEN
		await expect(result).rejects.toThrowError(CurrencyNotFound);
	});
});
