import { EntityManager } from "typeorm";

import { User } from "../../users/domain/User";
import { UserPersistence } from "../../users/infrastructure/Users.persistence";
import { AuthRepository } from "../domain/AuthRepository";
import { UserDomainToPersistence } from "./mappers/UserDomainToPersistence";

export const TypeOrmAuthRepository: (props: {
  db: EntityManager;
}) => AuthRepository = ({ db }) => {
  return {
    register: async (user: User) => {
      const userPersistence = UserDomainToPersistence(user);
      await db.save(UserPersistence, userPersistence);
    },
  };
};
