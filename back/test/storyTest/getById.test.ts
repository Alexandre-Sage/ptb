// import chai from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import chai, { expect } from "chai";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { boardIds } from "../fixtures/board";
import { fakeStories, initForStory, fakeStoryIds } from "../fixtures/story";
import { getToken } from "../helpers/globals";
chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
export default describe("STORY SUITE", function () {
  before(async () => {
    const { token, decoded } = await initForStory();
    await transaction(async (transaction) =>
      transaction
        .table("stories")
        .insert([...fakeStories(boardIds[1], decoded.id)])
    );
    // const t = await transaction(async (transaction) =>
    // transaction.table("stories").select("*")
    // );
    // console.log({ debug: t });
  });
  after(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
  });
  it("Should create story", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const { body, status } = await request
        .get(`/stories/${fakeStoryIds[1]}`)
        .set("Authorization", `Bearer ${token.token}`);
      expect(status).eql(200);
      expect(body).to.have.property("story");
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error;
    }
    request.close();
    server.close();
  });
});
server.close();
