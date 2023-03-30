import { IMovementBase } from './MovementBase.interface';

export type ITopupCreate = Omit<
	IMovementBase<'TOPUP'>,
	'id' | 'createdAt' | 'updatedAt'
>;
