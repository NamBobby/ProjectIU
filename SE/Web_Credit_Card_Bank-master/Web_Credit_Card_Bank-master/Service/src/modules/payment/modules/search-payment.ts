import { Injectable } from "@nestjs/common";
import { PaymentStatus } from "../entities/paymentStatus.entity";
import { PaymentRepository } from "../repositories/payment.repository";

@Injectable()
export class SearchPayment {
    constructor(
        private PaymentRepo: PaymentRepository
    ) {}

    async searchAllPayment():Promise<any> {
        return this.PaymentRepo.find();
    }
}