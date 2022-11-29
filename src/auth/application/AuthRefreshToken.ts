import {
	AccessCredentials,
	AuthAccessPayload,
	AuthRefreshPayload,
	TokenEncoder,
	UserNotFound,
} from "@/Auth/domain";
import { UseCase, UuidGenerator } from "@/Shared/domain";
import { User, UsersRepository } from "@/Users/domain";

type Input = Pick<User, "email">;

interface Output extends AccessCredentials {
	user: User;
}

export const AuthRefreshToken: (props: {
	usersRepository: UsersRepository;
	tokenAccessEncoder: TokenEncoder<AuthAccessPayload>;
	tokenRefreshEncoder: TokenEncoder<AuthRefreshPayload>;
	uuidGenerator: UuidGenerator;
}) => UseCase<Promise<Output>, Input> = ({
	tokenAccessEncoder,
	tokenRefreshEncoder,
	usersRepository,
	uuidGenerator,
}) => {
	return {
		execute: async ({ email }) => {
			const user = await usersRepository.findByEmail(email);

			if (!user) throw new UserNotFound();

			const refreshToken = tokenRefreshEncoder.encode({
				email,
				id: uuidGenerator.generate(),
			});

			const accessToken = tokenAccessEncoder.encode({
				email: user.email,
				id: user.id,
			});

			user.updateRefreshToken(refreshToken);

			await usersRepository.update(user);

			return {
				accessToken,
				refreshToken,
				user,
			};
		},
	};
};
