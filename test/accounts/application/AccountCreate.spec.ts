import { AccountCreate } from '@/Accounts/application';
import { AccountAlreadyCreated } from '@/Accounts/domain';
import { AccountModelToEndpoint } from '@/Accounts/infrastructure/adapters';
import { CurrencyNotFound } from '@/Currencies/domain';
import { AccountsMockRepository } from '@/Test/accounts/infrastructure';
import { CurrencyMockRepository } from '@/Test/currencies/infrastructure';
import { userMock } from '@/Test/users/fixtures';
import { UsersMockRepository } from '@/Test/users/infrastructure';
import { UserNotFound } from '@/Users/domain/UserNotFound.error';

describe('AccountCreate use case', () => {
	test('should create an account successfully', async () => {
		const user = userMock();
		const usersMockRepository = UsersMockRepository();
		const currencyMockRepository = CurrencyMockRepository();

		usersMockRepository.findByUserId.mockResolvedValue(user);
		currencyMockRepository.findByValue.mockResolvedValue('USD');

		const account = await AccountCreate(
			AccountsMockRepository(),
			currencyMockRepository,
			usersMockRepository,
			AccountModelToEndpoint,
		).execute({
			user: user,
			currency: 'USD',
		});

		expect(account).toEqual({
			currency: 'USD',
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
		const user = userMock();
		const usersMockRepository = UsersMockRepository();
		const currencyMockRepository = CurrencyMockRepository();

		try {
			const res = await AccountCreate(
				AccountsMockRepository(),
				currencyMockRepository,
				usersMockRepository,
				AccountModelToEndpoint,
			).execute({
				user: user,
				currency: 'ARS',
			});

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(AccountAlreadyCreated);
		}
	});

	test('should throw an UserNotFound error', async () => {
		const user = userMock();
		const usersMockRepository = UsersMockRepository();
		const currencyMockRepository = CurrencyMockRepository();

		try {
			const res = await AccountCreate(
				AccountsMockRepository(),
				currencyMockRepository,
				usersMockRepository,
				AccountModelToEndpoint,
			).execute({
				user: user,
				currency: 'USD',
			});

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(UserNotFound);
		}
	});

	test('should throw an CurrencyNotFound error', async () => {
		const user = userMock();
		const usersMockRepository = UsersMockRepository();
		const currencyMockRepository = CurrencyMockRepository();

		usersMockRepository.findByUserId.mockResolvedValue(user);

		try {
			const res = await AccountCreate(
				AccountsMockRepository(),
				currencyMockRepository,
				usersMockRepository,
				AccountModelToEndpoint,
			).execute({
				user: user,
				currency: 'USD',
			});

			expect(res).toBeUndefined();
		} catch (error) {
			expect(error).toBeInstanceOf(CurrencyNotFound);
		}
	});
});
