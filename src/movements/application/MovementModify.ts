import { UseCase } from "../../shared/domain/UseCase";
import { MovementProps } from "../domain/Movement";
import { MovementNotFound } from "../domain/MovementNotFound";
import { MovementsRepository } from "../domain/MovementsRepository";

type Input = Pick<MovementProps, "id" | "concept" | "amount" | "date">;

export const MovementModify: (props: {
  movementsRepository: MovementsRepository;
}) => UseCase<Promise<void>, Input> = ({ movementsRepository }) => {
  return {
    execute: async ({ id, amount, concept, date }) => {
      const movement = await movementsRepository.getById(id);

      if (!movement) throw new MovementNotFound();

      movement.modify({ concept, amount, date });

      await movementsRepository.update(movement);
    },
  };
};
