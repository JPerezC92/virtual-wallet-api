import { EntityManager } from "typeorm";

import { User } from "../domain/User";
import { UsersRepository } from "../domain/UsersRepository";
import { UserDomainToPersistence } from "./mappers/UserDomainToPersistence";
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

    update: async (user: User) => {
      const userPersistence = UserDomainToPersistence(user);
      await db.update(
        UserPersistence,
        { id: userPersistence.id },
        userPersistence
      );
    },

    persist: async (user: User): Promise<void> => {
      const userPersistence = UserDomainToPersistence(user);
      await db.save(UserPersistence, userPersistence);
    },
  };
};
