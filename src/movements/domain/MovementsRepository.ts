import { Movement } from "./Movement";

export interface MovementsRepository {
  getAll(): Promise<Movement[]>;
  persist(movement: Movement): Promise<void>;
}
