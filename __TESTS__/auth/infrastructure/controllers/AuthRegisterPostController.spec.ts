import app from "src/app";
import request from "supertest";

import { AuthRegisterPostResponse } from "@/Auth/infrastructure/controllers/AuthRegisterPostController";
import { UserCreateDto } from "@/Auth/infrastructure/dto";
import { authRegisterPath } from "@/Routes/auth.routes";
import { mainRouterPath } from "@/Routes/loadApiEndpoints";
import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";
import { Conflict } from "@/Shared/infrastructure/requestErrors/Conflict";
import { User, UsersRepository } from "@/Users/domain";
import * as TypeOrmUsersRepository from "@/Users/infrastructure/TypeOrmUsers.repository";

process.env.JWT_ACCESSS_TOKEN_SECRET = "ACCESSS_TOKEN_SECRET";
process.env.JWT_REFRESH_TOKEN_SECRET = "REFRESH_TOKEN_SECRET";

const registeredUser = new User({
	id: "id",
	email: "user@example.com",
	firstName: "John",
	lastName: "Doe",
	password: "password",
	refreshToken: "refreshToken",
});

const userCreateDto = new UserCreateDto({
	email: "user@example.com",
	firstName: "John",
	lastName: "Doe",
	password: "password",
});

const usersRepository: UsersRepository = {
	findByEmail: jest
		.fn()
		.mockResolvedValue(registeredUser)
		.mockResolvedValueOnce(null),
	update: jest.fn(),
	persist: jest.fn(),
} as unknown as UsersRepository;

jest
	.spyOn(TypeOrmUsersRepository, "TypeOrmUsersRepository")
	.mockImplementation(() => usersRepository);

describe(`POST ${mainRouterPath}${authRegisterPath}`, () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("should execute the request successfully", async () => {
		const response = await request(app)
			.post(`${mainRouterPath}${authRegisterPath}`)
			.send(userCreateDto);

		const authRegisterPostResponse = new AuthRegisterPostResponse({
			accessToken: "token",
			refreshToken: "refreshToken",
			user: registeredUser,
		});

		const { data } = authRegisterPostResponse.json();

		expect(response.statusCode).toBe(authRegisterPostResponse.statusCode);
		expect(response.body).toStrictEqual({
			...authRegisterPostResponse.json(),
			data: {
				user: { ...data.user, id: expect.any(String) },
				accessToken: expect.any(String),
				refreshToken: expect.any(String),
			},
		});
	});

	test("should return a conflict error response", async () => {
		const response = await request(app)
			.post(`${mainRouterPath}${authRegisterPath}`)
			.send(userCreateDto);

		const conflict = new Conflict();

		expect(response.status).toBe(conflict.statusCode);
		expect(response.body).toEqual({
			...conflict.json(),
			message: expect.any(String),
		});
	});

	test("should return a badRequest response", async () => {
		const response = await request(app)
			.post(`${mainRouterPath}${authRegisterPath}`)
			.send({});

		const badRequest = new BadRequest();

		expect(response.statusCode).toBe(badRequest.statusCode);
		expect(response.body).toStrictEqual({
			...badRequest.json(),
			message: expect.any(String),
		});
	});
});
