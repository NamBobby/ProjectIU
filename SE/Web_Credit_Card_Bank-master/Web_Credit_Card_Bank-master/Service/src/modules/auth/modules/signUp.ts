import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountRegisterDto, findUserDto } from "src/modules/account/dto/account.dto";
import { User } from "src/modules/account/entities/account.entity";
import { AccountService } from "src/modules/account/services/account.service";
import { SignUser } from './sign-user';


@Injectable()
export class SignUp {
    constructor(
        private accountService: AccountService,
        private signUser: SignUser,
    ) {}

    async accountRegister(account: AccountRegisterDto):Promise<any>{
        let infoID: findUserDto = {
            IdentifyCard: account.IdentifyCard,
        } 
        //check customer existed 
        let UserExisted:User = await this.accountService.findUserByIdentifyCard(infoID);
        if(UserExisted !== undefined) {
            throw new UnauthorizedException("User existed");
        } else {
            //create account 
            let accountCreated:User = await this.accountService.createAccount(account);
            
            console.log("SignUp(): ", accountCreated);
            return this.signUser.signUser(accountCreated.IdentifyCard, accountCreated.UserName, "User");
        }
    }
}
