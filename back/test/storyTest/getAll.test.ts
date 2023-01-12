import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { boardIds } from "../fixtures/board";
import { fakeStories, initForStory } from "../fixtures/story";
import { getToken } from "../helpers/globals";
import { suite, test, suiteTeardown, suiteSetup } from "mocha";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
const userId = randomUUID();
export default suite("STORY SUITE GET ALL", function () {
  suiteSetup(async () => {
    const { token, decoded } = await initForStory();
    await transaction(async (transaction) =>
      transaction
        .table("stories")
        .insert([...fakeStories(boardIds[1], decoded.id)])
    );
  });
  suiteTeardown(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
  });
  test("Should get all story", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const { body, status } = await request
        .get("/stories")
        .set("Authorization", `Bearer ${token.token}`);

      expect(status).eql(200);
      expect(body).to.have.property("stories");
    } catch (error) {
      throw error;
    }
  });
});
