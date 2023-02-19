import { User } from '@/Users/domain';
import { UserEndpoint } from '@/Users/infrastructure/schemas';

export function UserModelToEndpoint(user: User): UserEndpoint {
	return UserEndpoint.parse(user);
}
