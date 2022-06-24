import request from "supertest";

import app from "../../../../src/app";
import * as AuthAccessTokenEncoder from "../../../../src/auth/infrastructure/service/AuthAccessTokenEncoder";
import { MovementDeleteResponse } from "../../../../src/movements/infrastructure/controllers/MovementDeleteController/MovementDeleteResponse";
import * as TypeOrmMovementsRepository from "../../../../src/movements/infrastructure/movements.repository";
import { mainRouterPath } from "../../../../src/routes/loadApiEndpoints";
import { movementsRouterPath } from "../../../../src/routes/movements.routes";
import { JsUuidGenerator } from "../../../../src/shared/infrastructure/JsUuidGenerator";
import { BadRequest } from "../../../../src/shared/infrastructure/requestErrors/BadRequest";
import { NotFound } from "../../../../src/shared/infrastructure/requestErrors/NotFound";
import { MockMovementsRepository } from "../../fixtures/MockMovementsRepository";
import { movementMockList } from "../../fixtures/movementMockList";

jest
  .spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
  .mockImplementation(MockMovementsRepository);

jest.spyOn(AuthAccessTokenEncoder, "AuthAccessTokenEncoder").mockReturnValue({
  decode: jest.fn().mockReturnValue({ id: "123", email: "user@example.com" }),
  encode: jest.fn(),
});

describe(`DELETE ${mainRouterPath}${movementsRouterPath}/:id`, () => {
  test("should execute the request successfully", async () => {
    const movement = movementMockList[0];
    const response = await request(app)
      .delete(`${mainRouterPath}${movementsRouterPath}/${movement.id}`)
      .auth("token", { type: "bearer" });

    const movementDeleteResponse = new MovementDeleteResponse();

    expect(response.status).toBe(movementDeleteResponse.statusCode);
    expect(response.body).toStrictEqual(movementDeleteResponse.json());
  });

  test("should return a failure message when id is invalid", async () => {
    const response = await request(app)
      .delete(`${mainRouterPath}${movementsRouterPath}/1`)
      .auth("token", { type: "bearer" });

    const badRequest = new BadRequest();

    expect(response.status).toBe(badRequest.statusCode);
    expect(response.body).toStrictEqual({
      ...badRequest.json(),
      message: expect.any(String),
    });
  });

  test("should return an error when movement is not found", async () => {
    const response = await request(app)
      .delete(
        `${mainRouterPath}${movementsRouterPath}/${JsUuidGenerator().generate()}`
      )
      .auth("token", { type: "bearer" });

    const notFound = new NotFound();

    expect(response.status).toBe(notFound.statusCode);
    expect(response.body).toStrictEqual({
      ...notFound.json(),
      message: expect.any(String),
    });
  });
});
