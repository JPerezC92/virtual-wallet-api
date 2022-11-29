import { MockMovementsRepository } from "__TESTS__/movements/fixtures/MockMovementsRepository";
import { ReasonPhrases } from "http-status-codes";
import app from "src/app";
import request from "supertest";

import * as AuthAccessTokenEncoder from "@/Auth/infrastructure/service/AuthAccessTokenEncoder";
import { BudgetMovementType } from "@/Movements/domain";
import { MovementPostResponse } from "@/Movements/infrastructure/controllers/MovementPostController";
import * as TypeOrmMovementsRepository from "@/Movements/infrastructure/movements.repository";
import { mainRouterPath } from "@/Routes/loadApiEndpoints";
import { movementsRouterPath } from "@/Routes/movements.routes";
import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";

const movementsRepository = MockMovementsRepository();

jest
	.spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
	.mockImplementation(() => movementsRepository);

jest.spyOn(AuthAccessTokenEncoder, "AuthAccessTokenEncoder").mockReturnValue({
	decode: jest.fn().mockReturnValue({ id: "123", email: "user@example.com" }),
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
