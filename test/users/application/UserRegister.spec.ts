import { AccounstStubRepository } from '@/Accounts/infrastructure/repos';
import { UserAlreadyRegistered } from '@/Auth/domain';
import { BcryptPasswordCipher } from '@/Auth/infrastructure/service';
import {
	CurrenciesStubRepository,
	currencyStub1,
} from '@/Currencies/infrastructure/repos';
import { UserRegister } from '@/Users/application';
import { UserModelToEndpoint } from '@/Users/infrastructure/adapters';
import { UsersStubRepository } from '@/Users/infrastructure/repos';

describe('UserRegister use case', () => {
	test('should create a new user', async () => {
		// GIVEN
		const userCreateMock = {
			email: 'jhon.test@gmail.com',
			firstName: 'Jhon',
			lastName: 'Test',
			password: '123456',
		};

		// WHEN
		const user = await UserRegister(
			AccounstStubRepository(),
			CurrenciesStubRepository(),
			UsersStubRepository(),
			new BcryptPasswordCipher(),
			UserModelToEndpoint,
		).execute(userCreateMock);

		// THEN
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
				currency: currencyStub1,
				userId: user.id,
				balance: 0,
				income: 0,
				expense: 0,
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			}),
		);
	});

	test('should throw an UserAlreadyRegistered', async () => {
		// GIVEN
		const userCreateMock = {
			email: 'jhon.test@gmail.com',
			firstName: 'Jhon',
			lastName: 'Test',
			password: '123456',
		};

		// WHEN
		const res = UserRegister(
			AccounstStubRepository(),
			CurrenciesStubRepository(),
			UsersStubRepository(),
			new BcryptPasswordCipher(),
			UserModelToEndpoint,
		).execute(userCreateMock);

		// THEN
		expect(res).rejects.toThrow(UserAlreadyRegistered);
	});
});
