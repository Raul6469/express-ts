import request from "supertest";
import app from "../src/app";

import { getAccessToken } from "./helper/auth-helper";

let token: string;

beforeAll(async () => {
  token = await getAccessToken();
});

describe("Authentication", () => {
  it("should return 401 if not authenticated", () => {
    return request(app).get("/")
      .expect(401);
  });

  it("should return 200 if valid credentials are provided", (done) => {
    request(app).post("/auth")
      .send({
        username: "raul",
        password: "pwd",
      })
      .expect(200)
      .then((response: any) => {
        expect(response.body.token).toBeDefined();
        done();
      });
  });

  it("should return 400 if missing parameters", (done) => {
    request(app).post("/auth")
      .send({
        username: "raul",
      })
      .expect(400)
      .then((response: any) => {
        expect(response.body[0].param).toBe("password");
        done();
      });
  });

  it("should return 401 if bad credentials are provided", (done) => {
    request(app).post("/auth")
      .send({
        username: "raul",
        password: "notmypwd",
      })
      .expect(401)
      .then((response: any) => {
        expect(response.body.token).toBeUndefined();
        done();
      });
  });

  it("should correctly identify authenticated user", (done) => {
    request(app).get("/")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .then((response: any) => {
        expect(response.body.message).toBe("Hello raul!");
        done();
      });
  });
});
