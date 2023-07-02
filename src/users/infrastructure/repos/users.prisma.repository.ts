import { Repository } from '@/Shared/infrastructure/repos/Repository';
import { UsersRepository } from '@/Users/domain';
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
					firstName: user.userDetails.firstName,
					lastName: user.userDetails.lastName,
					email: user.userDetails.email,
					password: user.password,
					tokens: user.tokens,
				},
			});
		},

		update: async (user) => {
			const updatedUser = await db.userDB.update({
				where: { id: user.id },
				data: {
					firstName: user.userDetails.firstName,
					lastName: user.userDetails.lastName,
					email: user.userDetails.email,
					password: user.password,
					tokens: user.tokens,
				},
				include: { accountList: true },
			});

			return UserPersistenceToModel(updatedUser);
		},
	};
};
