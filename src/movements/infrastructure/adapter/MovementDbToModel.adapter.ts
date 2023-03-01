import { InternalServerErrorException } from '@nestjs/common';
import { MovementDB } from '@prisma/client';

import {
	MovementPayment,
	MovementTopUp,
	MovementTransference,
} from '@/Movements/domain';

export function MovementDbToModel(movementDb: MovementDB) {
	if (movementDb.type === 'TOPUP') {
		return new MovementTopUp({
			accountId: movementDb.accountId,
			amount: movementDb.amount,
			concept: movementDb.concept,
			createdAt: movementDb.createdAt,
			date: movementDb.date,
			id: movementDb.id,
			type: movementDb.type,
			updatedAt: movementDb.updatedAt,
		});
	}
	if (movementDb.type === 'PAYMENT') {
		return new MovementPayment({ ...movementDb, type: movementDb.type });
	}

	if (!movementDb.toAccountId) throw new InternalServerErrorException();

	return new MovementTransference({
		...movementDb,
		type: movementDb.type,
		toAccountId: movementDb.toAccountId,
	});
}
