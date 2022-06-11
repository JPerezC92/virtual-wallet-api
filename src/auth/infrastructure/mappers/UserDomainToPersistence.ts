import { User } from "../../../users/domain/User";
import { UserPersistence } from "../../../users/infrastructure/Users.persistence";

export function UserDomainToPersistence(user: User) {
  const userPersistence = new UserPersistence();

  userPersistence.id = user.id;
  userPersistence.firstName = user.firstName;
  userPersistence.lastName = user.lastName;
  userPersistence.email = user.email;
  userPersistence.password = user.password;

  return userPersistence;
}
