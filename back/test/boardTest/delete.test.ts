import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { boardFactory, boardIds, fakeBoards } from "../fixtures/board";
import { createUserData } from "../fixtures/user";
import { getToken } from "../helpers/globals";
import { createNewUser } from "../helpers/user";
import { suite, test, suiteTeardown, suiteSetup } from "mocha";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };

const userId = randomUUID();
export default suite("DELETE  BOARD", function () {
  suiteSetup(async () => {
    const { body, status, error } = await createNewUser({
      data: { ...createUserData },
    });
    const { token } = await getToken(credentials);
    const boards = [...fakeBoards(token.decoded.id)];
    await transaction(async (t) => {
      await t.table("boards").insert([...boards]);
    });
  });
  suiteTeardown(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
    server.close();
  });
  test("Should delete a   board", async () => {
    const { token } = await getToken(credentials);
    try {
      const request = chai.request(server);
      const boardId = boardIds[2];
      const boardToUpdate = boardFactory({
        id: boardId,
        boardName: "updated board",
      });
      const { body, status } = await request
        .delete(`/boards/${boardId}`)
        .set("Authorization", `Bearer ${token.token}`);
      expect(body).to.have.property("message").eql("Board deleted");
      expect(status).eql(200);
      const requestT = chai.request(server);
      const { body: boardBody } = await requestT
        .get(`/boards/${boardId}`)
        .set("Authorization", `Bearer ${token.token}`);
      requestT.close();
      expect(boardBody.board).to.be.undefined;
    } catch (error) {
      throw error;
    }
  });
});
