import { User } from '@/Users/domain';

export const authMockRepository = () => ({
	updateRefreshToken: jest.fn<Promise<void>, [User]>(),
});
