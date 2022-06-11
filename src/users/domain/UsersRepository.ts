import { User } from "./User";

export interface UsersRepository {
  findByEmail: (email: string) => Promise<User | undefined>;
}
