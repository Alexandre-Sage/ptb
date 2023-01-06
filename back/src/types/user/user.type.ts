import { pbkdf2Sync, randomBytes } from "crypto";
import { userRepository } from "../../mariaDb/repositories/userRepository";
import { setToken } from "../../modules/auth/jsonWebToken";
import { CustomError } from "../../modules/errors/customError";
import { composeHigherOrderMutliTypeAsync } from "../../modules/higherOrder/compose";

type UserId = string;
interface UserRow {
  id: UserId;
  user_name: string;
  email: string;
  password: string;
  creation_date: Date;
  last_connection: Date;
  edition_date: Date;
  salt: string;
}
interface User {
  id: UserId;
  userName: string;
  email: string;
  password: string;
  salt: string;
  creationDate: Date;
  lastConnection: Date;
  editionDate: Date;
}

//class User implements UserInterface {
//  constructor(
//    public readonly id: UserId,
//    public readonly userName: string,
//    public readonly email: string,
//    public readonly password: string,
//    public readonly salt?: string,
//    public readonly creationDate?: Date,
//    public readonly lastConnection?: Date,
//    public readonly editionDate?: Date
//  ) {
//    this.id = id;
//    this.userName = userName;
//    this.email = email;
//    this.salt = this.hashPassword(salt).salt;
//    this.password = this.hashPassword(password).password;
//    this.creationDate = creationDate;
//    this.lastConnection = lastConnection;
//    this.editionDate = editionDate;
//  }
//  hashPassword = (password: string) => {
//    const salt = randomBytes(25).toString("hex");
//    return {
//      salt,
//      password: pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex"),
//    };
//  };
//}

export { UserId, User, UserRow };
