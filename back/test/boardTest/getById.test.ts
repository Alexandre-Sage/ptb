import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { boardIds, fakeBoards } from "../fixtures/board";
import { createUserData } from "../fixtures/user";
import { getToken } from "../helpers/globals";
import { createNewUser } from "../helpers/user";
import { suite, test, suiteTeardown, suiteSetup } from "mocha";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };

const userId = randomUUID();
export default suite("BOARD SUITE GET ONE", () => {
  //server.close();
  suiteSetup(async () => {
    const { body, status, error } = await createNewUser({
      data: { ...createUserData },
    });
    const { token } = await getToken(credentials);
    await transaction(async (t) => {
      await t.table("boards").insert([...fakeBoards(token.decoded.id)]);
    });
  });
  suiteTeardown(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
  });
  test("Should get one boards", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const boardId = boardIds[2];
      const { body, status } = await request
        .get(`/boards/${boardId}`)
        .set("Authorization", `Bearer ${token.token}`);
      request.close();
      expect(body).to.have.property("board");
      expect(status).eql(200);
    } catch (error) {
      throw error;
    }
    request.close();
  });
  //server.close();
});
