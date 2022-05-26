import request from "supertest";

import app from "../../../../src/app";
import { Budget } from "../../../../src/budgets/domain/Budget";
import { BudgetBalanceGetResponse } from "../../../../src/budgets/infrastructure/controllers/BudgetBalanceGetController/BudgetBalanceGetResponse";
import * as TypeOrmMovementsRepository from "../../../../src/movements/infrastructure/movements.repository";
import { budgetBalancePath } from "../../../../src/routes/budgets.routes";
import { mainRouterPath } from "../../../../src/routes/loadApiEndpoints";
import { InternalServerError } from "../../../../src/shared/infrastructure/requestErrors/InternalServerError";
import { MockMovementsRepository } from "../../../movements/fixtures/MockMovementsRepository";
import { movementMockList } from "../../../movements/fixtures/movementMockList";

jest
  .spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
  .mockImplementationOnce(MockMovementsRepository)
  .mockImplementationOnce(() => {
    throw new Error("MockError");
  });

describe(`GET ${mainRouterPath}${budgetBalancePath}`, () => {
  test("should execute the request successfully", async () => {
    const response = await request(app)
      .get(`${mainRouterPath}${budgetBalancePath}`)
      .send();

    const budgetBalanceGetResponse = new BudgetBalanceGetResponse(
      new Budget({ movementsList: movementMockList }).calculateBalance()
    );

    expect(response.status).toBe(budgetBalanceGetResponse.statusCode);
    expect(response.body).toEqual(budgetBalanceGetResponse.json());
  });

  test("should return an internal server error response", async () => {
    const response = await request(app)
      .get(`${mainRouterPath}${budgetBalancePath}`)
      .send();

    const internalServerError = new InternalServerError();

    expect(response.status).toBe(internalServerError.statusCode);
    expect(response.body).toEqual(internalServerError.json());
  });
});
