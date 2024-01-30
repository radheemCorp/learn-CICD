import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUp } from './account-store/dto/sign-up.dto';
import { AccountStoreModule } from './account-store/account-store.module';
import { AccountStoreService } from './account-store/account-store.service';

describe('AppController', () => {
  let appController: AppController;
  const rootUser = {
    username: 'radheem',
    email: 'radheem@gmail.com',
    password: 'radheem',
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AccountStoreModule],
      controllers: [AppController],
      providers: [AppService, AccountStoreService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return root user', async () => {
      const resp = await appController.getUsers();
      expect(resp.users[0].username).toBe(rootUser.username);
      expect(resp.users[0].email).toBe(rootUser.email);
      expect(resp.users[0].password).toBe(rootUser.password);
    });

    it('should add user', async () => {
      const signupData: SignUp = {
        username: 'root2',
        password: 'rootPass',
        email: 'root2@email.com',
      };
      await appController.register(signupData);
      const userList = await appController.getUsers();
      expect(userList.users[1].username).toBe(signupData.username);
      expect(userList.users[1].email).toBe(signupData.email);
      expect(userList.users[1].password).toBe(signupData.password);
    });

    it('should should validate and login user', async () => {
      const data = {
        email: rootUser.email,
        password: rootUser.password,
        username: null,
      };
      const myUser = await appController.login(data);
      expect(myUser.username).toBe(rootUser.username);
    });
  });
});
