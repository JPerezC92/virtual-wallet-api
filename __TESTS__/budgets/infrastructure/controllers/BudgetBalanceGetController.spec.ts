import { MockMovementsRepository } from "__TESTS__/movements/fixtures/MockMovementsRepository";
import { movementMockList } from "__TESTS__/movements/fixtures/movementMockList";
import app from "src/app";
import request from "supertest";

import * as AuthAccessTokenEncoder from "@/Auth/infrastructure/service/AuthAccessTokenEncoder";
import { Budget } from "@/Budgets/domain";
import { BudgetBalanceGetResponse } from "@/Budgets/infrastructure/controllers/BudgetBalanceGetController";
import * as TypeOrmMovementsRepository from "@/Movements/infrastructure/movements.repository";
import { budgetBalancePath } from "@/Routes/budgets.routes";
import { mainRouterPath } from "@/Routes/loadApiEndpoints";
import { InternalServerError } from "@/Shared/infrastructure/requestErrors/InternalServerError";

jest
	.spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
	.mockImplementationOnce(MockMovementsRepository)
	.mockImplementationOnce(() => {
		throw new Error();
	});

jest.spyOn(AuthAccessTokenEncoder, "AuthAccessTokenEncoder").mockReturnValue({
	decode: jest.fn().mockReturnValue({ id: "123", email: "user@example.com" }),
	encode: jest.fn(),
});

describe(`GET ${mainRouterPath}${budgetBalancePath}`, () => {
	test("should execute the request successfully", async () => {
		const response = await request(app)
			.get(`${mainRouterPath}${budgetBalancePath}`)
			.auth("token", { type: "bearer" })
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
			.auth("token", { type: "bearer" })
			.send();

		const internalServerError = new InternalServerError();

		expect(response.status).toBe(internalServerError.statusCode);
		expect(response.body).toEqual(internalServerError.json());
	});
});
