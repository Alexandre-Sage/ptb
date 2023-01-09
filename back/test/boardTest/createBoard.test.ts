import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { server } from "../../server";
import { connection } from "../../src/mariaDb/database";
import { createUserData } from "../fixtures/user";
import { createNewUser } from "../helpers/user";
import { describe, it, after, before } from "mocha";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
const getToken = async (credentials: any, request: ChaiHttp.Agent) => {
  // const request = chai.request(server);
  const { body, status, error } = await request
    .post(`/users/connection`)
    .send({ credentials });
  request.close();
  return {
    body,
    status,
    error,
    token: body.token,
  };
};

const userId = randomUUID();
export default describe("CREATE BOARD SUITE", () => {
  before(async () => {
    const { body, status, error } = await createNewUser({
      data: { ...createUserData },
    });
  });
  after(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
    server.close();
  });
  it("create new board", async () => {
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
  server.close();
});
