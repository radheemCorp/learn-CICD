import { Injectable } from '@nestjs/common';
import { User } from './interface/User';
import * as fs from 'fs';

@Injectable()
export class AccountStoreService {
  private users: Map<string, User> = new Map();
  private filePath: string = `${__dirname}/accountStore.json`;
  constructor() {
    this.users = this.users.set('root', {
      username: 'root',
      email: 'root@email.com',
      password: 'root',
    });
  }
  private fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }
  public initAccountStore(): boolean {
    try {
      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      if (fileContent.length > 0) {
        this.users = JSON.parse(fileContent);
      }
      return true;
    } catch (error) {
      console.error('Error reading the file:', error);
      return false;
    }
  }

  public saveAccountStore(): boolean {
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

  public getAccount(email: string): User {
    try {
      return this.users.get(email);
    } catch (e) {
      throw Error('User not found');
    }
  }

  public addAccount(username: string, userData: User): string {
    if (this.users.has(username)) {
      throw Error('User already exists');
    } else {
      this.users.set(username, userData);
      return 'Account registered';
    }
  }
  public listUsers(): string[] {
    return Array.from(this.users.keys());
  }
}
