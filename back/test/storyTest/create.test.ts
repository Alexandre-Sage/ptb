import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { boardIds } from "../fixtures/board";
import { initForStory } from "../fixtures/story";
import { getToken } from "../helpers/globals";
import { describe, it, after, before } from "mocha";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
const userId = randomUUID();
export default describe("STORY SUITE", () => {
  before(async () => {
    await initForStory();
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
        .post("/stories")
        .send({
          story: {
            storyName: "test story",
            description: "description test",
            boardId: boardIds[2],
          },
        })
        .set("Authorization", `Bearer ${token.token}`);
      expect(body).to.have.property("error").eql(false);
      expect(status).eql(201);
      const story = await transaction(async (tsx) => {
        return await tsx
          .table("stories")
          .select("*")
          .where({ board_id: boardIds[2] })
          .first();
      });
      expect(story).to.have.property("story_name").to.be.eql("test story");
      expect(story)
        .to.have.property("description")
        .to.be.eql("description test");
      expect(story).to.have.property("board_id").eql(boardIds[2]);
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error;
    }
  });
  //it("Should log and get user profil info", async () => {
  //  const request = chai.request(server);
  //  try {
  //    const { token } = await getToken(credentials, request);
  //    const decoded = jwt.verify(
  //      token,
  //      `${process.env.TOKEN_SECRET}`
  //    ) as jwtPayload;
  //    const { body, status } = await chai,{expect}
  //      .request(server)
  //      .get(`/users/${decoded.id}`)
  //      .set("Authorization", `Bearer ${token}`);
  //    expect(body).toHaveProperty("user");
  //    expect(body).to.have.property("error").to.eql(false);
  //    expect(status).toEqual(200);
  //  } catch (error) {
  //    console.log({ "VI TEST ERROR": error });
  //    throw error;
  //  }
  //});
  server.close();
});
