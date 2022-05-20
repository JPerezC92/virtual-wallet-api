import { BudgetMovementType } from "../../../src/movements/domain/BudgetMovementType";
import { MovementEndpointDto } from "../../../src/movements/infrastructure/dto/MovementEndpoint.dto";

export const movementMockList: MovementEndpointDto[] = [
  new MovementEndpointDto({
    id: "1",
    concept: "Salary",
    amount: 1000,
    date: new Date(),
    type: BudgetMovementType.INCOME,
  }),

  new MovementEndpointDto({
    id: "2",
    concept: "Rent",
    amount: 500,
    date: new Date(),
    type: BudgetMovementType.EXPENSE,
  }),
];
