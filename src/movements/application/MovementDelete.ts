import { UseCase } from "../../shared/domain/UseCase";
import { MovementNotFound } from "../domain/MovementNotFound";
import { MovementsRepository } from "../domain/MovementsRepository";

interface Input {
  movementId: string;
}

export const MovementDelete: (props: {
  movementRepository: MovementsRepository;
}) => UseCase<Promise<void>, Input> = ({ movementRepository }) => {
  return {
    execute: async ({ movementId }) => {
      const movement = await movementRepository.getById(movementId);

      if (!movement) throw new MovementNotFound();

      await movementRepository.delete(movementId);
    },
  };
};
