import { BudgetMovementType } from "../../domain/BudgetMovementType";

export class MovementCreateDto {
  readonly concept: string;
  readonly amount: number;
  readonly type: BudgetMovementType;
  readonly date: string;

  constructor(props: {
    concept: string;
    amount: number;
    type: BudgetMovementType;
    date: string;
  }) {
    const { concept, amount, type, date } = props;
    this.concept = concept;
    this.amount = amount;
    this.type = type;
    this.date = date;
  }
}
