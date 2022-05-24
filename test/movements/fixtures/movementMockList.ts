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
    id: JsUuidGenerator().generate(),
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
