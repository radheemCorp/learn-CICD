import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { SignUp } from './account-store/dto/sign-up.dto';
import { AccountStoreModule } from './account-store/account-store.module';
import { AccountStoreService } from './account-store/account-store.service';
import { rootUser } from './app.constants';
describe('HilalUserService', () => {
  let service: AppService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountStoreModule],
      providers: [AppService, AccountStoreService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return root user', async () => {
    const resp = await service.getUsers();
    console.log(resp);
    expect(resp.includes(rootUser.username)).toBe(true);
  });

  it('should add user', async () => {
    const signupData: SignUp = {
      username: 'root2',
      password: 'rootPass',
      email: 'root2@email.com',
    };
    await service.register(signupData);
    const userList = await service.getUsers();
    expect(userList.includes(signupData.username)).toBe(true);
  });

  it('should should validate and login user', async () => {
    const myUser = await service.login(rootUser.username, rootUser.password);
    expect(myUser.username).toBe(rootUser.username);
  });
});
