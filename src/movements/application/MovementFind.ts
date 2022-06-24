import { UseCase } from "../../shared/domain/UseCase";
import { Movement } from "../domain/Movement";
import { MovementNotFound } from "../domain/MovementNotFound";
import { MovementsRepository } from "../domain/MovementsRepository";

interface Input {
  movementId: Movement["id"];
  userId: Movement["userId"];
}

export const MovementFind: (props: {
  movementRepository: MovementsRepository;
}) => UseCase<Promise<Movement>, Input> = ({ movementRepository }) => {
  return {
    execute: async ({ movementId, userId }) => {
      const movement = await movementRepository.findOne({
        id: movementId,
        userId,
      });

      if (!movement) throw new MovementNotFound();

      return movement;
    },
  };
};
