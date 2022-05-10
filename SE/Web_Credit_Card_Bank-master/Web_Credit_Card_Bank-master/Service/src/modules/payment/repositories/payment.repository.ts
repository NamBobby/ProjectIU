import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Payments } from 'src/modules/payment/entities/payment.entity';

@Injectable()
@EntityRepository(Payments)
export class PaymentRepository extends Repository<Payments>{}
