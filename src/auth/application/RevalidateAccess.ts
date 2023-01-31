import {
	AccessPayload,
	AuthRepository,
	AuthToken,
	RefreshPayload,
	TokenCipher,
} from '@/Auth/domain';
import { UseCase } from '@/Shared/application';
import { User } from '@/Users/domain';

type RevalidateAccessProps = { user: User; ip: string };

export const RevalidateAccess: (
	authRepository: AuthRepository,
	accessTokenCipher: TokenCipher<AccessPayload>,
	refreshTokenCipher: TokenCipher<RefreshPayload>,
) => UseCase<Promise<AuthToken>, RevalidateAccessProps> = (
	authRepository,
	accessTokenCipher,
	refreshTokenCipher,
) => {
	return {
		execute: async ({ user, ip }) => {
			const authToken = user.authenticate(
				user,
				ip,
				accessTokenCipher,
				refreshTokenCipher,
			);

			await authRepository.updateRefreshToken(user);

			return authToken;
		},
	};
};
