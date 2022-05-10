import { BadRequestException, Injectable } from '@nestjs/common';
import { Cards } from 'src/modules/card/entities/card.entity';
import { SearchCard } from 'src/modules/card/modules';
import { cardUpdateDto, externalPaymentDto, internalPaymentDto } from '../dto/paymentType.dto';
import { checkBalance, CreatePayment, SearchPayment, UpdatePayment } from '../modules';

@Injectable()
export class PaymentService {
    constructor(
        private searchCard: SearchCard,
        private checkBalance: checkBalance,
        private updatePayment: UpdatePayment,
        private createPaymentHis: CreatePayment,
        private searchPayment: SearchPayment,
    ){}

    async internalTransfer(paymentData: internalPaymentDto, type:string) {
        if(paymentData.CardIdReceive == paymentData.CardIdSend) {
            throw new BadRequestException("can not transfer");
        }
        //find card receive
        let cardReceive: Cards = await this.searchCard.searchCardByCardId(paymentData.CardIdReceive);
        
        let cardTransfer:Cards = await this.searchCard.searchCardByCardId(paymentData.CardIdSend);

        if(cardReceive == undefined || cardTransfer == undefined || cardReceive.CardStatus.StatusName !== "open" || cardTransfer.CardStatus.StatusName !== "open") {
            throw new BadRequestException("card does not existed");
        }

        //check balance available
        let checkBalance: boolean | string = await this.checkBalance.checkBalanceAvailable(cardTransfer.CurrentBalance, paymentData.Balance, cardTransfer.CardType.LineOfDebit)

        if(checkBalance !== true) {
            throw new BadRequestException(checkBalance);
        } else {
            // update account payment 
            let cardSend: cardUpdateDto = {
                CardId: paymentData.CardIdSend,
                Balance: paymentData.Balance,
                CurrentBalance: cardTransfer.CurrentBalance,
                type: type
            }

            let cardTransferUpdate: boolean = await this.updatePayment.updateAccountTransfer(cardTransfer.CardID, cardTransfer.CurrentBalance, paymentData.Balance, "Internal");

            let cardReceiveUpdate: boolean = await this.updatePayment.updateAccountReceive(cardReceive.CardID,cardReceive.CurrentBalance, paymentData.Balance);

            if(cardTransferUpdate !== true || cardReceiveUpdate !== true) {
                throw new BadRequestException('false to transfer')
            }

            let transferHis = await this.createPaymentHis.createPayment(cardTransfer.CardID, paymentData.Balance, paymentData.Location, type, "Transfer");

            let receiveHis = await this.createPaymentHis.createPayment(cardReceive.CardID, paymentData.Balance, paymentData.Location, type, "Receive")
            return "Done"
        }
    }

    async externalTransfer(paymentData: externalPaymentDto, type: string) {
        let cardTransfer:Cards = await this.searchCard.searchCardByCardId(paymentData.CardIdSend);

        let checkBalance: boolean | string = await this.checkBalance.checkBalanceAvailable(cardTransfer.CurrentBalance, paymentData.Balance, cardTransfer.CardType.LineOfDebit)

        if(checkBalance !== true) {
            throw new BadRequestException(checkBalance);
        } else {
            // update account payment 
            let cardSend: cardUpdateDto = {
                CardId: paymentData.CardIdSend,
                Balance: paymentData.Balance,
                CurrentBalance: cardTransfer.CurrentBalance,
                type: type
            }

            let cardTransferUpdate: boolean = await this.updatePayment.updateAccountTransfer(cardTransfer.CardID, cardTransfer.CurrentBalance, paymentData.Balance, "Internal");

            if(cardTransferUpdate !== true) {
                throw new BadRequestException('false to transfer')
            }

            let transferHis = await this.createPaymentHis.createPayment(cardTransfer.CardID, paymentData.Balance, paymentData.Location, type, "Transfer");
            return "Done"
        }
    }

    async getAllPayment(): Promise<any> {
        return await this.searchPayment.searchAllPayment();
    }
}
