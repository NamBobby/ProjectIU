
import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountLoginDto, AccountTypeDto, findUserDto, fineOneDto } from 'src/modules/account/dto/account.dto';
import { forgotPassDto } from 'src/modules/auth/auth-dto';
import { Admin, User } from '../entities/account.entity';
import { AccountRepository, AdminRepository, UserRepository } from '../repositories/account.repository';

@Injectable()
export class FindOne {
    constructor(
        private accountRepository: AccountRepository, 
        private userRepository: UserRepository,
        private adminRepository: AdminRepository, 
    ) {}

    setInfoToFind(Info: AccountLoginDto):any {
        let {Password, ...InfoToFind} = Info; // because just using object username in Info account;
        return InfoToFind
    }

    async findOne(Info: fineOneDto):Promise<any> { 
            switch(Info.status) {
                case "GetAccount":
                    let user:User= await this.userRepository.findOne(Info.id);
                    if(user !== undefined) {
                        const {Password,...res} = user; // remove username and password from response
                        return res; // because want to know the information of response
                    } else {
                        throw new BadRequestException("NotFound")
                    }
                case "CheckExisted": 
                    let InfoToFind = this.setInfoToFind(Info.account);
                    let AccountRes = await this.accountRepository.findOne(InfoToFind);
                    console.log(AccountRes);
                    if(AccountRes !== undefined) {
                        return true //just need to know account existed or not 
                    }
                    return false
                case "UserLogin": 
                    let InfoToUserLogin = this.setInfoToFind(Info.account);
                    let userRes:User = await this.userRepository.findOne(InfoToUserLogin);
                    return userRes;
                case "AdminLogin": 
                    let InfoToAdminLogin = this.setInfoToFind(Info.account);
                    let adminRes:Admin = await this.adminRepository.findOne(InfoToAdminLogin);
                    return adminRes;
            default: 
                break;
            }
    }

    async findUserByIdentifyCard(Info: findUserDto): Promise<User> {
        let UserRes:User = await this.userRepository.findOne(Info)
        return UserRes;
    }

    async findUser(Info: forgotPassDto): Promise<any> {
        let UserRes:User = await this.userRepository.findOne({
            where: {
                PhoneNumber: Info.PhoneNumber,
                IdentifyCard: Info.ID,
                Email: Info.Email
            }
        })
        return UserRes;
    }
}