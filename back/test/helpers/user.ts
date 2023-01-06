import { server } from "../../server";
import chaiHttp from "chai-http";
import chai from "chai";
import { UserMapper } from "../../src/mariaDb/mappers/user/userMapper";
chai.use(chaiHttp);
const createNewUser = async (data: any) => {
  const request = chai.request(server);
  return await request.post("/users").send({ ...data });
};
export { UserMapper, createNewUser };
