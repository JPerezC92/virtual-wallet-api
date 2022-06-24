import { BudgetMovementType } from "../../../src/movements/domain/BudgetMovementType";
import { Movement } from "../../../src/movements/domain/Movement";
import { JsUuidGenerator } from "../../../src/shared/infrastructure/JsUuidGenerator";

const userId = "1";

export const movementMockList: Movement[] = [
  new Movement({
    id: JsUuidGenerator().generate(),
    concept: "Salary",
    amount: 1000,
    date: new Date().toISOString(),
    type: BudgetMovementType.INCOME,
    userId,
  }),

  new Movement({
    id: "2887bd86-567b-468b-8ccf-1cc815d4ab65",
    concept: "Rent",
    amount: 500,
    date: new Date().toISOString(),
    type: BudgetMovementType.EXPENSE,
    userId,
  }),

  new Movement({
    id: JsUuidGenerator().generate(),
    concept: "Food",
    amount: 100,
    date: new Date().toISOString(),
    type: BudgetMovementType.EXPENSE,
    userId,
  }),
];
