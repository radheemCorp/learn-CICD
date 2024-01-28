import { Module } from '@nestjs/common';
import { AccountStoreService } from './account-store.service';

@Module({
  providers: [AccountStoreService],
})
export class AccountStoreModule {}
