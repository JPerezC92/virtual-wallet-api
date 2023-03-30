import { IMovementBase } from './MovementBase.interface';

export type IPaymentCreate = Omit<
	IMovementBase<'PAYMENT'>,
	'id' | 'createdAt' | 'updatedAt'
>;
