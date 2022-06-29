import request from "supertest";

import app from "../../../../src/app";
import { AuthLogoutGetResponse } from "../../../../src/auth/infrastructure/controllers/AuthLogoutGetController/AuthLogoutGetResponse";
import * as AuthAccessTokenEncoder from "../../../../src/auth/infrastructure/service/AuthAccessTokenEncoder";
import { authLogoutPath } from "../../../../src/routes/auth.routes";
import { mainRouterPath } from "../../../../src/routes/loadApiEndpoints";
import { JsUuidGenerator } from "../../../../src/shared/infrastructure/JsUuidGenerator";
import { BadRequest } from "../../../../src/shared/infrastructure/requestErrors/BadRequest";
import { NotFound } from "../../../../src/shared/infrastructure/requestErrors/NotFound";
import { User } from "../../../../src/users/domain/User";
import { UsersRepository } from "../../../../src/users/domain/UsersRepository";
import * as TypeOrmUsersRepository from "../../../../src/users/infrastructure/TypeOrmUsers.repository";

const user: User = new User({
  id: JsUuidGenerator().generate(),
  email: "user@domain.com",
  firstName: "John",
  lastName: "Doe",
  password: "123456789",
  refreshToken: "refreshToken",
});

const usersRepository: UsersRepository = {
  findByEmail: jest
    .fn()
    .mockResolvedValue(user)
    .mockResolvedValueOnce(undefined),
  persist: jest.fn(),
  update: jest.fn(),
};

jest
  .spyOn(TypeOrmUsersRepository, "TypeOrmUsersRepository")
  .mockImplementation(() => usersRepository);

jest.spyOn(AuthAccessTokenEncoder, "AuthAccessTokenEncoder").mockReturnValue({
  decode: jest.fn().mockReturnValue({ id: "123", email: "user@example.com" }),
  encode: jest.fn(),
});

const route = `${mainRouterPath}${authLogoutPath}`;

describe(`GET ${route}`, () => {
  test("should return a BadRequest response", async () => {
    const response = await request(app).get(route);

    const badRequest = new BadRequest();

    expect(response.statusCode).toBe(badRequest.statusCode);
    expect(response.body).toStrictEqual({
      ...badRequest.json(),
      message: expect.any(String),
    });
  });

  test("should return a NotFound response", async () => {
    const response = await request(app)
      .get(route)
      .auth("token", { type: "bearer" });

    const notFound = new NotFound();

    expect(response.statusCode).toBe(notFound.statusCode);
    expect(response.body).toStrictEqual({
      ...notFound.json(),
      message: expect.any(String),
    });
  });

  test("should execute the request successfully", async () => {
    const response = await request(app)
      .get(route)
      .auth("token", { type: "bearer" });

    const authLogoutGetResponse = new AuthLogoutGetResponse();

    expect(response.statusCode).toBe(authLogoutGetResponse.statusCode);
    expect(response.body).toStrictEqual({
      ...authLogoutGetResponse.json(),
    });
  });
});
