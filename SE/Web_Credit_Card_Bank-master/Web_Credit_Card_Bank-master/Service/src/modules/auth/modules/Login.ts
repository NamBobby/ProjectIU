
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountLoginDto, fineOneDto } from 'src/modules/account/dto/account.dto';
import { Admin, User } from 'src/modules/account/entities/account.entity';
import { SignUser } from './sign-user';
import { AccountService } from '../../account/services/account.service';
import { PasswordCompare } from './compare-password';
import { CreateHistory } from 'src/modules/loginHis/modules';

@Injectable()
export class Login {
    constructor(
        private accountService: AccountService,
        private signUser: SignUser,
        private comparePassword: PasswordCompare,
        private loginHistory: CreateHistory
    ) {}

    setInfoLogin(status: string, account:AccountLoginDto):fineOneDto{
        let Info: fineOneDto = {
            status: status,
            account: account
        }
        return Info
    }

    async processResponseLogin(res: User|Admin , password: string, type: string) {
        let match = await this.comparePassword.passCompare(password, res.Password);
        let account:AccountLoginDto = {
            UserName: res.UserName,
            Password: password
        }
        // let match = true;
        if(match) {
            console.log(`Login(): ${type}`);
            this.saveHistory(account,res.AccountId, "Successful"); // save login when success
            return this.signUser.signUser(res.AccountId,res.UserName, type );
        } else{
            this.saveHistory(account, res.AccountId, "Unsuccessful");// save login when unsuccess
            throw new UnauthorizedException("Credential Incorrect");
        } 
        
    }

    async saveHistory(account:AccountLoginDto,id:number, status: string):Promise<any> {
        return this.loginHistory.generateHistory(account,id, status);
    }

    async accountLogin(account: AccountLoginDto):Promise<any>{ 
        let Info = this.setInfoLogin("UserLogin",account) // info to find account
        let res:User = await this.accountService.findOne(Info); 

        if(res !== undefined) {
            if(account.UserName === res.UserName) {
                return this.processResponseLogin(res,account.Password, "User");
            } else {
                throw new UnauthorizedException("Credential Incorrect");
            }
        } else {

            let Info = this.setInfoLogin("AdminLogin",account)
            let res:Admin = await this.accountService.findOne(Info); 

            if(res !== undefined) {
                return this.processResponseLogin(res,account.Password, "Admin")
            }else {
                throw new UnauthorizedException("Credential Incorrect");
            }
        }
    }
}