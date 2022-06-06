import request from "supertest";

import app from "../../../../src/app";
import { Movement } from "../../../../src/movements/domain/Movement";
import { MovementIdGetResponse } from "../../../../src/movements/infrastructure/controllers/MovementIdGetController/MovementIdGetResponse";
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

const movementId = "2887bd86-567b-468b-8ccf-1cc815d4ab65";

describe(`GET ${mainRouterPath}${movementsRouterPath}/${movementId}`, () => {
  test("should execute the request successfully", async () => {
    const result = await request(app)
      .get(`${mainRouterPath}${movementsRouterPath}/${movementId}`)
      .send();

    const movement = movementMockList.find(({ id }) => id === movementId);

    const movementIdGetResponse = new MovementIdGetResponse(
      movement as Movement
    );

    expect(result.statusCode).toBe(movementIdGetResponse.statusCode);
    expect(result.body).toStrictEqual({
      ...movementIdGetResponse.json(),
      data: {
        ...movementIdGetResponse.json().data,
        date: expect.any(String),
      },
    });
  });

  test("should return 404 if the movement does not exist", async () => {
    const result = await request(app)
      .get(
        `${mainRouterPath}${movementsRouterPath}/${JsUuidGenerator().generate()}`
      )
      .send();

    const notFound = new NotFound();

    expect(result.statusCode).toBe(notFound.statusCode);
    expect(result.body).toStrictEqual({
      ...notFound.json(),
      message: expect.any(String),
    });
  });

  test("should return 400 if the movement id is not a valid uuid", async () => {
    const result = await request(app)
      .get(`${mainRouterPath}${movementsRouterPath}/invalid-uuid`)
      .send();

    const badRequest = new BadRequest();

    expect(result.statusCode).toBe(badRequest.statusCode);
    expect(result.body).toStrictEqual({
      ...badRequest.json(),
      message: expect.any(String),
    });
  });
});
