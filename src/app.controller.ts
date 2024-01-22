import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SignUp } from './dto/sign-up.dto';
import { User } from './interface/User';
import { UserList } from './dto/user-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async register(@Body() signUp: SignUp) {
    return await this.appService.register(signUp);
  }

  @Post('login')
  async login(@Body() user: User): Promise<User> {
    return await this.appService.login(user.email, user.password);
  }

  @Get('users')
  async getUsers(): Promise<UserList> {
    return await this.appService.getUsers();
  }
}
