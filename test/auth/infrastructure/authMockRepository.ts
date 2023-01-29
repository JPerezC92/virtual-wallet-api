import { AuthToken } from '@/Auth/domain';
import { User } from '@/Users/domain';

export const authMockRepository = {
	updateRefreshToken: jest.fn<
		Promise<void>,
		[User, AuthToken['refreshToken'], string]
	>(),
};
