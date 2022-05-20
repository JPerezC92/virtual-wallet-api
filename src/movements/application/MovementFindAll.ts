import { UseCase } from "../../shared/domain/UseCase";
import { Movement } from "../domain/Movement";
import { MovementsRepository } from "../domain/MovementsRepository";

export const MovementFindAll: (props: {
  movementsRepository: MovementsRepository;
}) => UseCase<Promise<Movement[]>> = ({ movementsRepository }) => {
  return {
    execute: async () => {
      const movementList = await movementsRepository.getAll();

      return movementList;
    },
  };
};
