import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { server } from "../../server";
import { transaction } from "../../src/mariaDb/database";
import { createUserData } from "../fixtures/user";
import { createNewUser } from "../helpers/user";
import { describe, it, after, before } from "mocha";

chai.use(chaiHttp);

export default describe("USER SUITE", () => {
  after(async () => {
    await transaction(async (tsx) => await tsx.raw("DELETE FROM users"));
    server.close();
  });
  it("Should create new user", async () => {
    const request = chai.request(server);
    try {
      const { body, status, error } = await request.post("/users").send({
        data: {
          password: "test",
          passwordConfirmation: "test",
          userName: "test",
          email: "test@test.com",
        },
      });
      expect(body).to.have.property("message").eql("User added");
      expect(status).to.be.eql(200);
    } catch (error) {
      console.log({ "Vi test error": error });
      throw error;
    }
  });
  it("Should throw an error for empty userName", async () => {
    const request = chai.request(server);

    try {
      const { body, status, error } = await createNewUser({
        data: {
          ...createUserData,
          userName: "",
        },
      });
      expect(body)
        .to.have.property("message")
        .eql("The field userName is empty");
      expect(status).to.be.eql(500);
    } catch (error) {
      console.log({ "Vi test error": error });
      throw error;
    }
    // request.close();
  });
  it("Should throw an error for missing user name", async () => {
    const { userName, ...data } = createUserData;
    const request = chai.request(server);
    try {
      const { body, status, error } = await createNewUser({
        data: { ...data },
      });
      expect(body)
        .to.have.property("message")
        .eql("The field userName is empty");
      expect(status).to.be.eql(500);
    } catch (error) {
      console.log({ "Vi test error": error });
      throw error;
    }
    // request.close();
  });
  // server.close();
});
