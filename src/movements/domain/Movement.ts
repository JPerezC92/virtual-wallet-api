import { BudgetMovementType } from "./BudgetMovementType";

interface MovementProps {
  id: string;
  concept: string;
  amount: number;
  date: Date;
  type: BudgetMovementType;
}

export class Movement {
  id: string;
  concept: string;
  amount: number;
  date: Date;
  type: BudgetMovementType;

  constructor(movementProps: MovementProps) {
    this.id = movementProps.id;
    this.concept = movementProps.concept;
    this.amount = movementProps.amount;
    this.date = movementProps.date;
    this.type = movementProps.type;
  }

  public static createNew(movementProps: MovementProps): Movement {
    const movement = new Movement(movementProps);
    return movement;
  }
}
