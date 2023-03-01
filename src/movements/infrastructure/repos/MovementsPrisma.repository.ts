import { MovementsRepository } from '@/Movements/domain';
import { MovementDbToModel } from '@/Movements/infrastructure/adapter';
import { Repository } from '@/Shared/infrastructure/repos';

export const MovementsPrismaRepository: Repository<MovementsRepository> = (
	db,
) => {
	return {
		create: async (movement) => {
			// await db.accountDB.update({
			// 	where:{}
			// 	data: { ...movement },
			// });
			await db.movementDB.create({
				data: { ...movement },
			});
		},

		findAll: async (accountId) => {
			const movementList = await db.movementDB.findMany({
				where: {
					OR: [{ accountId }, { toAccountId: accountId }],
				},

				orderBy: { updatedAt: 'desc' },
			});

			return movementList.map(MovementDbToModel);
		},
	};
};
