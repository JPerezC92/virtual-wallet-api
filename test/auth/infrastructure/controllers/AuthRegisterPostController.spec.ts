import request from "supertest";

import app from "../../../../src/app";
import { AuthRepository } from "../../../../src/auth/domain/AuthRepository";
import { AuthRegisterPostResponse } from "../../../../src/auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostResponse";
import { UserCreateDto } from "../../../../src/auth/infrastructure/dto/UserCreate.dto";
import * as TypeOrmAuthRepository from "../../../../src/auth/infrastructure/TypeOrmAuth.repository";
import { authRegisterPath } from "../../../../src/routes/auth.routes";
import { mainRouterPath } from "../../../../src/routes/loadApiEndpoints";
import { BadRequest } from "../../../../src/shared/infrastructure/requestErrors/BadRequest";
import { Conflict } from "../../../../src/shared/infrastructure/requestErrors/Conflict";
import { User } from "../../../../src/users/domain/User";
import { UsersRepository } from "../../../../src/users/domain/UsersRepository";
import * as TypeOrmUsersRepository from "../../../../src/users/infrastructure/TypeOrmUsers.repository";

process.env.JWT_SECRET = "JWT_SECRET";

const registeredUser = new User({
  id: "id",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  password: "password",
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
    .mockResolvedValueOnce(null)
    .mockResolvedValueOnce(registeredUser),
} as UsersRepository;

const authRepository: AuthRepository = {
  register: jest.fn(),
} as AuthRepository;

jest
  .spyOn(TypeOrmUsersRepository, "TypeOrmUsersRepository")
  .mockImplementation(() => usersRepository);
jest
  .spyOn(TypeOrmAuthRepository, "TypeOrmAuthRepository")
  .mockImplementation(() => authRepository);

describe(`POST ${mainRouterPath}${authRegisterPath}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should execute the request successfully", async () => {
    const response = await request(app)
      .post(`${mainRouterPath}${authRegisterPath}`)
      .send(userCreateDto);

    const authRegisterPostResponse = new AuthRegisterPostResponse("token");

    expect(response.statusCode).toBe(authRegisterPostResponse.statusCode);
    expect(response.body).toStrictEqual({
      ...authRegisterPostResponse.json(),
      data: { accessToken: expect.any(String) },
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
