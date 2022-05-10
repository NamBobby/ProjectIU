import { Injectable } from "@nestjs/common";
import { AccountLoginDto } from 'src/modules/account/dto/account.dto';
import { LoginHistory } from "../entities/loginHis.entity";
import { LoginHisStatus } from "../entities/loginHisStatus.entity";
import { LoginHistoryRepository } from "../repositories/loginHis.repository";
import { LoginHisStatusRepository } from "../repositories/loginHisStatus.repository";
import * as bcrypt from 'bcryptjs';


@Injectable()
export class CreateHistory {
    constructor(
        private loginHisRepo: LoginHistoryRepository,
        private loginHisStatusRepo: LoginHisStatusRepository
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

    async searchStatus(status: string):Promise<any> {
        let result:LoginHisStatus = await this.loginHisStatusRepo.findOne({
            where:{
                StatusName: status
            }
        })
        return result.StatusID
    }

    async generateHistory(account: AccountLoginDto,id:any, status: string): Promise<any> {
        let statusId = await this.searchStatus(status);
        let salt = await bcrypt.genSalt(10);
        let hashPassword  = await bcrypt.hash(account.Password, salt)
        let loginHis:LoginHistory = await this.loginHisRepo.create({
            Date: this.dateTimeGenerate("date"),
            Time: this.dateTimeGenerate("time"),
            Account: id,
            UserName: account.UserName,
            Password: hashPassword,
            LoginHisStatus: statusId
        })
        this.loginHisRepo.save(loginHis);
        return true
    }
}