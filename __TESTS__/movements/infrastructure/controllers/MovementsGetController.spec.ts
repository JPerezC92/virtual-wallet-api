import { MockMovementsRepository } from "__TESTS__/movements/fixtures/MockMovementsRepository";
import { movementMockList } from "__TESTS__/movements/fixtures/movementMockList";
import app from "src/app";
import request from "supertest";

import * as AuthAccessTokenEncoder from "@/Auth/infrastructure/service/AuthAccessTokenEncoder";
import { MovementsGetResponse } from "@/Movements/infrastructure/controllers/MovementGetController";
import * as TypeOrmMovementsRepository from "@/Movements/infrastructure/movements.repository";
import { mainRouterPath } from "@/Routes/loadApiEndpoints";
import { movementsRouterPath } from "@/Routes/movements.routes";

jest
	.spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
	.mockImplementation(MockMovementsRepository);

jest.spyOn(AuthAccessTokenEncoder, "AuthAccessTokenEncoder").mockReturnValue({
	decode: jest.fn().mockReturnValue({ id: "123", email: "user@example.com" }),
	encode: jest.fn(),
});

describe(`GET ${mainRouterPath}${movementsRouterPath}`, () => {
	test("should execute the request successfully and return all movements", async () => {
		const response = await request(app)
			.get(`${mainRouterPath}${movementsRouterPath}`)
			.auth("token", { type: "bearer" });

		const body = response.body as ReturnType<MovementsGetResponse["json"]>;

		const movementsGetResponse = new MovementsGetResponse({
			movementList: movementMockList,
			pages: 1,
		});

		expect(response.status).toBe(movementsGetResponse.statusCode);
		expect(body.data.movementList.length).toBe(
			movementsGetResponse.data.movementList.length
		);
		expect(body).toStrictEqual({
			...movementsGetResponse.json(),
			data: {
				movementList: movementsGetResponse.data.movementList.map((m) => ({
					...m,
					date: expect.any(String),
				})),
				pages: 1,
			},
		});
	});
});
