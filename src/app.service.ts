import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User, Users } from './account-store/interface/User';
import { SignUp } from './account-store/dto/sign-up.dto';
import { UserList } from './account-store/dto/user-response.dto';
import { AccountStoreService } from './account-store/account-store.service';

@Injectable()
export class AppService {
  userList: Users;
  constructor(private readonly accountService: AccountStoreService) {
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

  // @HttpCode(HttpStatus.CREATED)
  async register(signUp: SignUp) {
    try {
      this.accountService.addAccount(signUp.email, signUp);
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
      const user = this.accountService.getAccount(email);
      if (user.password && user.password === password) {
        return user;
      }
      throw new HttpException('User ont found', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      throw new HttpException(
        `Error logging in error:${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<UserList> {
    return this.accountService.listUsers();
  }
}
