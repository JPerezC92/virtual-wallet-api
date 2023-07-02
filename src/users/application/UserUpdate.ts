import { UseCase } from '@/Shared/application';
import {
	User,
	UserDetails,
	UserNotFound,
	UsersRepository,
} from '@/Users/domain';

interface UserUpdateInput {
	id: User['id'];
	userDetails: Partial<UserDetails>;
}

export const UserUpdate: <Result>(
	usersRepository: UsersRepository,
	outputAdapter: (user: User) => Result,
) => UseCase<Promise<Result>, UserUpdateInput> = (
	usersRepository,
	outputAdapter,
) => {
	return {
		execute: async ({ id, userDetails }) => {
			let user = await usersRepository.findByUserId(id);

			if (!user) throw new UserNotFound();

			user = user.updateUserInfo(userDetails);

			await usersRepository.update(user);

			return outputAdapter(user);
		},
	};
};
