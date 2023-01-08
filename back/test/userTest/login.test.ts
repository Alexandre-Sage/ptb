import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { server } from "../../server";
import { connection } from "../../src/mariaDb/database";
import { jwtPayload } from "../../src/modules/auth/jsonWebToken";
import { createUserData } from "../fixtures/user";
import { createNewUser } from "../helpers/user";
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
export default describe("USER SUITE", () => {
  before(async () => {
    const request = chai.request(server);

    const { body, status, error } = await createNewUser({
      data: { ...createUserData },
    });
    request.close();
  });
  after(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
    server.close();
  });
  it("Should log user", async () => {
    const request = chai.request(server);
    try {
      const { body, token } = await getToken(credentials, request);
      expect(body).to.have.property("token");
      expect(body).to.have.property("message").eql("Welcome Back");
      expect(body).to.have.property("error").eql(false);
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error;
    }
  });
  it("Should log and get user profil info", async () => {
    const request = chai.request(server);
    try {
      const { token } = await getToken(credentials, request);
      const decoded = jwt.verify(
        token,
        `${process.env.TOKEN_SECRET}`
      ) as jwtPayload;
      const { body, status } = await chai
        .request(server)
        .get(`/users/${decoded.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(body).to.have.property("user");
      expect(body).to.have.property("error").to.eql(false);
      expect(status).to.be.eql(200);
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error;
    }
    request.close();
  });
  server.close();
});
