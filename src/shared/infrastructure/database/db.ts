import { DataSource } from "typeorm";

import { MovementPersistence } from "../../../movements/infrastructure/Movement.persistence";
import { UserPersistence } from "../../../users/infrastructure/Users.persistence";
import { environmentVariables } from "../EnvironmentVariables";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: environmentVariables.DATABASE_HOST,
  port: parseInt(environmentVariables.DATABASE_PORT),
  username: environmentVariables.DATABASE_USERNAME,
  password: environmentVariables.DATABASE_PASSWORD,
  database: environmentVariables.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [MovementPersistence, UserPersistence],
  subscribers: [],
  migrations: [],
});
