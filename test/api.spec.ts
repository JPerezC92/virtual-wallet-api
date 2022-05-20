import request from "supertest";

import app from "../src/app";
import { mainRouterPath } from "../src/controllers/api";

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app).get(mainRouterPath).expect(200);
  });
});
