import { UseCase } from "../../shared/domain/UseCase";
import { Movement } from "../domain/Movement";
import { MovementNotFound } from "../domain/MovementNotFound";
import { MovementsRepository } from "../domain/MovementsRepository";

interface Input {
  movementId: string;
}

export const MovementFind: (props: {
  movementRepository: MovementsRepository;
}) => UseCase<Promise<Movement>, Input> = ({ movementRepository }) => {
  return {
    execute: async ({ movementId }) => {
      const movement = await movementRepository.getById(movementId);

      if (!movement) throw new MovementNotFound();

      return movement;
    },
  };
};
