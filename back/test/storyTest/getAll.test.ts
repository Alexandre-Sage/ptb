import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { boardIds } from "../fixtures/board";
import { fakeStories, initForStory } from "../fixtures/story";
import { getToken } from "../helpers/globals";
import { describe, it, after, before } from "mocha";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
const userId = randomUUID();
export default describe("STORY SUITE GET ALL", function () {
  before(async () => {
    const { token, decoded } = await initForStory();
    await transaction(async (transaction) =>
      transaction
        .table("stories")
        .insert([...fakeStories(boardIds[1], decoded.id)])
    );
  });
  after(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
  });
  it("Should get all story", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const { body, status } = await request
        .get("/stories")
        .set("Authorization", `Bearer ${token.token}`);

      expect(status).eql(200);
      expect(body).to.have.property("stories");
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error;
    }
  });
});
