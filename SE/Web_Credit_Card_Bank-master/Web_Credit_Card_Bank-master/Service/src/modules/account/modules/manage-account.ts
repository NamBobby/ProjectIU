import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { AccountRegisterDto, updatePassword } from '../dto/account.dto';
import { UserRepository } from "../repositories/account.repository";

@Injectable()
export class ManageAccount {
    constructor(
        private userRepository: UserRepository    
    ) {}

    async saveAccount(account: AccountRegisterDto): Promise<any> {
        let result = await this.userRepository.save(account);
        if (result !== undefined) {
            return true;
        } else  
            return false;
    }

    async createAccount(account: AccountRegisterDto):Promise<any> { 
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(account.Password, salt);
        account.Password = hashPassword;
        console.log("createAccount(): ", account);
        let result = await this.saveAccount(account);
        if(result === true) {
            return account;
        } else 
        throw new BadRequestException('wrong infomation');
        
    }

    async updateAccountPass(params: updatePassword):Promise<boolean> {
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(params.Password, salt);
        console.log(params);
        let result = await (await this.userRepository.update(params.ID, {Password: hashPassword})).affected;
        if (result !== 0)
            return true;
        else 
            return false;
    }

}