import { MovementsRepository } from '@/Movements/domain';
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
	};
};
