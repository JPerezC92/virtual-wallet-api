import { DomainError } from "../../shared/domain/DomainError";

export class UserAlreadyExists extends DomainError {
  message = "User already exists";
  name = "UserAlreadyExists";
}
