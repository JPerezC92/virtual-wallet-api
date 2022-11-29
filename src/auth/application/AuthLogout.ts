import { AuthAccessPayload, UserNotFound } from "@/Auth/domain";
import { UseCase } from "@/Shared/domain/UseCase";
import { UsersRepository } from "@/Users/domain/UsersRepository";

export const AuthLogout: (props: {
	usersRepository: UsersRepository;
}) => UseCase<Promise<void>, AuthAccessPayload> = ({ usersRepository }) => {
	return {
		execute: async ({ email }) => {
			const user = await usersRepository.findByEmail(email);

			if (!user) throw new UserNotFound();

			user.logout();

			await usersRepository.update(user);
		},
	};
};
