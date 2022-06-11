import { EntityManager } from "typeorm";

import { UsersRepository } from "../domain/UsersRepository";
import { UserPersistenceToDomain } from "./mappers/UserPersistenceToDomain";
import { UserPersistence } from "./Users.persistence";

export const TypeOrmUsersRepository: (props: {
  db: EntityManager;
}) => UsersRepository = ({ db }) => {
  return {
    findByEmail: async (email: string) => {
      const userPersistence = await db.findOne(UserPersistence, {
        where: { email },
      });

      if (!userPersistence) return;

      return UserPersistenceToDomain(userPersistence);
    },
  };
};
