import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { PaymentStatus } from '../entities/paymentStatus.entity';

@Injectable()
@EntityRepository(PaymentStatus)
export class PaymentStatusRepository extends Repository<PaymentStatus>{}

