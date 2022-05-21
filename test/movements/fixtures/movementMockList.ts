import { BudgetMovementType } from "../../../src/movements/domain/BudgetMovementType";
import { Movement } from "../../../src/movements/domain/Movement";

export const movementMockList: Movement[] = [
  new Movement({
    id: "1",
    concept: "Salary",
    amount: 1000,
    date: new Date(),
    type: BudgetMovementType.INCOME,
  }),

  new Movement({
    id: "2",
    concept: "Rent",
    amount: 500,
    date: new Date(),
    type: BudgetMovementType.EXPENSE,
  }),
];
