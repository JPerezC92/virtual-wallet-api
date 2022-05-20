import { DataSource } from "typeorm";

import { MovementPersistence } from "../../../movements/infrastructure/Movement.persistence";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "budget-manager",
  password: "123456",
  database: "budget-manager",
  synchronize: true,
  logging: true,
  entities: [MovementPersistence],
  subscribers: [],
  migrations: [],
});
