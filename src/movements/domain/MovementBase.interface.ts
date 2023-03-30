import { Account } from '@/Accounts/domain';

import { MovementType } from './MovementType';

export interface IMovementBase<Type extends MovementType = 'TOPUP'> {
	id: string;
	concept: string;
	amount: number;
	type: Type;
	currency: string;
	accountId: Account['id'];
	date: Date;
	createdAt: Date;
	updatedAt: Date;
}
