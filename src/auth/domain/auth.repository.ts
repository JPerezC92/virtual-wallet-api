import { AuthToken } from '@/Auth/domain/';
import { User } from '@/Users/domain';

export interface AuthRepository {
	updateRefreshToken(
		user: User,
		refreshToken: AuthToken['refreshToken'],
		ip: string,
	): Promise<void>;
}
