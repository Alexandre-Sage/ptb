// import chai from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { suite, test, suiteTeardown, suiteSetup } from "mocha";

import chai, { expect } from "chai";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { boardIds } from "../fixtures/board";
import { fakeStories, initForStory, fakeStoryIds } from "../fixtures/story";
import { getToken } from "../helpers/globals";
chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
export default suite("STORY SUITE GET BY ID", function () {
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
  test("Should GET ONE story", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const { body, status } = await request
        .delete(`/stories/${fakeStoryIds[1]}`)
        .set("Authorization", `Bearer ${token.token}`);
      expect(status).eql(200);
      expect(body).to.have.property("message").eql("Story deleted");
      const storyCheck = await transaction(async (tsx) => {
        return await tsx
          .table("stories")
          .select("*")
          .where({
            id: fakeStoryIds[1],
          })
          .first();
      });
      expect(storyCheck).to.be.undefined;
    } catch (error) {
      throw error;
    }
    request.close();
    server.close();
  });
});
server.close();
