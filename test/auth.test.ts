import request from "supertest";
import app from "../src/app";

const chai = require("chai");
const expect = chai.expect;

describe("Authentication", () => {
  it("should return 401 if not authenticated", () => {
    return request(app).get("/")
      .expect(401);
  });

  it("should return 200 if valid credentials are provided", (done) => {
    request(app).post("/auth")
      .send({
        username: 'raul',
        password: 'pwd'
      })
      .expect(200)
      .then((response: any) => {
        expect(response.body.token).not.to.be.undefined;
        done();
      });
  });

  it("should return 401 if bad credentials are provided", (done) => {
    request(app).post("/auth")
      .send({
        username: 'raul',
        password: 'notmypwd'
      })
      .expect(401)
      .then((response: any) => {
        expect(response.body.token).to.be.undefined;
        done();
      });
  });

  it("should correctly identify authenticated user", (done) => {
    request(app).post("/auth")
      .send({
        username: 'raul',
        password: 'pwd'
      })
      .expect(200)
      .then((response: any) => {
        const token = response.body.token;
        request(app).get('/')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
          .then((response: any) => {
            console.log(response)
            expect(response.body.message).to.equal('Hello raul!')
            done();
          })
      });
  });
});