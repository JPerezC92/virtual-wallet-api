import request from "supertest";

import app from "../../../../src/app";
import { PasswordEncryptor } from "../../../../src/auth/domain/PasswordEncryptor";
import { AuthLoginPostResponse } from "../../../../src/auth/infrastructure/controllers/AuthLoginPostController/AuthLoginPostResponse";
import { AuthRegisterPostResponse } from "../../../../src/auth/infrastructure/controllers/AuthRegisterPostController/AuthRegisterPostResponse";
import { AuthLoginDto } from "../../../../src/auth/infrastructure/dto/AuthLogin.dto";
import * as BcryptPasswordEncryptor from "../../../../src/auth/infrastructure/service/BcryptPasswordEncryptor";
import { authLoginPath } from "../../../../src/routes/auth.routes";
import { mainRouterPath } from "../../../../src/routes/loadApiEndpoints";
import { BadRequest } from "../../../../src/shared/infrastructure/requestErrors/BadRequest";
import { UnprocessableEntity } from "../../../../src/shared/infrastructure/requestErrors/UnprocessableEntity";
import { User } from "../../../../src/users/domain/User";
import { UsersRepository } from "../../../../src/users/domain/UsersRepository";
import * as TypeOrmUsersRepository from "../../../../src/users/infrastructure/TypeOrmUsers.repository";

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
