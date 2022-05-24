import { Movement } from "./Movement";

export interface MovementsRepository {
  getAll(): Promise<Movement[]>;
  persist(movement: Movement): Promise<void>;
  update(movement: Movement): Promise<void>;
  getById(id: string): Promise<Movement | undefined>;
}
