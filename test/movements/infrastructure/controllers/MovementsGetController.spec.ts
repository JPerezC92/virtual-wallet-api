import request from "supertest";

import app from "../../../../src/app";
import * as AuthAccessTokenEncoder from "../../../../src/auth/infrastructure/service/AuthAccessTokenEncoder";
import { MovementsGetResponse } from "../../../../src/movements/infrastructure/controllers/MovementGetController/MovementsGetResponse";
import * as TypeOrmMovementsRepository from "../../../../src/movements/infrastructure/movements.repository";
import { mainRouterPath } from "../../../../src/routes/loadApiEndpoints";
import { movementsRouterPath } from "../../../../src/routes/movements.routes";
import { MockMovementsRepository } from "../../fixtures/MockMovementsRepository";
import { movementMockList } from "../../fixtures/movementMockList";

jest
  .spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
  .mockImplementation(MockMovementsRepository);

jest
  .spyOn(AuthAccessTokenEncoder, "AuthAccessTokenEncoder")
  .mockReturnValue({ decode: jest.fn(), encode: jest.fn() });

describe(`GET ${mainRouterPath}${movementsRouterPath}`, () => {
  test("should execute the request successfully and return all movements", async () => {
    const response = await request(app)
      .get(`${mainRouterPath}${movementsRouterPath}`)
      .auth("Authorization", { type: "bearer" });

    const body = response.body as ReturnType<MovementsGetResponse["json"]>;

    const movementsGetResponse = new MovementsGetResponse(movementMockList);

    expect(response.status).toBe(movementsGetResponse.statusCode);
    expect(body.data.length).toBe(movementsGetResponse.data.length);
    expect(body).toStrictEqual({
      ...movementsGetResponse.json(),
      data: movementsGetResponse.data.map((m) => ({
        ...m,
        date: expect.any(String),
      })),
    });
  });
});
