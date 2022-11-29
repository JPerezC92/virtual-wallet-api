import { User } from "@/Users/domain";
import { UserPersistence } from "@/Users/infrastructure/Users.persistence";

export function UserDomainToPersistence(user: User) {
	const userPersistence = new UserPersistence();

	userPersistence.id = user.id;
	userPersistence.firstName = user.firstName;
	userPersistence.lastName = user.lastName;
	userPersistence.email = user.email;
	userPersistence.password = user.password;
	userPersistence.refreshToken = user.refreshToken;

	return userPersistence;
}
