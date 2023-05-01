/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthRepository } from '@/Auth/domain';

export function AuthStubRepository(): AuthRepository {
	return {
		updateRefreshToken: async (_user) => {
			return;
		},

		logout: async (_user) => {
			return;
		},
	};
}
