import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controllers/account.controller';
import { ManageAccount, FindOne } from './modules';
import { AccountRepository, AdminRepository, UserRepository } from './repositories/account.repository';
import { AccountService } from './services/account.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      AccountRepository,
      UserRepository,
      AdminRepository])
  ],
  controllers: [AccountController],
  providers: [
    AccountService, 
    ManageAccount,
    FindOne
  ]
})
export class AccountModule {}
