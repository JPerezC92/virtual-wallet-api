import { AuthRepository } from '@/Auth/domain';
import { UseCase } from '@/Shared/application';
import { User, UserNotFound, UsersRepository } from '@/Users/domain';

interface Ds {
	userId: User['id'];
	ip: string;
}

/**
 ** @throws { UserNotFound }
 **/
export const Logout: (
	authRepository: AuthRepository,
	usersRepository: UsersRepository,
) => UseCase<Promise<void>, Ds> = (authRepository, usersRepository) => {
	return {
		execute: async ({ userId, ip }) => {
			const user = await usersRepository.findByUserId(userId);

			if (!user) throw new UserNotFound();

			user.logout(ip);

			await authRepository.logout(user);
		},
	};
};
