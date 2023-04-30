import { Prisma } from '@prisma/client';

import { MovementsRepository, MovementType } from '@/Movements/domain';
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

		findByCriteria: async (accountId, page, limit, operation, concept) => {
			const pagination = Pagination.empty();
			const where: Prisma.MovementDBWhereInput = {
				OR: [{ accountId }, { toAccountId: accountId }],
			};

			if (operation !== MovementType.ALL) {
				where.type = operation;
			}
			if (!!concept) {
				where.concept = { contains: concept };
			}

			const resultCount = await db.movementDB.count({ where });

			const result = await db.movementDB.findMany({
				where,
				include: { account: true, toAccount: true },
				orderBy: { createdAt: 'desc' },
				skip: (page - 1) * limit,
				take: limit,
			});

			if (!result)
				return {
					movementList: [],
					pagination,
				};

			const movementCount = resultCount;

			return {
				movementList: result
					.map((v) =>
						v.type === MovementType.TRANSFERENCE
							? { ...v, isTransferenceReceived: v.accountId !== accountId }
							: v,
					)
					.map(MovementDbToModel),
				pagination: pagination.calculate({ page, limit }, movementCount),
			};
		},
	};
};
