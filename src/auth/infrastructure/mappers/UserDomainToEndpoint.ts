import { User } from "../../../users/domain/User";
import { UserEndpointDto } from "../dto/AuthLogin.dto";

export function UserDomainToEndpoint(user: User) {
  return new UserEndpointDto({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
}
