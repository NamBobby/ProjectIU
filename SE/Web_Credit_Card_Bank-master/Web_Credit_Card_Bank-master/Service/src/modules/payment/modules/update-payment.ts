import { Injectable } from "@nestjs/common";
import { UpdateCard } from "src/modules/card/modules";
import { paymentFee } from "../dto/paymentType.dto";


@Injectable()
export class UpdatePayment {
    constructor(
        private updateAccount: UpdateCard,
    ) {}

    async updateAccountTransfer(cardId:number, currBalance: number, Balance: number, type:string): Promise<boolean> {
        let newBalance: number;
        switch(type) {
            case "Free":
                newBalance = currBalance - Balance - paymentFee.Free;
                break;
            case "External":
                newBalance = currBalance - Balance - paymentFee.External;
                break;
            default: 
                newBalance = currBalance - Balance - paymentFee.Internal;
                break;
        }
        return await this.updateAccount.updateAccountPayment(cardId, newBalance);
    }

    async updateAccountReceive(cardId:number, currBalance: number, Balance: number): Promise<boolean> {
        currBalance = Number(currBalance);
        let newBalance = currBalance + Balance;
        return await this.updateAccount.updateAccountPayment(cardId, newBalance);
    }
    
}