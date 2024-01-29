export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Users {
  [key: string]: User;
}
