import { DomainError } from "../../shared/domain/DomainError";

export class InvalidCredentials extends DomainError {
  name = "InvalidCredentials";
  message = "Invalid username or password";
}
