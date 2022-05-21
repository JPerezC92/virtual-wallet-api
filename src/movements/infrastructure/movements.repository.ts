import { EntityManager } from "typeorm";

import { Movement } from "../domain/Movement";
import { MovementsRepository } from "../domain/MovementsRepository";
import { MovementDomainToPersistence } from "./mappers/MovementDomainToPersistence";
import { MovementPersistenceToDomain } from "./mappers/MovementPersistenceToDomain";
import { MovementPersistence } from "./Movement.persistence";

export const TypeOrmMovementsRepository: (props: {
  db: EntityManager;
}) => MovementsRepository = ({ db: entityManager }) => {
  return {
    getAll: async () => {
      const movementsList = await entityManager.find(MovementPersistence);
      return movementsList.map(MovementPersistenceToDomain);
    },

    persist: async (movement: Movement) => {
      const movementPersistence = MovementDomainToPersistence(movement);
      await entityManager.save(MovementPersistence, movementPersistence);
    },
  };
};
