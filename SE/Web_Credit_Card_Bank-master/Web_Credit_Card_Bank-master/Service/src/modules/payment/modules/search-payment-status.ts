import { Injectable } from "@nestjs/common";
import { PaymentStatus } from "../entities/paymentStatus.entity";
import { PaymentStatusRepository } from "../repositories/paymentStatus.repository";

@Injectable()
export class SearchPaymentStatus {
    constructor(
        private paymentStatusRepo: PaymentStatusRepository
    ) {}

    async searchStatus(status: string):Promise<any> {
        let result: PaymentStatus = await this.paymentStatusRepo.findOne({
            where: {
                StatusName: status
            }
        })
        return result.PaymentStatusID
    }
}