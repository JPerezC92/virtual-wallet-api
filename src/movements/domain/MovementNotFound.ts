import { DomainError } from "@/Shared/domain";

export class MovementNotFound extends DomainError {
	message = "Movement not found";
	name = "MovementNotFound";
}
