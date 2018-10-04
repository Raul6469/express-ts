import request from "supertest";
import app from "../src/app";

import { getAccessToken } from './helper/auth-helper';

const chai = require("chai");
const expect = chai.expect;

let token: string;

beforeAll(async () => {
  token = await getAccessToken();
})

describe("Messages", () => {
  it('should create a message', (done) => {
    request(app).post('/message')
      .set('Authorization', 'Bearer ' + token)
      .send({
        message: 'Hello'
      })
      .expect(201)
      .then((response: any) => {
        request(app).get('/message')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('array');
            expect(response.body[0]).to.have.deep.property('message', 'Hello')
            done();
          })
      })
  })
});