import { UseCase } from "../../shared/domain/UseCase";
import { User } from "../../users/domain/User";
import { Movement } from "../domain/Movement";
import { MovementsRepository } from "../domain/MovementsRepository";

interface Input extends Pick<Movement, "concept" | "amount" | "type" | "date"> {
  movementId: Movement["id"];
  userId: User["id"];
}

export const MovementCreate: (props: {
  movementsRepository: MovementsRepository;
}) => UseCase<Promise<void>, Input> = ({ movementsRepository }) => {
  return {
    execute: async ({ movementId, amount, concept, type, date, userId }) => {
      const movement = Movement.createNew({
        id: movementId,
        amount,
        concept,
        date,
        type,
        userId,
      });

      await movementsRepository.persist(movement);
    },
  };
};
