import { BudgetMovementType } from "./BudgetMovementType";

export interface MovementProps {
  id: string;
  concept: string;
  amount: number;
  date: string;
  type: BudgetMovementType;
  userId: string;
}

export class Movement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  type: BudgetMovementType;
  userId: string;

  constructor(movementProps: MovementProps) {
    this.id = movementProps.id;
    this.concept = movementProps.concept;
    this.amount = movementProps.amount;
    this.date = movementProps.date;
    this.type = movementProps.type;
    this.userId = movementProps.userId;
  }

  public static createNew(movementProps: MovementProps): Movement {
    const movement = new Movement({ ...movementProps });
    return movement;
  }

  public modify(props: Pick<MovementProps, "concept" | "amount" | "date">) {
    this.concept = props.concept;
    this.amount = props.amount;
    this.date = props.date;
  }
}
