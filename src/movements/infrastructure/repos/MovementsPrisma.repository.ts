import { MovementsRepository } from '@/Movements/domain';
import {
	MovementDbToModel,
	MovementModelToDB,
} from '@/Movements/infrastructure/adapter';
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
				data: { ...MovementModelToDB(movement) },
			});
		},

		findAll: async (accountId) => {
			const accountDb = await db.accountDB.findUnique({
				where: { id: accountId },
				include: {
					movementList: {
						where: {
							OR: [{ accountId }, { toAccountId: accountId }],
						},
						orderBy: { createdAt: 'desc' },
					},
				},
			});

			return (
				accountDb?.movementList.map((m) =>
					MovementDbToModel({ ...m, currency: accountDb.currencyValue }),
				) || []
			);
		},
	};
};
