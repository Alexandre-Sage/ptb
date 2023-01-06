import { randomUUID } from "crypto";
import { Repository } from "../mariaDb/repositories/repository";
import { UserCustomMethods } from "../mariaDb/repositories/userRepository";
import { setToken } from "../modules/auth/jsonWebToken";
import { checkPassword, hashPassword } from "../modules/auth/passwords";
import {
  composeHigherOrderAsync,
  composeHigherOrderMutliTypeAsync,
} from "../modules/higherOrder/compose";
import { joiValidationPartialApplication } from "../modules/validation/joiHigherOrder";
import { User, UserId, UserRow } from "../types/user/user.type";
import { userJoiValidationSchema } from "../validationSchema/user";
export class UserService {
  constructor(
    private readonly repository: Repository<User, UserRow, UserCustomMethods>
  ) {
    this.repository = repository;
  }
  createUser = async ({ email, password, userName }: User) => {
    const now = new Date();
    const id = randomUUID();
    const { salt, password: hashedPassword } = hashPassword(password);
    const user = {
      id,
      userName,
      email,
      salt,
      password: hashedPassword,
      creationDate: now,
      editionDate: now,
      lastConnection: now,
    };
    return composeHigherOrderAsync({
      firstToExecute: joiValidationPartialApplication(userJoiValidationSchema),
      secondToExecute: this.repository.create,
    })(user);
  };
  authentification = async ({
    password,
    userName,
  }: Pick<User, "password" | "userName">) => {
    return composeHigherOrderMutliTypeAsync({
      firstToExecute: checkPassword,
      secondToExecute: setToken,
    })({ userName, password });
  };
  getById = async (id: UserId) => {
    return this.repository.getById(id);
  };
}
