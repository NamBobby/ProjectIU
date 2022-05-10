import { Injectable } from "@nestjs/common";
import { PaymentType } from "../entities/paymentType.entity";
import { PaymentTypeRepository } from "../repositories/paymentType.repository";


@Injectable()
export class SearchPaymentType {
    constructor(
        private paymentTypeRepository: PaymentTypeRepository
    ) {}

    async searchType(type: string): Promise<any> {
        let rightType = type.charAt(0).toUpperCase() + type.slice(1);
        let result: PaymentType = await this.paymentTypeRepository.findOne({
            where: {
                TypeName: rightType
            }
        })
        return result.PaymentTypeID
    }
}