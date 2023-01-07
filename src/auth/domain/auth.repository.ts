import { User } from '@/Users/domain';

export interface AuthRepository {
	register(user: User): Promise<void>;
}
