import request from "supertest";

import app from "../../../../src/app";
import { mainRouterPath } from "../../../../src/controllers/api";
import { MovementPutResponse } from "../../../../src/movements/infrastructure/controllers/MovementPutController/MovementPutResponse";
import * as TypeOrmMovementsRepository from "../../../../src/movements/infrastructure/movements.repository";
import { movementsRouterPath } from "../../../../src/movements/infrastructure/movements.routes";
import { JsUuidGenerator } from "../../../../src/shared/infrastructure/JsUuidGenerator";
import { BadRequest } from "../../../../src/shared/infrastructure/requestErrors/BadRequest";
import { NotFound } from "../../../../src/shared/infrastructure/requestErrors/NotFound";
import { MockMovementsRepository } from "../../fixtures/MockMovementsRepository";
import { movementMockList } from "../../fixtures/movementMockList";

const movementsRepository = MockMovementsRepository();

jest
  .spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
  .mockImplementation(() => movementsRepository);

describe("Test on MovementPutController", () => {
  test("should modify the movement successfully", async () => {
    const movementMock = { ...movementMockList[0] };

    const response = await request(app)
      .put(`${mainRouterPath}${movementsRouterPath}/${movementMock.id}`)
      .send({
        date: new Date(),
        concept: "Salary edited",
        amount: 2000,
      });

    const body = response.body as MovementPutResponse;
    const movementPutResponse = new MovementPutResponse();

    expect(response.status).toBe(movementPutResponse.statusCode);
    expect(body).toStrictEqual(movementPutResponse.json());
  });

  test("should return an error response if the id is invalid", async () => {
    const response = await request(app)
      .put(`${mainRouterPath}${movementsRouterPath}/123`)
      .send({ date: new Date(), concept: "Salary edited", amount: 2000 });

    const body = response.body as MovementPutResponse;
    const badRequest = new BadRequest();

    expect(response.status).toBe(badRequest.statusCode);
    expect(body).toStrictEqual({
      ...badRequest.json(),
      message: expect.any(String),
    });
  });

  test("should return an error response if the date is not provided", async () => {
    const movementMock = { ...movementMockList[0] };

    const response = await request(app)
      .put(`${mainRouterPath}${movementsRouterPath}/${movementMock.id}`)
      .send({ concept: "Salary edited", amount: 2000 });

    const body = response.body as MovementPutResponse;
    const badRequest = new BadRequest();

    expect(response.status).toBe(badRequest.statusCode);
    expect(body).toStrictEqual({
      ...badRequest.json(),
      message: expect.any(String),
    });
  });

  test("should return an error response if the concept is not provided", async () => {
    const movementMock = { ...movementMockList[0] };

    const response = await request(app)
      .put(`${mainRouterPath}${movementsRouterPath}/${movementMock.id}`)
      .send({ date: new Date(), amount: 2000 });

    const body = response.body as MovementPutResponse;
    const badRequest = new BadRequest();

    expect(response.status).toBe(badRequest.statusCode);
    expect(body).toStrictEqual({
      ...badRequest.json(),
      message: expect.any(String),
    });
  });

  test("should return an error response if the amount is not provided", async () => {
    const movementMock = { ...movementMockList[0] };

    const response = await request(app)
      .put(`${mainRouterPath}${movementsRouterPath}/${movementMock.id}`)
      .send({ date: new Date(), concept: "Salary edited" });

    const body = response.body as MovementPutResponse;
    const badRequest = new BadRequest();

    expect(response.status).toBe(badRequest.statusCode);
    expect(body).toStrictEqual({
      ...badRequest.json(),
      message: expect.any(String),
    });
  });

  test("should return an error response if the movement is not found", async () => {
    const movementMock = { ...movementMockList[0] };

    const response = await request(app)
      .put(
        `${mainRouterPath}${movementsRouterPath}/${JsUuidGenerator().generate()}`
      )
      .send({ date: new Date(), concept: "Salary edited", amount: 2000 });

    const body = response.body as MovementPutResponse;
    const notFound = new NotFound();

    expect(response.status).toBe(notFound.statusCode);

    expect(body).toStrictEqual({
      ...notFound.json(),
      message: expect.any(String),
    });
  });
});
