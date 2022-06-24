import { UserPersistence } from "../../../users/infrastructure/Users.persistence";
import { Movement } from "../../domain/Movement";
import { MovementPersistence } from "../Movement.persistence";

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
