import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { connection, transaction } from "../../src/mariaDb/database";
import { boardFactory, boardIds, fakeBoards } from "../fixtures/board";
import { createUserData } from "../fixtures/user";
import { getToken } from "../helpers/globals";
import { server } from "../../server";
import { createNewUser } from "../helpers/user";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };

const userId = randomUUID();
export default describe("BOARD SUITE UPDATE", function () {
  before(async () => {
    const { body, status, error } = await createNewUser({
      data: { ...createUserData },
    });
    const { token } = await getToken(credentials);
    const boards = [...fakeBoards(token.decoded.id)];
    await transaction(async (t) => {
      await t.table("boards").insert([...boards]);
    });
  });
  after(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
  });
  it("Should update a board", async () => {
    const { token } = await getToken(credentials);
    try {
      const request = chai.request(server);
      const boardId = boardIds[2];
      const boardToUpdate = boardFactory({
        id: boardId,
        boardName: "updated board",
      });
      const { body, status } = await request
        .put(`/boards/${boardId}`)
        .send({ board: { ...boardToUpdate, userId: token.decoded.id } })
        .set("Authorization", `Bearer ${token.token}`);

      request.close();
      expect(body).to.have.property("message").eql("Board updated");
      expect(status).eql(201);
      const requestT = chai.request(server);
      const { body: boardBody } = await requestT
        .get(`/boards/${boardId}`)
        .set("Authorization", `Bearer ${token.token}`);
      expect(boardBody.board)
        .to.have.property("boardName")
        .eql("updated board");
      requestT.close();
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error;
    }
  });
});
