import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchCard, UpdateCard } from '../card/modules';
import { CardRepository } from '../card/repositories/card.repository';
import { CardStatusRepository } from '../card/repositories/cardStatus.repository';
import { CardTypeRepository } from '../card/repositories/cardType.repository';
import { PaymentController } from './controllers/payment.controller';
import { checkBalance, CreatePayment, SearchPayment, SearchPaymentStatus, SearchPaymentType, UpdatePayment } from './modules';
import { PaymentRepository } from './repositories/payment.repository';
import { PaymentStatusRepository } from './repositories/paymentStatus.repository';
import { PaymentTypeRepository } from './repositories/paymentType.repository';
import { PaymentService } from './services/payment.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      CardRepository,
      PaymentRepository,
      PaymentStatusRepository,
      PaymentTypeRepository,
      CardTypeRepository,
      CardStatusRepository,
    ]),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    SearchPayment,
    SearchPaymentStatus,
    SearchPaymentType,
    SearchCard,
    checkBalance,
    CreatePayment,
    UpdatePayment,
    UpdateCard
  ]
})
export class PaymentModule {}
