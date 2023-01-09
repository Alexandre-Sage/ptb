// import chai from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { describe, it, after, before } from "mocha";

import chai, { expect } from "chai";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { boardIds } from "../fixtures/board";
import { fakeStories, initForStory, fakeStoryIds } from "../fixtures/story";
import { getToken } from "../helpers/globals";
import { cpSync } from "fs";
import { StoryMapper } from "../../src/mariaDb/mappers/storyMapper";
import { StoryRow } from "../../src/types/story/story.type";
chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
let story: StoryRow;
export default describe("STORY SUITE UDPADTE", function () {
  // const { token } = await getToken(credentials);
  before(async () => {
    const { token, decoded } = await initForStory();
    const stories = fakeStories(boardIds[1], decoded.id);
    story = stories[1] as StoryRow;
    await transaction(async (transaction) =>
      transaction.table("stories").insert([...stories])
    );
  });
  after(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
  });
  it("Should update story", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const { dbRowToObject, objectToDbRow } = StoryMapper();
      const { body, status } = await request
        .put(`/stories/${fakeStoryIds[1]}`)
        .send({
          story: {
            ...dbRowToObject(story),
            storyName: "updated",
          },
        })
        .set("Authorization", `Bearer ${token.token}`);
      expect(status).eql(200);
      expect(body).to.have.property("message").eql("Story updated");
      const storyCheck = await transaction(async (tsx) => {
        return await tsx
          .table("stories")
          .select("*")
          .where({ id: "62904ff0-ded2-49ec-874e-538b9425ad50" })
          .first();
      });
      expect(storyCheck).to.have.property("story_name").to.be.eql("updated");
      expect(storyCheck);
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error;
    }
    request.close();
    server.close();
  });
});
server.close();
