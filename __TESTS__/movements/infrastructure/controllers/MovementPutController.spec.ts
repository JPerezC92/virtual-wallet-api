import { MockMovementsRepository } from "__TESTS__/movements/fixtures/MockMovementsRepository";
import { movementMockList } from "__TESTS__/movements/fixtures/movementMockList";
import app from "src/app";
import request from "supertest";

import * as AuthAccessTokenEncoder from "@/Auth/infrastructure/service/AuthAccessTokenEncoder";
import { MovementPutResponse } from "@/Movements/infrastructure/controllers/MovementPutController";
import * as TypeOrmMovementsRepository from "@/Movements/infrastructure/movements.repository";
import { mainRouterPath } from "@/Routes/loadApiEndpoints";
import { movementsRouterPath } from "@/Routes/movements.routes";
import { JsUuidGenerator } from "@/Shared/infrastructure/JsUuidGenerator";
import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";
import { NotFound } from "@/Shared/infrastructure/requestErrors/NotFound";

const movementsRepository = MockMovementsRepository();

const movementData = {
	date: "2020-01-01",
	concept: "Salary edited",
	amount: 2000,
};

jest
	.spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
	.mockImplementation(() => movementsRepository);

jest.spyOn(AuthAccessTokenEncoder, "AuthAccessTokenEncoder").mockReturnValue({
	decode: jest.fn().mockReturnValue({ id: "123", email: "user@example.com" }),
	encode: jest.fn(),
});

describe(`PUT ${mainRouterPath}${movementsRouterPath}/:id`, () => {
	test("should modify the movement successfully", async () => {
		const movementMock = { ...movementMockList[0] };

		const response = await request(app)
			.put(`${mainRouterPath}${movementsRouterPath}/${movementMock.id}`)
			.auth("token", { type: "bearer" })
			.send(movementData);

		const body = response.body as MovementPutResponse;
		const movementPutResponse = new MovementPutResponse();

		expect(response.status).toBe(movementPutResponse.statusCode);
		expect(body).toStrictEqual(movementPutResponse.json());
	});

	test("should return an error response if the id is invalid", async () => {
		const response = await request(app)
			.put(`${mainRouterPath}${movementsRouterPath}/123`)
			.auth("token", { type: "bearer" })
			.send(movementData);

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
			.auth("token", { type: "bearer" })
			.send({ concept: movementData.concept, amount: movementData.amount });

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
			.auth("token", { type: "bearer" })
			.send({ date: movementData.date, amount: movementData.amount });

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
			.auth("token", { type: "bearer" })
			.send({ date: movementData.date, concept: movementData.concept });

		const body = response.body as MovementPutResponse;
		const badRequest = new BadRequest();

		expect(response.status).toBe(badRequest.statusCode);
		expect(body).toStrictEqual({
			...badRequest.json(),
			message: expect.any(String),
		});
	});

	test("should return an error response if the movement is not found", async () => {
		const response = await request(app)
			.put(
				`${mainRouterPath}${movementsRouterPath}/${JsUuidGenerator().generate()}`
			)
			.auth("token", { type: "bearer" })
			.send(movementData);

		const body = response.body as MovementPutResponse;
		const notFound = new NotFound();

		expect(response.status).toBe(notFound.statusCode);

		expect(body).toStrictEqual({
			...notFound.json(),
			message: expect.any(String),
		});
	});
});
