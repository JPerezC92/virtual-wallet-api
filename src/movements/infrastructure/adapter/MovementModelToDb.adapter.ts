import { MovementDB } from '@prisma/client';

import { Movement, MovementType } from '@/Movements/domain';

export function MovementModelToDB(movement: Movement): MovementDB {
	// currency is not needed in the DB, so we remove it because it throws an error
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { currency: _, ..._movement } = movement;
	if (movement.type === MovementType.TOPUP) {
		return {
			..._movement,
			toAccountId: null,
		};
	}

	if (movement.type === MovementType.PAYMENT) {
		return {
			..._movement,
			toAccountId: null,
		};
	}

	return {
		..._movement,
		toAccountId: movement.toAccountId,
	};
}
