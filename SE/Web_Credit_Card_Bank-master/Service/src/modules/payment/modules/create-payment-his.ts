import { Injectable } from "@nestjs/common";
import { Cards } from "src/modules/card/entities/card.entity";
import { SearchCard } from "src/modules/card/modules";
import { Payments } from "../entities/payment.entity";
import { PaymentRepository } from "../repositories/payment.repository";
import { SearchPaymentStatus } from './search-payment-status';
import { SearchPaymentType } from './search-payment-type';


@Injectable()
export class CreatePayment {
    constructor(
        private paymentRepository: PaymentRepository,
        private searchCard: SearchCard,
        private searchTypePayment: SearchPaymentType,
        private searchStatusPayment: SearchPaymentStatus

    ) {}
    dateTimeGenerate(type: string) {
        let date_ob = new Date();
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let hours: number | string = date_ob.getHours();
        if(hours < 10) hours = "0" + hours;
        let minutes: number | string = date_ob.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let seconds: number | string = date_ob.getSeconds();
        if(seconds < 10)  seconds = "0" + seconds;
        // prints date & time in YYYY-MM-DD format
        let dateRes = `${year}-${month}-${date}`
        let Time= `${hours}:${minutes}:${seconds}`;
        if(type == "date") {
            return dateRes
        } 
        return Time;
    }

    async createPayment(cardId: any, amount: number, location:string, type:string, status:string):Promise<any> {
        let cardSearched:Cards = await this.searchCard.searchCardByCardId(cardId);
        console.log(cardSearched);
        let typePayment = await this.searchTypePayment.searchType(type);
        let statusPayment = await this.searchStatusPayment.searchStatus(status);

        let paymentCreated: Payments = await this.paymentRepository.create({
            Amounts: amount,
            Location: location,
            CurrentBalance: cardSearched.CurrentBalance,
            Date: this.dateTimeGenerate('date'),
            Time: this.dateTimeGenerate('time'),
            Card: cardId,
            PaymentType: typePayment,
            PaymentStatus: statusPayment

        })
        let result = await this.paymentRepository.save(paymentCreated);
    }
}