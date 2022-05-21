import { Movement } from "../../../src/movements/domain/Movement";
import { MovementsRepository } from "../../../src/movements/domain/MovementsRepository";
import { movementMockList } from "./movementMockList";

export const MockMovementsRepository: () => MovementsRepository = () => {
  let movementList = [...movementMockList];

  return {
    getAll: async (): Promise<Movement[]> => {
      return movementList;
    },
    persist: async (movement): Promise<void> => {
      movementList = [...movementList, movement];
    },
  };
};
