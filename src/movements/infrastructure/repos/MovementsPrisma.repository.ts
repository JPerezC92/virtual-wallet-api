import { MovementsRepository } from '@/Movements/domain';
import {
	MovementDbToModel,
	MovementModelToDB,
} from '@/Movements/infrastructure/adapter';
import { Pagination } from '@/Shared/domain';
import { Repository } from '@/Shared/infrastructure/repos';

export const MovementsPrismaRepository: Repository<MovementsRepository> = (
	db,
) => {
	return {
		create: async (movement) => {
			await db.movementDB.create({
				data: { ...MovementModelToDB(movement) },
			});
		},

		findAll: async (accountId, page, limit) => {
			const pagination = Pagination.empty();

			const result = await db.accountDB.findUnique({
				where: { id: accountId },
				include: {
					movementList: {
						where: {
							OR: [{ accountId }, { toAccountId: accountId }],
						},
						orderBy: { createdAt: 'desc' },
						skip: (page - 1) * limit,
						take: limit,
					},
					_count: { select: { movementList: true } },
				},
			});

			if (!result)
				return {
					movementList: [],
					pagination,
				};

			const { movementList, _count, ...accountDB } = result;
			const movementCount = _count.movementList;

			return {
				movementList: movementList.map((m) =>
					MovementDbToModel({ ...m, currency: accountDB.currencyValue }),
				),
				pagination: pagination.calculate({ page, limit }, movementCount),
			};
		},
	};
};
