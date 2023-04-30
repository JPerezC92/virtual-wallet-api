import { MovementDB } from '@prisma/client';

import { Movement, MovementType } from '@/Movements/domain';

export function MovementModelToDB(movement: Movement): MovementDB {
	// currency is not needed in the DB, so we remove it because it throws an error
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	if (movement.type === MovementType.TOPUP) {
		return {
			id: movement.id,
			accountId: movement.accountId,
			amount: movement.amount,
			concept: movement.concept,
			createdAt: movement.createdAt,
			date: movement.date,
			type: movement.type,
			updatedAt: movement.updatedAt,
			toAccountId: null,
		};
	}

	if (movement.type === MovementType.PAYMENT) {
		return {
			id: movement.id,
			accountId: movement.accountId,
			amount: movement.amount,
			concept: movement.concept,
			createdAt: movement.createdAt,
			date: movement.date,
			type: movement.type,
			updatedAt: movement.updatedAt,
			toAccountId: null,
		};
	}

	return {
		id: movement.id,
		accountId: movement.accountId,
		amount: movement.amount,
		concept: movement.concept,
		createdAt: movement.createdAt,
		date: movement.date,
		type: movement.type,
		updatedAt: movement.updatedAt,
		toAccountId: movement.toAccountId,
	};
}
