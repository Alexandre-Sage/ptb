import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { suiteTeardown, suiteSetup, suite, test } from "mocha";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { fakeStoryIds } from "../fixtures/story";
import { initForTask, taskFactory, tasks, tasksIds } from "../fixtures/task";
import { getToken } from "../helpers/globals";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
const userId = randomUUID();
export default suite("TASK SUITE DELET", () => {
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
  test("Should delete a task", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const { body, status } = await request
        .delete(`/tasks/${tasksIds[1]}`)
        .set("Authorization", `Bearer ${token.token}`);
      expect(body).to.have.property("error").eql(false);
      expect(body).to.have.property("message").eql("Task deleted");
      expect(status).eql(200);
      const task = await transaction(async (tsx) => {
        return await tsx
          .table("tasks")
          .select("*")
          .where({ id: tasksIds[1] })
          .first();
      });
      expect(task).to.be.undefined;
    } catch (error) {
      throw error;
    }
  });
});
