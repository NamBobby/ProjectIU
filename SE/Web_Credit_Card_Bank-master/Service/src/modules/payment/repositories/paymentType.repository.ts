import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { PaymentType } from "../entities/paymentType.entity";

@Injectable()
@EntityRepository(PaymentType)
export class PaymentTypeRepository extends Repository<PaymentType>{}
