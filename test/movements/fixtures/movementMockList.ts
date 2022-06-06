import { BudgetMovementType } from "../../../src/movements/domain/BudgetMovementType";
import { Movement } from "../../../src/movements/domain/Movement";
import { JsUuidGenerator } from "../../../src/shared/infrastructure/JsUuidGenerator";

export const movementMockList: Movement[] = [
  new Movement({
    id: JsUuidGenerator().generate(),
    concept: "Salary",
    amount: 1000,
    date: new Date(),
    type: BudgetMovementType.INCOME,
  }),

  new Movement({
    id: "2887bd86-567b-468b-8ccf-1cc815d4ab65",
    concept: "Rent",
    amount: 500,
    date: new Date(),
    type: BudgetMovementType.EXPENSE,
  }),

  new Movement({
    id: JsUuidGenerator().generate(),
    concept: "Food",
    amount: 100,
    date: new Date(),
    type: BudgetMovementType.EXPENSE,
  }),
];
