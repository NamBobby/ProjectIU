import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { CardModule } from './modules/card/card.module';
import { LoginModule } from './modules/loginHis/login.module';
import { PaymentModule } from './modules/payment/payment.module';


@Module({
  imports: [
  TypeOrmModule.forRoot(typeOrmConfig),
  AccountModule,
  LoginModule,
  CardModule,
  AuthModule,
  PaymentModule,
  ],
  controllers: [AppController],
  providers: [ AppService ],
  exports:[]
})
export class AppModule {}
