import { describe, expect, it, afterAll, beforeAll } from "vitest";
import chaiHttp from "chai-http";
import chai from "chai";
import { server } from "../../server";
import { User } from "../../src/types/user/user.type";
import { randomBytes, randomUUID } from "crypto";
import test from "node:test";
import { connection, transaction } from "../../src/mariaDb/database";
import { createUserData, userFactory } from "../fixtures/user";
import { createNewUser, UserMapper } from "../helpers/user";
import { decodeToken, jwtPayload } from "../../src/modules/auth/jsonWebToken";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
const getToken = async (credentials: any, request: ChaiHttp.Agent) => {
  // const request = chai.request(server);
  const { body, status, error } = await request
    .post(`/users/connection`)
    .send({ credentials });
  return {
    body,
    status,
    error,
    token: body.token,
  };
};

const userId = randomUUID();
describe("BOARD SUITE", () => {
  beforeAll(async () => {
    const { body, status, error } = await createNewUser({
      data: { ...createUserData },
    });
  });
  afterAll(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
    server.close();
  });
  it("Should log user", async () => {
    const { token } = await getToken(credentials, chai.request(server));
    const request = chai.request(server);
    try {
      const { body, status } = await request
        .post("/boards")
        .send({
          board: {
            boardName: "test board",
            description: "description test ",
          },
        })
        .set("Authorization", `Bearer ${token}`);
      expect(body).to.have.property("error").eql(false);
      expect(status).eql(201);
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error;
    }
    request.close();
  });
  //it("Should log and get user profil info", async () => {
  //  const request = chai.request(server);
  //  try {
  //    const { token } = await getToken(credentials, request);
  //    const decoded = jwt.verify(
  //      token,
  //      `${process.env.TOKEN_SECRET}`
  //    ) as jwtPayload;
  //    const { body, status } = await chai
  //      .request(server)
  //      .get(`/users/${decoded.id}`)
  //      .set("Authorization", `Bearer ${token}`);
  //    expect(body).toHaveProperty("user");
  //    expect(body).to.have.property("error").to.eql(false);
  //    expect(status).toEqual(200);
  //  } catch (error) {
  //    console.log({ "VI TEST ERROR": error });
  //    throw error;
  //  }
  //});
});
