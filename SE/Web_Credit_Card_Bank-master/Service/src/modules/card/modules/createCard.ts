import { BadRequestException, Injectable } from "@nestjs/common";
import { typeCardToSearch } from "../dto/cardType.dto";
import { CardRepository } from '../repositories/card.repository';
import { SearchCard } from './searchCard';


@Injectable()
export class CreateNewCard {
    constructor(
        private searchCard: SearchCard,
        private cardRepository: CardRepository,

    ) {}

    dateExpired() {
        let date_ob = new Date();
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear() +5;
        let hours: number | string = date_ob.getHours();
        if(hours < 10) hours = "0" + hours;
        let minutes: number | string = date_ob.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let seconds: number | string = date_ob.getSeconds();
        if(seconds < 10)  seconds = "0" + seconds;
        // prints date & time in YYYY-MM-DD format
        let dateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
        return dateTime;
    }

    generateNumber(range: number) {
        let randomNumber = Math.floor(Math.random() * (Math.pow(10,range)- Math.pow(10, range-1))) + Math.pow(10,range-1);
        return randomNumber
    }

    async createNewCard(cardRequest: typeCardToSearch) {
        let cardTypeId:number = await this.searchCard.findCardTypeId(cardRequest.CardType);
        let timeExpired:string = this.dateExpired();
        let cvv:number = this.generateNumber(4);
        let cardId:number = this.generateNumber(12);
        console.log(cardTypeId, timeExpired, cvv);
        let newCard:any = {
            CardID: cardId,
            CurrentBalance: 500000,
            CVV: cvv,
            DateOfExpired: timeExpired,
            Account: cardRequest.Account,
            CardType: cardTypeId,
            CardStatus: 1
        }
        let result: any = await this.cardRepository.save(newCard);
        if(result !== undefined) {
            return newCard;
        } else {
            return undefined;
        }
    }
}