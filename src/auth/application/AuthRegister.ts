import {
	AccessCredentials,
	AuthAccessPayload,
	AuthRefreshPayload,
	PasswordEncryptor,
	TokenEncoder,
	UserAlreadyExists,
} from "@/Auth/domain";
import { UseCase, UuidGenerator } from "@/Shared/domain";
import { User, UsersRepository } from "@/Users/domain";

type Input = Pick<User, "firstName" | "lastName" | "email" | "password">;

interface Output extends AccessCredentials {
	user: User;
}

export const AuthRegister: (props: {
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
		execute: async ({ firstName, lastName, email, password }) => {
			const user = await usersRepository.findByEmail(email);

			if (user) throw new UserAlreadyExists();

			const passwordEncrypted = await passwordEncryptor.encrypt(password);

			const refreshToken = tokenRefreshEncoder.encode({
				id: uuidGenerator.generate(),
				email,
			});

			const newUser = new User({
				id: uuidGenerator.generate(),
				firstName,
				lastName,
				email,
				password: passwordEncrypted,
				refreshToken,
			});

			await usersRepository.persist(newUser);

			const authPayload: AuthAccessPayload = {
				id: newUser.id,
				email: newUser.email,
			};

			const accessToken = tokenAccessEncoder.encode(authPayload);

			return { accessToken, refreshToken, user: newUser };
		},
	};
};
