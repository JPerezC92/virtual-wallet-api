import {
	AccessPayload,
	AuthRepository,
	AuthToken,
	Credentials,
	InvalidCredentials,
	PasswordCipher,
	RefreshPayload,
	TokenCipher,
} from '@/Auth/domain';
import { Adapter, UseCase } from '@/Shared/application';
import { UsersRepository } from '@/Users/domain';

interface UserLoginProps {
	credentials: Pick<Credentials, 'email' | 'password'>;
	ip: string;
}

/**
 * @throws { InvalidCredentials }
 */
export const UserLogin: <AdapterReturn>(
	authRepository: AuthRepository,
	usersRepository: UsersRepository,
	passwordCipher: PasswordCipher,
	accessTokenCipher: TokenCipher<AccessPayload>,
	refreshTokenCipher: TokenCipher<RefreshPayload>,
	outputAdapter: Adapter<AuthToken, AdapterReturn>,
) => UseCase<Promise<AdapterReturn>, UserLoginProps> = (
	authRepository,
	usersRepository,
	passwordCipher,
	accessTokenCipher,
	refreshTokenCipher,
	outputAdapter,
) => {
	return {
		async execute({ credentials, ip }) {
			const _credentials = new Credentials(credentials);
			const user = await usersRepository.findByEmail(_credentials.email);

			if (!user) throw new InvalidCredentials();

			if (!(await _credentials.passwordMatches(user, passwordCipher))) {
				throw new InvalidCredentials();
			}

			const authToken = _credentials.authenticate(
				user,
				accessTokenCipher,
				refreshTokenCipher,
			);

			await authRepository.updateRefreshToken(user, authToken.refreshToken, ip);

			return outputAdapter(authToken);
		},
	};
};
