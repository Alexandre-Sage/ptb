import { randomBytes, pbkdf2Sync } from "crypto";
import { userRepository } from "../../mariaDb/repositories/userRepository";
import { User } from "../../types/user/user.type";
import { CustomError } from "../errors/customError";

const { create, getById, getPasswordAndSalt } = userRepository();
const hashPassword = (password: string) => {
  const salt = randomBytes(25).toString("hex");
  return {
    salt,
    password: pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex"),
  };
};

const checkPassword = async ({ password, userName }: Partial<User>) => {
  const {
    salt,
    id,
    password: dbPassword,
  } = await getPasswordAndSalt(userName ?? "");
  const hashedPassword = pbkdf2Sync(
    password ?? "",
    salt,
    1000,
    64,
    "sha512"
  ).toString("hex");
  if (dbPassword !== hashedPassword)
    throw new CustomError(400, "Invalid password");
  return {
    id,
    userName,
  };
};
export { checkPassword, hashPassword };
