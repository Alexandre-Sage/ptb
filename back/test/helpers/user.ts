// import { server } from "../../server";
import chaiHttp from "chai-http";
import chai from "chai";
import { UserMapper } from "../../src/mariaDb/mappers/user/userMapper";

import { server } from "../../server";
chai.use(chaiHttp);
const createNewUser = async (data: any) => {
  const request = chai.request(server);
  const req = await request.post("/users").send({ ...data });
  server.close();
  return req;
};
export { UserMapper, createNewUser };
