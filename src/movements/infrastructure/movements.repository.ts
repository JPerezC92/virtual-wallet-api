import { EntityManager } from "typeorm";

import { BudgetMovementType } from "../domain/BudgetMovementType";
import { Movement } from "../domain/Movement";
import { MovementsRepository } from "../domain/MovementsRepository";
import { OrderType } from "../domain/OrderType";
import { MovementDomainToPersistence } from "./mappers/MovementDomainToPersistence";
import { MovementPersistenceToDomain } from "./mappers/MovementPersistenceToDomain";
import { MovementPersistence } from "./Movement.persistence";
import { calculateSkip } from "./utils/calculateSkip";

function calculatePages(count: number, limit: number) {
  if (limit === 0) {
    return 1;
  }
  return Math.ceil(count / limit);
}

export const TypeOrmMovementsRepository: (props: {
  db: EntityManager;
}) => MovementsRepository = ({ db }) => {
  return {
    getAll: async ({ userId }) => {
      const movementsList = await db.find(MovementPersistence, {
        where: { user: { id: userId } },
      });
      return movementsList.map(MovementPersistenceToDomain);
    },

    query: async (props: {
      page: number;
      limit: number;
      order: OrderType;
      movementType?: BudgetMovementType;
      userId: string;
    }) => {
      let skip = 0;
      let take = 0;
      if (props) {
        skip = calculateSkip({ page: props.page, limit: props.limit });
        take = props.limit;
      }

      const movementCount = await db.count(MovementPersistence, {
        where: { user: { id: props.userId }, type: props.movementType },
      });

      const movementsList = await db.find(MovementPersistence, {
        skip,
        take,
        where: { type: props.movementType, user: { id: props.userId } },
        order: {
          createdAt: props?.order,
        },
      });

      return {
        movementList: movementsList.map(MovementPersistenceToDomain),
        pages: calculatePages(movementCount, props.limit),
      };
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

    findOne: async ({ id, userId }): Promise<Movement | undefined> => {
      const movementPersistence = await db.findOneBy(MovementPersistence, {
        id,
        user: { id: userId },
      });

      if (!movementPersistence) return;

      return MovementPersistenceToDomain(movementPersistence);
    },

    delete: async (id: string): Promise<void> => {
      await db.delete(MovementPersistence, { id });
    },
  };
};
