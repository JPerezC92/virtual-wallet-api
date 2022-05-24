import { EntityManager } from "typeorm";

import { Movement } from "../domain/Movement";
import { MovementsRepository } from "../domain/MovementsRepository";
import { MovementDomainToPersistence } from "./mappers/MovementDomainToPersistence";
import { MovementPersistenceToDomain } from "./mappers/MovementPersistenceToDomain";
import { MovementPersistence } from "./Movement.persistence";

export const TypeOrmMovementsRepository: (props: {
  db: EntityManager;
}) => MovementsRepository = ({ db }) => {
  return {
    getAll: async () => {
      const movementsList = await db.find(MovementPersistence);
      return movementsList.map(MovementPersistenceToDomain);
    },

    persist: async (movement: Movement) => {
      const movementPersistence = MovementDomainToPersistence(movement);
      await db.save(MovementPersistence, movementPersistence);
    },

    update: async (movement: Movement): Promise<void> => {
      const movementPersistence = MovementDomainToPersistence(movement);

      await db.update(
        MovementPersistence,
        { id: movement.id },
        movementPersistence
      );
    },

    getById: async (id: string): Promise<Movement | undefined> => {
      const movementPersistence = await db.findOneBy(MovementPersistence, {
        id,
      });

      if (!movementPersistence) return;

      return MovementPersistenceToDomain(movementPersistence);
    },
  };
};
