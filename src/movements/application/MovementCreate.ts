import { UseCase } from "../../shared/domain/UseCase";
import { BudgetMovementType } from "../domain/BudgetMovementType";
import { Movement } from "../domain/Movement";
import { MovementsRepository } from "../domain/MovementsRepository";

interface Input {
  id: string;
  concept: string;
  amount: number;
  type: BudgetMovementType;
}

export const MovementCreate: (props: {
  movementsRepository: MovementsRepository;
}) => UseCase<Promise<void>, Input> = ({ movementsRepository }) => {
  return {
    execute: async ({ id, amount, concept, type }) => {
      const movement = Movement.createNew({
        amount,
        concept,
        type,
        id,
      });

      await movementsRepository.persist(movement);
    },
  };
};
