import { Account } from '@/Accounts/domain';
import { Movement } from '@/Movements/domain';
import { Pagination } from '@/Shared/domain';

export const MovementsMockRespository = () => ({
	create: jest.fn<Promise<void>, [Movement]>(),
	findAll: jest.fn<
		Promise<{ movementList: Movement[]; pagination: Pagination }>,
		[Account['id']]
	>(),
});
