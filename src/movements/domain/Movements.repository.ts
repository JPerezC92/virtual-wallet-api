import { Account } from '@/Accounts/domain';
import { Movement } from '@/Movements/domain/Movement.interface';
import {
	IMovementCriteria,
	IPaginationCriteria,
	Pagination,
} from '@/Shared/domain';

export interface MovementsRepository {
	findByCriteria: (
		userId: Account['id'],
		page: IPaginationCriteria['page'],
		limit: IPaginationCriteria['limit'],
		operation: IMovementCriteria['operation'],
		concept: IMovementCriteria['concept'],
	) => Promise<{ movementList: Movement[]; pagination: Pagination }>;
	create: (movement: Movement) => Promise<void>;
	findById: (movementId: Movement['id']) => Promise<Movement | undefined>;
	update: (movement: Movement) => Promise<void>;
}
