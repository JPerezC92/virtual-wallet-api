import { UserAlreadyRegistered } from '@/Auth/domain';
import { BcryptPasswordCipher } from '@/Auth/infrastructure/service';
import { UsersMockRepository } from '@/Test/users/infrastructure';
import { UserRegister } from '@/Users/application';
import { User } from '@/Users/domain';
import { UserModelToEndpoint } from '@/Users/infrastructure/adapters';

const userCreate = {
	firstName: 'userFirstNameTest',
	lastName: 'userLastNameTest',
	email: 'example@gmail.com',
	password: '123456',
};

describe('UserRegister use case', () => {
	test('should create a new user', async () => {
		const userRepository = UsersMockRepository();
		userRepository.findByEmail.mockResolvedValueOnce(undefined);

		const user = await UserRegister(
			userRepository,
			new BcryptPasswordCipher(),
			UserModelToEndpoint,
		).execute(userCreate);

		return expect(user).toEqual({
			firstName: userCreate.firstName,
			lastName: userCreate.lastName,
			email: userCreate.email,
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
			).execute(userCreate);
		} catch (error) {
			expect(error).toBeInstanceOf(UserAlreadyRegistered);
		}
	});
});
