import { UseCase } from "../../shared/domain/UseCase";
import { Movement } from "../domain/Movement";
import { MovementsRepository } from "../domain/MovementsRepository";

type Input = Pick<Movement, "id" | "concept" | "amount" | "type" | "date">;

export const MovementCreate: (props: {
  movementsRepository: MovementsRepository;
}) => UseCase<Promise<void>, Input> = ({ movementsRepository }) => {
  return {
    execute: async ({ id, amount, concept, type, date }) => {
      const movement = Movement.createNew({
        amount,
        concept,
        date,
        id,
        type,
      });

      await movementsRepository.persist(movement);
    },
  };
};
