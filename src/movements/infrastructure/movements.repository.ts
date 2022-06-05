import { EntityManager } from "typeorm";

import { Movement } from "../domain/Movement";
import { MovementsRepository } from "../domain/MovementsRepository";
import { OrderType } from "../domain/OrderType";
import { MovementDomainToPersistence } from "./mappers/MovementDomainToPersistence";
import { MovementPersistenceToDomain } from "./mappers/MovementPersistenceToDomain";
import { MovementPersistence } from "./Movement.persistence";
import { calculateSkip } from "./utils/calculateSkip";

export const TypeOrmMovementsRepository: (props: {
  db: EntityManager;
}) => MovementsRepository = ({ db }) => {
  return {
    getAll: async () => {
      const movementsList = await db.find(MovementPersistence);
      return movementsList.map(MovementPersistenceToDomain);
    },

    query: async (props?: {
      page: number;
      limit: number;
      order: OrderType;
    }) => {
      let skip = 0;
      let take = 0;
      if (props) {
        skip = calculateSkip({ page: props.page, limit: props.limit });
        take = props.limit;
      }

      const movementsList = await db.find(MovementPersistence, {
        skip,
        take,
        order: {
          createdAt: props?.order,
        },
      });

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

    delete: async (id: string): Promise<void> => {
      await db.delete(MovementPersistence, { id });
    },
  };
};
