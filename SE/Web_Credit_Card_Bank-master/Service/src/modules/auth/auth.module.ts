import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ManageAccount, FindOne } from '../account/modules';
import { AccountRepository, AdminRepository, UserRepository } from '../account/repositories/account.repository';
import { AccountService } from '../account/services/account.service';
import { CreateHistory } from '../loginHis/modules';
import { LoginHistoryRepository } from '../loginHis/repositories/loginHis.repository';
import { LoginHisStatusRepository } from '../loginHis/repositories/loginHisStatus.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SendMail } from './email/sendmail';
import { Login, PasswordCompare, SignUp, SignUser } from './modules';
import { AdminJwtStrategy } from './strategy/adminjwt.strategy';
import { UserJwtStrategy } from './strategy/jwt.strategy';
dotenv.config();
const {JWT_SECRET} = process.env;

@Module({
  imports:[
  JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {expiresIn: '1000s'}
    }),
    TypeOrmModule.forFeature([
      AccountRepository,
      UserRepository,
      AdminRepository,
      LoginHistoryRepository,
      LoginHisStatusRepository]),
  ],
controllers: [AuthController],
  providers: [
    AccountService,
    FindOne,
    ManageAccount,
    CreateHistory,
    AuthService,
    UserJwtStrategy, 
    AdminJwtStrategy,
    Login,
    SignUp,
    SignUser,
    SendMail,
    PasswordCompare]
})
export class AuthModule {}
