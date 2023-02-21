import { UserAlreadyRegistered } from '@/Auth/domain';
import { BcryptPasswordCipher } from '@/Auth/infrastructure/service';
import { AccountsMockRepository } from '@/Test/accounts/infrastructure';
import { CurrencyMockRepository } from '@/Test/currencies/infrastructure';
import { userCreateMock } from '@/Test/users/fixtures';
import { UsersMockRepository } from '@/Test/users/infrastructure';
import { UserRegister } from '@/Users/application';
import { User } from '@/Users/domain';
import { UserModelToEndpoint } from '@/Users/infrastructure/adapters';

describe('UserRegister use case', () => {
	test('should create a new user', async () => {
		const accountsRepository = AccountsMockRepository();

		const currencyRepository = CurrencyMockRepository();
		currencyRepository.findDefault.mockResolvedValue('ARS');

		const userRepository = UsersMockRepository();
		userRepository.findByEmail.mockResolvedValueOnce(undefined);

		const user = await UserRegister(
			accountsRepository,
			currencyRepository,
			userRepository,
			new BcryptPasswordCipher(),
			UserModelToEndpoint,
		).execute(userCreateMock);

		expect(user).toEqual({
			firstName: userCreateMock.firstName,
			lastName: userCreateMock.lastName,
			email: userCreateMock.email,
			id: expect.any(String),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			accountList: expect.any(Array),
		});

		user.accountList.map((account) =>
			expect(account).toEqual({
				id: expect.any(String),
				currency: 'ARS',
				userId: user.id,
				money: 0,
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			}),
		);
	});

	test('should throw an UserAlreadyRegistered', async () => {
		const accountsRepository = AccountsMockRepository();

		const currencyRepository = CurrencyMockRepository();
		currencyRepository.findDefault.mockResolvedValue('ARS');

		const userRepository = UsersMockRepository();
		userRepository.findByEmail.mockResolvedValueOnce({} as User);

		try {
			await UserRegister(
				accountsRepository,
				currencyRepository,
				userRepository,
				new BcryptPasswordCipher(),
				UserModelToEndpoint,
			).execute(userCreateMock);
		} catch (error) {
			expect(error).toBeInstanceOf(UserAlreadyRegistered);
		}
	});
});
