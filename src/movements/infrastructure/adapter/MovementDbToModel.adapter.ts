import { InternalServerErrorException } from '@nestjs/common';

import {
	MovementPayment,
	MovementTopUp,
	MovementTransference,
} from '@/Movements/domain';
import { MovementExtendedDB } from '@/Movements/infrastructure/types/MovementExtendedDB';

export function MovementDbToModel(movementDb: MovementExtendedDB) {
	if (movementDb.type === 'TOPUP') {
		return new MovementTopUp({
			...movementDb,
			currency: movementDb.account.currencyValue,
			type: movementDb.type,
		});
	}
	if (movementDb.type === 'PAYMENT') {
		return new MovementPayment({
			...movementDb,
			currency: movementDb.account.currencyValue,
			type: movementDb.type,
		});
	}

	if (!movementDb.toAccountId) throw new InternalServerErrorException();

	return new MovementTransference({
		...movementDb,
		type: movementDb.type,
		currency: movementDb.account.currencyValue,
		isTransferenceReceived: Boolean(movementDb?.isTransferenceReceived),
		toAccountId: movementDb.toAccountId,
	});
}
