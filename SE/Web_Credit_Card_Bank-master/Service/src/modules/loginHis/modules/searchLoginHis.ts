import { Injectable } from "@nestjs/common";
import { AccountLoginDto } from 'src/modules/account/dto/account.dto';
import { LoginHistory } from "../entities/loginHis.entity";
import { LoginHisStatus } from "../entities/loginHisStatus.entity";
import { LoginHistoryRepository } from "../repositories/loginHis.repository";
import { LoginHisStatusRepository } from "../repositories/loginHisStatus.repository";
import * as bcrypt from 'bcryptjs';


@Injectable()
export class SearchLoginHistory {
    constructor(
        private loginHisRepo: LoginHistoryRepository,
    ) {}

    async getAllLoginHis(): Promise<any> {
        return await this.loginHisRepo.find();
    }
}