import { IMovementBase } from './MovementBase.interface';

export interface ITransference extends IMovementBase<'TRANSFERENCE'> {
	toAccountId: string;
}
