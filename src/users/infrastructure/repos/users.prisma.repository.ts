import { Repository } from '@/Shared/infrastructure/repos/Repository';
import { UsersRepository } from '@/Users/domain/users.repository';
import { UserPersistenceToModel } from '@/Users/infrastructure/adapters';

export const UsersPrismaRepository: Repository<UsersRepository> = (db) => {
	return {
		findByEmail: async (email) => {
			const user = await db.userDB.findUnique({
				where: { email },
				include: { accountList: true },
			});

			if (!user) return;

			return UserPersistenceToModel(user);
		},

		findByUserId: async (userId) => {
			const user = await db.userDB.findUnique({
				where: { id: userId },
				include: { accountList: true },
			});

			if (!user) return;

			return UserPersistenceToModel(user);
		},

		register: async (user) => {
			await db.userDB.create({
				data: {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: user.password,
					tokens: user.tokens,
				},
			});
		},
	};
};
