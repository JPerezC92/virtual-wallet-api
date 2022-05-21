import { Movement } from "../../domain/Movement";
import { MovementPersistence } from "../Movement.persistence";

export function MovementDomainToPersistence(
  movement: Movement
): MovementPersistence {
  return new Movement({
    id: movement.id,
    concept: movement.concept,
    amount: movement.amount,
    date: movement.date,
    type: movement.type,
  });
}
