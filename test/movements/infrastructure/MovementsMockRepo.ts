import { Account } from '@/Accounts/domain';
import { Movement } from '@/Movements/domain';

export const MovementsMockRespository = () => ({
	create: jest.fn<Promise<void>, [Movement]>(),
	findAll: jest.fn<Promise<Movement[]>, [Account['id']]>(),
});
