import { DomainError } from "@/Shared/domain";

export class UserNotFound extends DomainError {
	name: string;
	message: string;

	constructor(message?: string) {
		super();
		this.name = "UserNotFound";
		this.message = message || "User not found";
	}
}
