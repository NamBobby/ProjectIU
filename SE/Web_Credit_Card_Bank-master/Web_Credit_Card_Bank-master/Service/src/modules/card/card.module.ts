import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageAccount, FindOne } from '../account/modules';
import { AccountRepository, AdminRepository, UserRepository } from '../account/repositories/account.repository';
import { AccountService } from '../account/services/account.service';
import { SendMail } from '../auth/email/sendmail';
import { CardController } from './controllers/card.controller';
import { CreateNewCard, SearchCard, UpdateCard } from './modules';
import { CardRepository } from './repositories/card.repository';
import { CardStatusRepository } from './repositories/cardStatus.repository';
import { CardTypeRepository } from './repositories/cardType.repository';
import { CardService } from './services/card.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountRepository,
      UserRepository,
      AdminRepository,
      CardRepository,
      CardStatusRepository,
      CardTypeRepository]),
    ],

  providers: [
    CardService,
    AccountService,
    FindOne,
    ManageAccount,
    SearchCard,
    CreateNewCard,
    UpdateCard,
    SendMail
    ],
  controllers: [CardController]
})
export class CardModule {}