import { Movement } from "./Movement";

export interface MovementsRepository {
  delete(id: string): Promise<void>;
  getAll(): Promise<Movement[]>;
  getById(id: string): Promise<Movement | undefined>;
  persist(movement: Movement): Promise<void>;
  update(movement: Movement): Promise<void>;
}
