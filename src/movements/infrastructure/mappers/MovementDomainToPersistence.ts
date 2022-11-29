import { Movement } from "@/Movements/domain";
import { MovementPersistence } from "@/Movements/infrastructure/Movement.persistence";
import { UserPersistence } from "@/Users/infrastructure/Users.persistence";

export function MovementDomainToPersistence(
	movement: Movement
): MovementPersistence {
	const movementPersistence = new MovementPersistence();
	const userPersistence = new UserPersistence();
	userPersistence.id = movement.userId;

	movementPersistence.id = movement.id;
	movementPersistence.amount = movement.amount.toString();
	movementPersistence.concept = movement.concept;
	movementPersistence.date = movement.date;
	movementPersistence.type = movement.type;
	movementPersistence.user = userPersistence;

	return movementPersistence;
}
