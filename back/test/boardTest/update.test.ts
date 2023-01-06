import chai from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { boardFactory, boardIds, fakeBoards } from "../fixtures/board";
import { createUserData } from "../fixtures/user";
import { getToken } from "../helpers/globals";
import { createNewUser } from "../helpers/user";
chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };

const userId = randomUUID();
describe("BOARD SUITE GET ALL", function () {
  beforeAll(async () => {
    const { body, status, error } = await createNewUser({
      data: { ...createUserData },
    });
    const { token } = await getToken(credentials);
    const boards = [...fakeBoards(token.decoded.id)];
    await transaction(async (t) => {
      await t.table("boards").insert([...boards]);
    });
  });
  afterAll(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
    server.close();
  });
  it("Should get all boards", async () => {
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
      console.log(boardBody);
      requestT.close();
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error;
    }
  });
});
