import { DomainError } from "@/Shared/domain";

export class InvalidCredentials extends DomainError {
	name = "InvalidCredentials";
	message = "Invalid username or password";
}
