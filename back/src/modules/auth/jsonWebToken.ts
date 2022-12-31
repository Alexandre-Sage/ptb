import { randomUUID } from "crypto"
import jsonWebToken from "jsonwebtoken"
import { User } from "../../types/user/user.type"




export const setToken = (userData: Pick<User, "id" | "userName">) => {
  return jsonWebToken.sign({ ...userData }, `${process.env.TOKEN_SECRET}`, { expiresIn: 1000 * 1000 * 1000, jwtid: randomUUID() })
}