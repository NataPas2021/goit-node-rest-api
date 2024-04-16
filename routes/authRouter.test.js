import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";
import { cleanUsers, findUser } from "../services/authServices.js";

const { TEST_DB_HOST, PORT } = process.env;

describe("test api/users/login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await cleanUsers();
  });

  test("test api/users/login with correct data", async () => {
    const loginData = {
      email: "gravity098@gmail.com",
      password: "1234569887",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    const user = await findUser({ email: loginData.email });
    //expect(user.email).toBe(loginData.email);
    expect(statusCode).toBe(200);
    expect(body.token).toBe(token);
    expect(body.user.subscription).toBe(user.subscription);
    expect(body.user.email).toBe(loginData.email);
  });
});
