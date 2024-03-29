import { User } from '@/Users/domain';

export interface UsersRepository {
	findByEmail(email: User['userDetails']['email']): Promise<User | undefined>;
	findByUserId(userId: User['id']): Promise<User | undefined>;
	register(user: User): Promise<void>;
	update(user: User): Promise<User>;
}
