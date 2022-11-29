import { DomainError } from "@/Shared/domain";

export class UserAlreadyExists extends DomainError {
	message = "User already exists";
	name = "UserAlreadyExists";
}
