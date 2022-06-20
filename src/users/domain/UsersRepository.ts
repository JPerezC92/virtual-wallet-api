import { User } from "./User";

export interface UsersRepository {
  findByEmail: (email: string) => Promise<User | undefined>;
  update: (user: User) => Promise<void>;
  persist: (user: User) => Promise<void>;
}
