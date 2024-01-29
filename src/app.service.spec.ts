import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { SignUp } from './account-store/dto/sign-up.dto';

describe('HilalUserService', () => {
  let service: AppService;
  const rootUser = {
    username: 'radheem',
    email: 'radheem@gmail.com',
    password: 'radheem',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return root user', async () => {
    const resp = await service.getUsers();
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
    await service.register(signupData);
    const userList = await service.getUsers();
    expect(userList.users[1].username).toBe(signupData.username);
    expect(userList.users[1].email).toBe(signupData.email);
    expect(userList.users[1].password).toBe(signupData.password);
  });

  it('should should validate and login user', async () => {
    const myUser = await service.login(rootUser.email, rootUser.password);
    expect(myUser.username).toBe(rootUser.username);
  });
});
