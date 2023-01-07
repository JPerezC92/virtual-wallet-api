import { Repository } from '@/Shared/infrastructure/repos/Repository';
import { UsersRepository } from '@/Users/domain/users.repository';
import { UserPersistenceToModel } from '@/Users/infrastructure/adapters';

export const UsersPrismaRepository: Repository<UsersRepository> = (db) => {
	return {
		findByEmail: async (email) => {
			const user = await db.user.findUnique({
				where: { email },
			});

			if (!user) return;

			return UserPersistenceToModel(user);
		},

		findByUserId: async (userId) => {
			const user = await db.user.findUnique({
				where: { id: userId },
			});

			if (!user) return;

			return UserPersistenceToModel(user);
		},

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
