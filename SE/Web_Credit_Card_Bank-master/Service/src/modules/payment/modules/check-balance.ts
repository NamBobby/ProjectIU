import { Injectable } from "@nestjs/common";
import { LineOfCredit } from "src/modules/card/dto/cardType.dto";

@Injectable()
export class checkBalance {
    constructor() {}

    async checkBalanceAvailable(currentBalance:number, amountTranfer: number, lineOfDebit:number): Promise<boolean | string> {
        if (currentBalance <= amountTranfer + 100000) {
            return "Current Balance Not Enough" 
           
        }

        if (amountTranfer > lineOfDebit) {
            return "Balance Over Line Of Debit"
        }
        return true
    }
}