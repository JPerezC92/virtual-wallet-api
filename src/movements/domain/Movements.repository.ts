import { Account } from '@/Accounts/domain';
import { Movement } from '@/Movements/domain/Movement.interface';
import { IPaginationCriteria, Pagination } from '@/Shared/domain';

export interface MovementsRepository {
	findAll: (
		userId: Account['id'],
		page: IPaginationCriteria['page'],
		limit: IPaginationCriteria['limit'],
	) => Promise<{ movementList: Movement[]; pagination: Pagination }>;
	create: (movement: Movement) => Promise<void>;
}
