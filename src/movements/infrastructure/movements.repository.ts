import { EntityManager } from "typeorm";

import { MovementsRepository } from "../domain/MovementsRepository";
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
  };
};
