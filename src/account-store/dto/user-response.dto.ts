import { User } from '../interface/User';

export class UserList {
  users: User[];
  constructor(users: User[]) {
    this.users = users;
  }
}
