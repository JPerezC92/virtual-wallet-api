import { Movement } from "./Movement";

export interface MovementsRepository {
  getAll(): Promise<Movement[]>;
}
