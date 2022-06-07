import { BudgetMovementType } from "./BudgetMovementType";

export interface MovementProps {
  id: string;
  concept: string;
  amount: number;
  date: string;
  type: BudgetMovementType;
}

export class Movement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  type: BudgetMovementType;

  constructor(movementProps: MovementProps) {
    this.id = movementProps.id;
    this.concept = movementProps.concept;
    this.amount = movementProps.amount;
    this.date = movementProps.date;
    this.type = movementProps.type;
  }

  public static createNew(
    movementProps: Omit<MovementProps, "date">
  ): Movement {
    const movement = new Movement({
      ...movementProps,
      date: new Date().toISOString(),
    });
    return movement;
  }

  public modify(props: Pick<MovementProps, "concept" | "amount" | "date">) {
    this.concept = props.concept;
    this.amount = props.amount;
    this.date = props.date;
  }
}
