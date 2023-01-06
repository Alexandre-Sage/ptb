import { jwtPayload } from "../../src/modules/auth/jsonWebToken";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { server } from "../../server";
import chaiHttp from "chai-http";
import chai from "chai";

chai.use(chaiHttp);

const credentials = { userName: "test", password: "test" };
const getToken = async (credentials: any) => {
  const request = chai.request(server);
  const { body, status, error } = await request
    .post(`/users/connection`)
    .send({ credentials });
  request.close();
  return {
    body,
    status,
    error,
    token: {
      token: body.token,
      decoded: jwt.verify(
        body.token,
        `${process.env.TOKEN_SECRET}`
      ) as jwtPayload,
    },
  };
};
export { credentials, getToken };
