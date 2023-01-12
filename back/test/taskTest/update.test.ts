import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { suiteTeardown, suiteSetup, suite, test } from "mocha";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { TaskMapper } from "../../src/mariaDb/mappers/taskMapper";
import { Task, TaskRow } from "../../src/types/task/task.type";
import { fakeStoryIds } from "../fixtures/story";
import { initForTask, taskFactory, tasks, tasksIds } from "../fixtures/task";
import { getToken } from "../helpers/globals";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
const userId = randomUUID();
const { objectToDbRow, dbRowToObject } = TaskMapper();
let fakeTask: Task;
export default suite("TASK SUITE UPDATE", () => {
  suiteSetup(async () => {
    await initForTask();
    const { token } = await getToken(credentials);
    const fakeTasks = tasks(token.decoded.id);
    fakeTask = dbRowToObject(fakeTasks[1] as TaskRow);
    await transaction(async (t) => {
      await t.table("tasks").insert([...fakeTasks]);
    });
  });
  suiteTeardown(async () => {
    await connection.transaction(
      async (tsx) => await tsx.raw("DELETE FROM users")
    );
  });
  test("Should update a task", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    const { objectToDbRow } = TaskMapper();
    try {
      const { body, status } = await request
        .put(`/tasks/${tasksIds[1]}`)
        .send({
          task: {
            ...fakeTask,
            taskName: "updated name",
          },
        })
        .set("Authorization", `Bearer ${token.token}`);
      expect(body).to.have.property("error").eql(false);
      expect(body).to.have.property("message").eql("Task updated");
      expect(status).eql(201);
      const task = await transaction(async (tsx) => {
        return await tsx
          .table("tasks")
          .select("*")
          .where({ id: tasksIds[1] })
          .first();
      });
      expect(task).to.have.property("task_name").eql("updated name");
      expect(task).to.have.property("id").eql(tasksIds[1]);
    } catch (error) {
      throw error;
    }
  });
});
