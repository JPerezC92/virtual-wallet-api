import { UseCase } from "../../shared/domain/UseCase";
import { Movement } from "../domain/Movement";
import { MovementsRepository } from "../domain/MovementsRepository";
import { OrderType } from "../domain/OrderType";

interface Input {
  page: number;
  limit: number;
  order: OrderType;
}

export const MovementQuery: (props: {
  movementsRepository: MovementsRepository;
}) => UseCase<Promise<Movement[]>, Input> = ({ movementsRepository }) => {
  return {
    execute: async ({ page, limit, order }) => {
      const movementList = await movementsRepository.query({
        page,
        limit,
        order,
      });

      return movementList;
    },
  };
};
