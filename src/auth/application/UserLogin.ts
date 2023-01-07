import {
	AccessPayload,
	Credentials,
	InvalidCredentials,
	PasswordCipher,
	TokenCipher,
} from '@/Auth/domain';
import { UseCase } from '@/Shared/application';
import { UsersRepository } from '@/Users/domain';

export const UserLogin: (
	usersRepository: UsersRepository,
	passwordCipher: PasswordCipher,
	tokenCipher: TokenCipher<AccessPayload>,
) => UseCase<Promise<string>, Credentials> = (
	usersRepository,
	passwordCipher,
	tokenCipher,
) => {
	return {
		async execute(credentials) {
			const user = await usersRepository.findByEmail(credentials.email);

			if (!user) throw new InvalidCredentials();

			if (!(await credentials.passwordMatches(user, passwordCipher))) {
				throw new InvalidCredentials();
			}

			return tokenCipher.encode({ email: user.email });
		},
	};
};
