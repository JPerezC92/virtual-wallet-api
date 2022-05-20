import request from "supertest";

import app from "../../../../src/app";
import { mainRouterPath } from "../../../../src/controllers/api";
import { MovementsGetResponseDTO } from "../../../../src/movements/infrastructure/dto/MovementsGetResponse.dto";
import * as TypeOrmMovementsRepository from "../../../../src/movements/infrastructure/movements.repository";
import { movementsRouterPath } from "../../../../src/movements/infrastructure/movements.routes";
import { MockMovementsRepository } from "../../fixtures/MockMovementsRepository";
import { movementMockList } from "../../fixtures/movementMockList";

jest
  .spyOn(TypeOrmMovementsRepository, "TypeOrmMovementsRepository")
  .mockImplementation(MockMovementsRepository);

describe("test on movements", () => {
  test("should return all movements", async () => {
    const response = await request(app).get(
      `${mainRouterPath}${movementsRouterPath}`
    );
    const body = response.body as MovementsGetResponseDTO;

    const movementsGetResponseDTO = new MovementsGetResponseDTO(
      movementMockList
    );

    expect(response.status).toBe(movementsGetResponseDTO.statusCode);
    expect(body.data.length).toBe(movementsGetResponseDTO.data.length);
    expect(body).toStrictEqual<MovementsGetResponseDTO>({
      statusCode: movementsGetResponseDTO.statusCode,
      status: movementsGetResponseDTO.status,
      data: movementMockList.map((m) => ({ ...m, date: expect.any(String) })),
    });
  });
});
