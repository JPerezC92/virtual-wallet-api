import { ReasonPhrases } from "http-status-codes";
import request from "supertest";

import app from "../../../../src/app";
import * as AuthAccessTokenEncoder from "../../../../src/auth/infrastructure/service/AuthAccessTokenEncoder";
import { BudgetMovementType } from "../../../../src/movements/domain/BudgetMovementType";
import { MovementPostResponse } from "../../../../src/movements/infrastructure/controllers/MovementPostController/MovementPostResponse";
import * as TypeOrmMovementsRepository from "../../../../src/movements/infrastructure/movements.repository";
import { mainRouterPath } from "../../../../src/routes/loadApiEndpoints";
import { movementsRouterPath } from "../../../../src/routes/movements.routes";
import { BadRequest } from "../../../../src/shared/infrastructure/requestErrors/BadRequest";
import { MockMovementsRepository } from "../../fixtures/MockMovementsRepository";

const movementsRepository = MockMovementsRepository();

jest
  .spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
  .mockImplementation(() => movementsRepository);

jest.spyOn(AuthAccessTokenEncoder, "AuthAccessTokenEncoder").mockReturnValue({
  decode: jest.fn(),
  encode: jest.fn(),
});

describe(`POST ${mainRouterPath}${movementsRouterPath}`, () => {
  test("should create a new movement", async () => {
    const response = await request(app)
      .post(`${mainRouterPath}${movementsRouterPath}`)
      .auth("token", { type: "bearer" })
      .send({
        amount: 1000,
        concept: "Salary",
        type: BudgetMovementType.INCOME,
        date: "2020-01-01",
      });

    const movementPostResponseDto = new MovementPostResponse();

    expect(response.status).toBe(movementPostResponseDto.statusCode);
    expect(response.body).toStrictEqual(movementPostResponseDto.json());
  });

  test("should return a validation error response", async () => {
    const response = await request(app)
      .post(`${mainRouterPath}${movementsRouterPath}`)
      .auth("token", { type: "bearer" });

    const body = response.body as ReturnType<BadRequest["json"]>;

    const badRequest = new BadRequest();

    expect(response.status).toBe(badRequest.statusCode);
    expect(body).toStrictEqual({
      ...badRequest.json(),
      message: expect.any(String),
    });

    expect(body.message).not.toBe(ReasonPhrases.BAD_REQUEST);
  });
});
