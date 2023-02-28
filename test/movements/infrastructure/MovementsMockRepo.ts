import { Movement } from '@/Movements/domain';

export const MovementsMockRespository = () => ({
	create: jest.fn<Promise<void>, [Movement]>(),
});
