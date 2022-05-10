import { Injectable } from '@nestjs/common';
import { AccountLoginDto } from 'src/modules/account/dto/account.dto';
import { SearchLoginHistory } from '../modules';
import { CreateHistory } from '../modules/createLoginHis';

@Injectable()
export class LoginService {
    constructor(
        private createHistory: CreateHistory,
        private searchHistory: SearchLoginHistory,
    ) {}

    async saveLoginHis(account: AccountLoginDto, status: string): Promise<any> {
        // return this.createHistory.generateHistory(account, status);
    }

    async getAllLoginHis(): Promise<any> {
        return await this.searchHistory.getAllLoginHis();
    }
}
