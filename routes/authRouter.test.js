import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config.js";
import app from "../app.js";
import { cleanUsers, findUser } from "../services/authServices.js";

const { DB_HOST, PORT = 3000 } = process.env; //TEST_DB_HOST

describe("test api/users/login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST); //TEST_DB_HOST
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
      email: "kuklamasha@gmail.com",
      password: "dlfklfkd9898ksdngjvnf",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body.token).toBeDefined();
    expect(body.user.subscription).toBeDefined();
    expect(body.user.email).toBe(loginData.email);
  });
});
