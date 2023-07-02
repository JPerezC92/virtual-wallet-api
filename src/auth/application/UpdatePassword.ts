import {
	Credentials,
	IncorrectOldPassword,
	PasswordCipher,
} from '@/Auth/domain';
import { UseCase } from '@/Shared/application';
import { UserNotFound, UsersRepository } from '@/Users/domain';

interface UpdatePasswordInput {
	id: string;
	password: string;
	newPassword: string;
}

/**
 * @throws { UserNotFound }
 * @throws { IncorrectOldPassword }
 */
export const UpdatePassword: (
	usersRepository: UsersRepository,
	passwordCipher: PasswordCipher,
) => UseCase<Promise<void>, UpdatePasswordInput> = (
	_usersRepository,
	_passwordCipher,
) => {
	return {
		execute: async ({ id, password, newPassword }) => {
			let user = await _usersRepository.findByUserId(id);

			if (!user) throw new UserNotFound(id);
			const _credentials = new Credentials({
				email: user.userDetails.email,
				password: password,
			});

			if (!(await _credentials.passwordMatches(user, _passwordCipher))) {
				throw new IncorrectOldPassword();
			}

			user = await user.changePassword(newPassword, _passwordCipher);
			await _usersRepository.update(user);
		},
	};
};
