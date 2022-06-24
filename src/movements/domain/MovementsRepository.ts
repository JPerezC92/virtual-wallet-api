import { BudgetMovementType } from "./BudgetMovementType";
import { Movement } from "./Movement";
import { OrderType } from "./OrderType";

export interface MovementsRepository {
  delete(id: string): Promise<void>;
  getAll(props: { userId: Movement["userId"] }): Promise<Movement[]>;
  query(props: {
    page: number;
    limit: number;
    order: OrderType;
    movementType?: BudgetMovementType;
    userId: string;
  }): Promise<Movement[]>;
  findOne(
    props: Pick<Movement, "id" | "userId">
  ): Promise<Movement | undefined>;
  persist(movement: Movement): Promise<void>;
  update(movement: Movement): Promise<void>;
}
