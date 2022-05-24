import { DomainError } from "../../shared/domain/DomainError";

export class MovementNotFound extends DomainError {
  message = "Movement not found";
  name = "MovementNotFound";
}
