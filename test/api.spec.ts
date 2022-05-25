import request from "supertest";

import app from "../src/app";
import { mainRouterPath } from "../src/routes/loadApiEndpoints";

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app).get(mainRouterPath).expect(200);
  });
});
