import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User, Users } from './interface/User';
import { SignUp } from './dto/sign-up.dto';
import { UserList } from './dto/user-response.dto';

@Injectable()
export class AppService {
  userList: Users;
  constructor() {
    this.userList = {
      'radheem@gmail.com': {
        username: 'radheem',
        email: 'radheem@gmail.com',
        password: 'radheem',
      },
    };
  }

  getHello(): string {
    return 'Hello World!';
  }

  @HttpCode(HttpStatus.CREATED)
  async register(signUp: SignUp) {
    try {
      this.userList[signUp.email] = { ...signUp };
    } catch (error) {
      throw new HttpException(
        `Error registering user: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @HttpCode(HttpStatus.OK)
  async login(email: string, password: string): Promise<User> {
    try {
      if (email in this.userList) {
        if (password === this.userList[email].password) {
          return this.userList[email];
        }
        throw new HttpException('incorrect password', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('User ont found', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      throw new HttpException(
        `Error logging in error:${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<UserList> {
    const result = [];
    for (const i of Object.keys(this.userList)) {
      result.push(this.userList[i]);
    }
    return new UserList(result);
  }
}
