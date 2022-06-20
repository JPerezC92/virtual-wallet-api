import { DomainError } from "../../shared/domain/DomainError";

export class UserNotFound extends DomainError {
  name: string;
  message: string;

  constructor(message?: string) {
    super();
    this.name = "UserNotFound";
    this.message = message || "User not found";
  }
}
