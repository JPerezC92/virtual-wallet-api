import { AuthRepository } from '@/Auth/domain';
import { Repository } from '@/Shared/infrastructure/repos';

export const AuthPrismaRepository: Repository<AuthRepository> = (db) => {
	return {
		updateRefreshToken: async (user, refreshToken, ip) => {
			await db.user.update({
				data: { tokens: { ...user.tokens, [ip]: refreshToken } },
				where: { id: user.id },
			});
		},
	};
};
