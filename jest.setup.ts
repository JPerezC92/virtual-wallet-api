import { EntityManager } from "typeorm";

import * as Uow from "./src/shared/infrastructure/database/uow";

jest.spyOn(Uow, "Uow").mockImplementation(() => ({
  connection: () => ({} as EntityManager),
  transactional: async (callback) => callback(),
}));
