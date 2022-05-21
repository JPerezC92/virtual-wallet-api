import { BudgetMovementType } from "../../domain/BudgetMovementType";

export class MovementCreateDto {
  readonly concept: string;
  readonly amount: number;
  readonly type: BudgetMovementType;

  constructor(props: {
    concept: string;
    amount: number;
    type: BudgetMovementType;
  }) {
    const { concept, amount, type } = props;
    this.concept = concept;
    this.amount = amount;
    this.type = type;
  }
}
