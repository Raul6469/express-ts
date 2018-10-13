import request from "supertest";
import app from "../src/app";

import { getAccessToken } from "./helper/auth-helper";

let token: string;

beforeAll(async () => {
  token = await getAccessToken();
});

describe("User manager", () => {
  it("should not create user with existing username", (done) => {
    request(app).post("/user")
      .set("Authorization", "Bearer " + token)
      .send({
        username: "raul",
        password: "pwd",
      })
      .expect(400)
      .then((response: any) => {
        expect(response.body.message).toBe("Username already taken");
        done();
      });
  });
});
