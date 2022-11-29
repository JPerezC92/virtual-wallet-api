import { UserEndpointDto } from "../../../auth/infrastructure/dto/UserEndpoint.dto";
import { User } from "../../../users/domain/User";

export function UserDomainToEndpoint(user: User) {
	return new UserEndpointDto({
		id: user.id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
	});
}
