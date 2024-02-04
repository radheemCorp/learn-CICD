import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from './account-store/interface/User';
import { SignUp } from './account-store/dto/sign-up.dto';
import { AccountStoreService } from './account-store/account-store.service';

@Injectable()
export class AppService {
  constructor(private readonly accountService: AccountStoreService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // @HttpCode(HttpStatus.CREATED)
  async register(signUp: SignUp) {
    try {
      return this.accountService.addAccount(signUp.username, signUp);
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
      if (user && user.password === password) {
        return user;
      }
      throw new HttpException('User ont found', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error:${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<string[]> {
    return this.accountService.listUsers();
  }
}
