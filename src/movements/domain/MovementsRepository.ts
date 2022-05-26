import { Movement } from "./Movement";
import { OrderType } from "./OrderType";

export interface MovementsRepository {
  delete(id: string): Promise<void>;
  getAll(): Promise<Movement[]>;
  query(props?: {
    page: number;
    limit: number;
    order: OrderType;
  }): Promise<Movement[]>;
  getById(id: string): Promise<Movement | undefined>;
  persist(movement: Movement): Promise<void>;
  update(movement: Movement): Promise<void>;
}
