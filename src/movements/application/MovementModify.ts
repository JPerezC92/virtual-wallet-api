import { UseCase } from "../../shared/domain/UseCase";
import { Movement, MovementProps } from "../domain/Movement";
import { MovementNotFound } from "../domain/MovementNotFound";
import { MovementsRepository } from "../domain/MovementsRepository";

interface Input {
  movementId: Movement["userId"];
  userId: Movement["userId"];
  concept: Movement["concept"];
  amount: Movement["amount"];
  date: Movement["date"];
}

export const MovementModify: (props: {
  movementsRepository: MovementsRepository;
}) => UseCase<Promise<void>, Input> = ({ movementsRepository }) => {
  return {
    execute: async ({ movementId, amount, concept, date, userId }) => {
      const movement = await movementsRepository.findOne({
        id: movementId,
        userId,
      });

      if (!movement) throw new MovementNotFound();

      movement.modify({ concept, amount, date });

      await movementsRepository.update(movement);
    },
  };
};
