import { MockMovementsRepository } from "__TESTS__/movements/fixtures/MockMovementsRepository";
import { movementMockList } from "__TESTS__/movements/fixtures/movementMockList";
import app from "src/app";
import request from "supertest";

import * as AuthAccessTokenEncoder from "@/Auth/infrastructure/service/AuthAccessTokenEncoder";
import { MovementDeleteResponse } from "@/Movements/infrastructure/controllers/MovementDeleteController";
import * as TypeOrmMovementsRepository from "@/Movements/infrastructure/movements.repository";
import { mainRouterPath } from "@/Routes/loadApiEndpoints";
import { movementsRouterPath } from "@/Routes/movements.routes";
import { JsUuidGenerator } from "@/Shared/infrastructure/JsUuidGenerator";
import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";
import { NotFound } from "@/Shared/infrastructure/requestErrors/NotFound";

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
