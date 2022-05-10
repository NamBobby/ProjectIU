import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { CreateHistory, SearchLoginHistory } from 'src/modules/loginHis/modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginHistoryRepository } from './repositories/loginHis.repository';
import { LoginHisStatusRepository } from './repositories/loginHisStatus.repository';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([
      LoginHistoryRepository,
      LoginHisStatusRepository
    ]),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    SearchLoginHistory,
    CreateHistory]
})
export class LoginModule {}
