import { User } from '@/Users/domain';
import { UserEndpoint } from '@/Users/infrastructure/schemas';

export function UserModelToEndpoint(userStored: User): UserEndpoint {
	return UserEndpoint.parse(userStored);
}
