import { MovementsRepository } from "../../movements/domain/MovementsRepository";
import { UseCase } from "../../shared/domain/UseCase";
import { Budget } from "../domain/Budget";

export const BudgetCalculateBalance: (props: {
  movementsRepository: MovementsRepository;
}) => UseCase<Promise<number>> = ({ movementsRepository }) => {
  return {
    execute: async () => {
      const movementsList = await movementsRepository.getAll();
      const budget = new Budget({ movementsList });

      return budget.calculateBalance();
    },
  };
};
