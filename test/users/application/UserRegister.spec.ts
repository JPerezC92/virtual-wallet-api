import { UserAlreadyRegistered } from '@/Auth/domain';
import { BcryptPasswordCipher } from '@/Auth/infrastructure/service';
import { UsersMockRepository } from '@/Test/users/infrastructure';
import { UserRegister } from '@/Users/application';
import { User } from '@/Users/domain';
import { UserModelToEndpoint } from '@/Users/infrastructure/adapters';

import { userCreateMock } from '../fixtures/userCreate.mock';

describe('UserRegister use case', () => {
	test('should create a new user', async () => {
		const userRepository = UsersMockRepository();
		userRepository.findByEmail.mockResolvedValueOnce(undefined);

		const user = await UserRegister(
			userRepository,
			new BcryptPasswordCipher(),
			UserModelToEndpoint,
		).execute(userCreateMock);

		return expect(user).toEqual({
			firstName: userCreateMock.firstName,
			lastName: userCreateMock.lastName,
			email: userCreateMock.email,
			id: expect.any(String),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});

	test('should throw an UserAlreadyRegistered', async () => {
		const userRepository = UsersMockRepository();
		userRepository.findByEmail.mockResolvedValueOnce({} as User);

		try {
			await UserRegister(
				userRepository,
				new BcryptPasswordCipher(),
				UserModelToEndpoint,
			).execute(userCreateMock);
		} catch (error) {
			expect(error).toBeInstanceOf(UserAlreadyRegistered);
		}
	});
});
