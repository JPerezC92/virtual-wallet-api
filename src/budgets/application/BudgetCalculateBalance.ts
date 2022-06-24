import { MovementsRepository } from "../../movements/domain/MovementsRepository";
import { UseCase } from "../../shared/domain/UseCase";
import { User } from "../../users/domain/User";
import { Budget } from "../domain/Budget";

interface Input {
  userId: User["id"];
}

export const BudgetCalculateBalance: (props: {
  movementsRepository: MovementsRepository;
}) => UseCase<Promise<number>, Input> = ({ movementsRepository }) => {
  return {
    execute: async ({ userId }) => {
      const movementsList = await movementsRepository.getAll({ userId });
      const budget = new Budget({ movementsList });

      return budget.calculateBalance();
    },
  };
};
