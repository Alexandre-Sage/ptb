import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { suiteTeardown, suiteSetup, suite, test } from "mocha";
import { server } from "../../server";
import { connection, transaction } from "../../src/mariaDb/database";
import { initForTask, tasks } from "../fixtures/task";
import { getToken } from "../helpers/globals";

chai.use(chaiHttp);
const credentials = { userName: "test", password: "test" };
const userId = randomUUID();
export default suite("TASK SUITE GET ALL", () => {
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
  test("Should get all task", async () => {
    const { token } = await getToken(credentials);
    const request = chai.request(server);
    try {
      const { body, status } = await request
        .get("/tasks")
        .set("Authorization", `Bearer ${token.token}`);
      expect(body).to.have.property("error").eql(false);
      expect(body).to.have.property("tasks");
      expect(status).eql(200);
    } catch (error) {
      throw error;
    }
  });
});
