import { AuthRepository } from '@/Auth/domain';
import { Repository } from '@/Shared/infrastructure/repos';

export const AuthPrismaRepository: Repository<AuthRepository> = (db) => {
	return {
		register: async (user) => {
			await db.user.create({
				data: {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: user.password,
					tokens: {},
				},
			});
		},
	};
};
