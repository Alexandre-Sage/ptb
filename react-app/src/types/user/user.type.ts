export type UserId = string;

export interface User {
  id: UserId;
  userName: string;
  email: string;
  creationDate: Date;
}
