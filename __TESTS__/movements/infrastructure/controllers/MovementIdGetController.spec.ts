import { MockMovementsRepository } from "__TESTS__/movements/fixtures/MockMovementsRepository";
import { movementMockList } from "__TESTS__/movements/fixtures/movementMockList";
import app from "src/app";
import request from "supertest";

import * as AuthAccessTokenEncoder from "@/Auth/infrastructure/service/AuthAccessTokenEncoder";
import { Movement } from "@/Movements/domain";
import { MovementIdGetResponse } from "@/Movements/infrastructure/controllers/MovementIdGetController";
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

const movementId = "2887bd86-567b-468b-8ccf-1cc815d4ab65";

describe(`GET ${mainRouterPath}${movementsRouterPath}/${movementId}`, () => {
	test("should execute the request successfully", async () => {
		const result = await request(app)
			.get(`${mainRouterPath}${movementsRouterPath}/${movementId}`)
			.auth("token", { type: "bearer" })
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
			.auth("token", { type: "bearer" })
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
			.auth("token", { type: "bearer" })
			.send();

		const badRequest = new BadRequest();

		expect(result.statusCode).toBe(badRequest.statusCode);
		expect(result.body).toStrictEqual({
			...badRequest.json(),
			message: expect.any(String),
		});
	});
});
