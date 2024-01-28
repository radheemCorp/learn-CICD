import { Injectable } from '@nestjs/common';
import { User, Users } from 'src/account-store/interface/User';
import * as fs from 'fs';
import { UserList } from 'src/account-store/dto/user-response.dto';

@Injectable()
export class AccountStoreService {
  private users: Users;
  private filePath: string;
  constructor() {
    this.filePath = 'src/accountStore.json';
    if (this.filePath && this.fileExists(this.filePath)) {
      const resp = this.initAccountStore();
      if (!resp) {
        throw new Error('Error: File not Found or parsing JSON file');
      }
    }
  }
  private fileExists(filePath: string) {
    return fs.existsSync(filePath);
  }
  public initAccountStore() {
    try {
      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      this.users = JSON.parse(fileContent);
      return true;
    } catch (error) {
      console.error('Error reading the file:', error);
      return false;
    }
  }

  public saveAccountStore() {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.users, null, 2),
        'utf-8',
      );
      return true;
    } catch (error) {
      console.error('Error writing to the file:', error);
      return false;
    }
  }

  public getAccount(email: string) {
    if (this.users && email in this.users) {
      return this.users[email];
    } else {
      throw Error('User not Found');
    }
  }

  public addAccount(email: string, userData: User) {
    if (this.users && email in this.users) {
      throw Error('User already exists');
    } else {
      this.users[email] = userData;
      return;
    }
  }
  public listUsers() {
    const result = [];
    for (const i of Object.keys(this.users)) {
      result.push(this.users[i]);
    }
    return new UserList(result);
  }
}
