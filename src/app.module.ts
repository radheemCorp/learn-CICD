import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountStoreModule } from './account-store/account-store.module';
import { AccountStoreService } from './account-store/account-store.service';

@Module({
  imports: [AccountStoreModule],
  controllers: [AppController],
  providers: [AppService, AccountStoreService],
})
export class AppModule {}
