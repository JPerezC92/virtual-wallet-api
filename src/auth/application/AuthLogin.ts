import {
	AccessCredentials,
	AuthAccessPayload,
	AuthRefreshPayload,
	InvalidCredentials,
	PasswordEncryptor,
	TokenEncoder,
} from "@/Auth/domain";
import { UseCase, UuidGenerator } from "@/Shared/domain";
import { User, UsersRepository } from "@/Users/domain";

type Input = Pick<User, "email" | "password">;

interface Output extends AccessCredentials {
	user: User;
}

export const AuthLogin: (props: {
	passwordEncryptor: PasswordEncryptor;
	tokenAccessEncoder: TokenEncoder<AuthAccessPayload>;
	tokenRefreshEncoder: TokenEncoder<AuthRefreshPayload>;
	usersRepository: UsersRepository;
	uuidGenerator: UuidGenerator;
}) => UseCase<Promise<Output>, Input> = ({
	passwordEncryptor,
	tokenAccessEncoder,
	tokenRefreshEncoder,
	usersRepository,
	uuidGenerator,
}) => {
	return {
		execute: async ({ email, password }) => {
			const user = await usersRepository.findByEmail(email);

			if (!user) throw new InvalidCredentials();

			const isValidPassword = await passwordEncryptor.compare(
				password,
				user.password
			);

			if (!isValidPassword) throw new InvalidCredentials();

			const accessToken = tokenAccessEncoder.encode({
				email: user.email,
				id: user.id,
			});

			const refreshToken = tokenRefreshEncoder.encode({
				id: uuidGenerator.generate(),
				email: user.email,
			});

			user.updateRefreshToken(refreshToken);

			await usersRepository.update(user);

			return { accessToken, refreshToken, user };
		},
	};
};
