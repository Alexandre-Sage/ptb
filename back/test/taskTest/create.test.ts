import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { suite, suiteSetup, suiteTeardown, test } from "mocha";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { fakeStoryIds } from "../fixtures/story";
import { initForTask } from "../fixtures/task";
import { getToken } from "../helpers/globals";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
const userId = randomUUID();
export default suite("TASK SUITE CREATE", () => {
  suiteSetup(async () => {
    await initForTask();
  });
  suiteTeardown(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
  });
  test("Should create task", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const { body, status } = await request
        .post("/tasks")
        .send({
          task: {
            taskName: "Test task",
            description: "description test",
            storyId: fakeStoryIds[1],
          },
        })
        .set("Authorization", `Bearer ${token.token}`);
      expect(body).to.have.property("error").eql(false);
      expect(body).to.have.property("message").eql("Task added");
      expect(status).eql(201);
      const task = await transaction(async (tsx) => {
        return await tsx
          .table("tasks")
          .select("*")
          .where({ story_id: fakeStoryIds[1] })
          .first();
      });
      expect(task).to.have.property("task_name").to.be.eql("Test task");
      expect(task)
        .to.have.property("description")
        .to.be.eql("description test");
      expect(task).to.have.property("story_id").eql(fakeStoryIds[1]);
    } catch (error) {
      throw error;
    }
  });
});
