import { describe, expect, it, afterAll } from "vitest"
import chaiHttp from "chai-http";
import chai from "chai";
import { server } from "../../server";
import { User } from "../../src/types/user/user.type";
import { randomBytes, randomUUID } from "crypto";
import test from "node:test";
import { connection } from "../../src/mariaDb/database";
const agent = chai.use(chaiHttp)
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZDIxN2U5LTQ1NjQtNGYyNC1hNTMzLTkzNmRiYTU4ZmRjOCIsInVzZXJOYW1lIjoidGVzdCIsImlhdCI6MTY3MjQ4NDU2MywiZXhwIjoyNjcyNDg0NTYzLCJqdGkiOiI5ZWU3ODM1NC0xYTI0LTQ0ZjItYTE4MC05NzZmN2FjNTUwYzIifQ.WoOF5Mzs47SFvcYKENKREcJhdD28hzbFB1wlI4qywk0`
const credentials = { userName: "test", password: "test" }
const getToken = async (credentials: any) => {
  const request = chai.request(server)
  const { body, status, error } = await request.post(`/users/connection`).send({ credentials })
  return {
    body, status, error, token: body.token
  }
}

const userFactory = ({ id, creationDate, editionDate, email, lastConnection, password, salt, userName }: Partial<User>): User => {
  return {
    id: id ?? randomUUID(),
    creationDate: creationDate ?? new Date(),
    editionDate: editionDate ?? new Date(),
    email: email ?? "test@test.com",
    lastConnection: lastConnection ?? new Date(),
    password: password ?? "test",
    salt: salt ?? randomBytes(75).toString("hex"),
    userName: userName ?? "test"
  }
}
const userId = randomUUID()
describe("USER SUITE", () => {
  afterAll(async () => {
    await connection.transaction(async tsx => await tsx.raw("DELETE FROM users"))
  })
  it("Should create new user", async () => {
    const request = chai.request(server)
    try {
      const { body, status, error } = await request.post("/users").send({
        data: {
          password: "test",
          userName: "test",
          email: "test@test.com"
        }
      })
      expect(body).to.have.property("message").eql("User added")
      expect(status).to.be.eql(200)
    } catch (error) {
      console.log({ 'Vi test error': error });
      throw error
    };
  });
  it("Should log user", async () => {
    const request = chai.request(server)
    try {
      const { body, token } = await getToken(credentials)
      expect(body).to.have.property("token")
      expect(body).to.have.property("message").eql("User logged")
      expect(body).to.have.property("error").eql(false)
    } catch (error) {
      console.log({ "VI TEST ERROR": error });
      throw error

    }
  })
});