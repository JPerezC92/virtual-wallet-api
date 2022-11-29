import { Movement } from "@/Movements/domain";
import { MovementPersistence } from "@/Movements/infrastructure/Movement.persistence";

export function MovementPersistenceToDomain(
	movementPersistence: MovementPersistence
): Movement {
	return new Movement({
		id: movementPersistence.id,
		concept: movementPersistence.concept,
		amount: parseFloat(movementPersistence.amount),
		date: movementPersistence.date,
		type: movementPersistence.type,
		userId: movementPersistence.userId,
	});
}
