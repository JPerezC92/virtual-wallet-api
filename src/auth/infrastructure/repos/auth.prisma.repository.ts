import { AuthRepository } from '@/Auth/domain';
import { Repository } from '@/Shared/infrastructure/repos';

export const AuthPrismaRepository: Repository<AuthRepository> = (db) => {
	return {
		updateRefreshToken: async (user) => {
			await db.user.update({
				data: { tokens: user.tokens },
				where: { id: user.id },
			});
		},
	};
};
