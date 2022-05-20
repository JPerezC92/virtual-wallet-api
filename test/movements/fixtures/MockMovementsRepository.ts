import { MovementsRepository } from "../../../src/movements/domain/MovementsRepository";
import { movementMockList } from "./movementMockList";

export const MockMovementsRepository: () => MovementsRepository = () => {
  return {
    getAll: async () => {
      return movementMockList;
    },
  };
};
