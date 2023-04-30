import { MovementType } from '@/Movements/domain';

export interface IMovementCriteria {
	operation: MovementType;
	concept: string;
}
