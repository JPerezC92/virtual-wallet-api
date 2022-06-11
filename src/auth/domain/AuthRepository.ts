import { User } from "../../users/domain/User";

export interface AuthRepository {
  register(user: User): Promise<void>;
}
