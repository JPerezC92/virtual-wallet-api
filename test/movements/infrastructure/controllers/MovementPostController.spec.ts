import { ReasonPhrases } from "http-status-codes";
import request from "supertest";

import app from "../../../../src/app";
import { BudgetMovementType } from "../../../../src/movements/domain/BudgetMovementType";
import { MovementPostResponseDto } from "../../../../src/movements/infrastructure/dto/MovementPostResponse.dto";
import * as TypeOrmMovementsRepository from "../../../../src/movements/infrastructure/movements.repository";
import { mainRouterPath } from "../../../../src/routes/loadApiEndpoints";
import { movementsRouterPath } from "../../../../src/routes/movements.routes";
import { BadRequest } from "../../../../src/shared/infrastructure/requestErrors/BadRequest";
import { MockMovementsRepository } from "../../fixtures/MockMovementsRepository";

const movementsRepository = MockMovementsRepository();

jest
  .spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
  .mockImplementation(() => movementsRepository);

describe("Test on MovementPostController", () => {
  test("should create a new movement", async () => {
    const response = await request(app)
      .post(`${mainRouterPath}${movementsRouterPath}`)
      .send({
        amount: 1000,
        concept: "Salary",
        type: BudgetMovementType.INCOME,
      });

    const movementPostResponseDto = new MovementPostResponseDto();

    expect(response.status).toBe(movementPostResponseDto.statusCode);
    expect(response.body).toStrictEqual({
      ...movementPostResponseDto,
      data: null,
    });
  });

  test("should return a validation error response", async () => {
    const response = await request(app).post(
      `${mainRouterPath}${movementsRouterPath}`
    );

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
