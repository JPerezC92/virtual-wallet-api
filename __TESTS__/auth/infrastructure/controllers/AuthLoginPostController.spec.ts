import app from "src/app";
import request from "supertest";

import { PasswordEncryptor } from "@/Auth/domain";
import { AuthLoginPostResponse } from "@/Auth/infrastructure/controllers/AuthLoginPostController";
import { AuthLoginDto } from "@/Auth/infrastructure/dto";
import * as BcryptPasswordEncryptor from "@/Auth/infrastructure/service/BcryptPasswordEncryptor";
import { authLoginPath } from "@/Routes/auth.routes";
import { mainRouterPath } from "@/Routes/loadApiEndpoints";
import { BadRequest } from "@/Shared/infrastructure/requestErrors/BadRequest";
import { UnprocessableEntity } from "@/Shared/infrastructure/requestErrors/UnprocessableEntity";
import { User, UsersRepository } from "@/Users/domain";
import * as TypeOrmUsersRepository from "@/Users/infrastructure/TypeOrmUsers.repository";

process.env.JWT_ACCESSS_TOKEN_SECRET = "ACCESSS_TOKEN_SECRET";
process.env.JWT_REFRESH_TOKEN_SECRET = "REFRESH_TOKEN_SECRET";

const mockUser = new User({
	id: "123456789",
	email: "user@example.com",
	password: "123456789",
	firstName: "John",
	lastName: "Doe",
	refreshToken: "refreshToken",
});

const authLoginDto = new AuthLoginDto({
	email: "email@example.com",
	password: "123456789",
});

const usersRepository: UsersRepository = {
	findByEmail: jest
		.fn()
		.mockResolvedValue(mockUser)
		.mockResolvedValueOnce(null),
	update: jest.fn(),
} as unknown as UsersRepository;

const passwordEncryptor: PasswordEncryptor = {
	compare: jest.fn().mockResolvedValue(true).mockResolvedValueOnce(false),
	encrypt: jest.fn(),
};

jest
	.spyOn(BcryptPasswordEncryptor, "BcryptPasswordEncryptor")
	.mockImplementation(() => passwordEncryptor);

jest
	.spyOn(TypeOrmUsersRepository, "TypeOrmUsersRepository")
	.mockImplementation(() => usersRepository);

const pathRoute = `${mainRouterPath}${authLoginPath}`;

describe(`POST ${pathRoute}`, () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("should an unprocessableEntity request error when the user does not exist", async () => {
		const response = await request(app).post(`${pathRoute}`).send(authLoginDto);

		const unprocessableEntity = new UnprocessableEntity();

		expect(response.statusCode).toBe(unprocessableEntity.statusCode);
		expect(response.body).toStrictEqual({
			...unprocessableEntity.json(),
			message: expect.any(String),
		});
	});

	test("should return an unprocessableEntity request error when the password is invalid", async () => {
		const response = await request(app).post(`${pathRoute}`).send(authLoginDto);

		const unprocessableEntity = new UnprocessableEntity();

		expect(response.statusCode).toBe(unprocessableEntity.statusCode);
		expect(response.body).toStrictEqual({
			...unprocessableEntity.json(),
			message: expect.any(String),
		});
	});

	test("should return a badRequest response", async () => {
		const response = await request(app).post(`${pathRoute}`).send({});

		const badRequest = new BadRequest();

		expect(response.statusCode).toBe(badRequest.statusCode);
		expect(response.body).toStrictEqual({
			...badRequest.json(),
			message: expect.any(String),
		});
	});

	test("should execute the request successfully", async () => {
		const response = await request(app).post(`${pathRoute}`).send(authLoginDto);

		const authLoginPostResponse = new AuthLoginPostResponse({
			user: mockUser,
			accessToken: "accessToken",
			refreshToken: "refreshToken",
		});

		const loginResponse = authLoginPostResponse.json();

		expect(response.statusCode).toBe(authLoginPostResponse.statusCode);
		expect(response.body).toStrictEqual({
			...loginResponse,
			data: {
				user: { ...loginResponse.data.user },
				accessToken: expect.any(String),
				refreshToken: expect.any(String),
			},
		});
	});
});
