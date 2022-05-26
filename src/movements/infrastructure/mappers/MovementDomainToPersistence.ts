import { Movement } from "../../domain/Movement";
import { MovementPersistence } from "../Movement.persistence";

export function MovementDomainToPersistence(
  movement: Movement
): MovementPersistence {
  const movementPersistence = new MovementPersistence();

  movementPersistence.id = movement.id;
  movementPersistence.amount = movement.amount;
  movementPersistence.concept = movement.concept;
  movementPersistence.date = movement.date;
  movementPersistence.type = movement.type;

  return movementPersistence;
}
