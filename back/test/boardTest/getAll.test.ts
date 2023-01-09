import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { fakeBoards } from "../fixtures/board";
import { createUserData } from "../fixtures/user";
import { getToken } from "../helpers/globals";
import { createNewUser } from "../helpers/user";
import { describe, it, after, before } from "mocha";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };

const userId = randomUUID();
export default describe("BOARD SUITE GET ALL", () => {
  before(async () => {
    const { body, status, error } = await createNewUser({
      data: { ...createUserData },
    });
    const { token } = await getToken(credentials);
    await transaction(async (t) => {
      await t.table("boards").insert([...fakeBoards(token.decoded.id)]);
    });
  });
  after(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
    server.close();
  });
  it("Should get all boards", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const { body, status } = await request
        .get("/boards")
        .set("Authorization", `Bearer ${token.token}`);
      expect(body).to.have.property("boards");
      expect(status).eql(200);
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error;
    }
    request.close();
  });
  server.close();
});
