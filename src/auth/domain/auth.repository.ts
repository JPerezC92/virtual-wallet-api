import { User } from '@/Users/domain';

export interface AuthRepository {
	updateRefreshToken(user: User): Promise<void>;
}
