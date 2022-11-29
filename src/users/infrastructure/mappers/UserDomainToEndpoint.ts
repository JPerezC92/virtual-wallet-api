import { UserEndpointDto } from "@/Auth/infrastructure/dto";
import { User } from "@/Users/domain";

export function UserDomainToEndpoint(user: User) {
	return new UserEndpointDto({
		id: user.id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
	});
}
