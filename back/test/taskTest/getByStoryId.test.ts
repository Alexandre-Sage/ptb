import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { suiteTeardown, suiteSetup, suite, test } from "mocha";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { Task } from "../../src/types/task/task.type";
import { fakeStoryIds } from "../fixtures/story";
import { initForTask, tasks, tasksIds } from "../fixtures/task";
import { getToken } from "../helpers/globals";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
const userId = randomUUID();
export default suite("TASK SUITE GET ONE", () => {
  suiteSetup(async () => {
    await initForTask();
    const { token } = await getToken(credentials);
    await transaction(async (t) => {
      await t.table("tasks").insert([...tasks(token.decoded.id)]);
    });
  });
  suiteTeardown(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
  });
  test("Should get one task", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const { body, status } = await request
        .get(`/tasks/story/${fakeStoryIds[1]}`)
        .set("Authorization", `Bearer ${token.token}`);
      expect(body).to.have.property("error").eql(false);
      expect(body).to.have.property("tasks");
      body.tasks.forEach((task: Task) =>
        expect(task).to.have.property("storyId").eql(fakeStoryIds[1])
      );
      expect(status).eql(200);
    } catch (error) {
      throw error;
    }
  });
});
