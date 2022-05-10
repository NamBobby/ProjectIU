import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Accounts, Admin } from '../entities/account.entity';
import { User } from 'src/modules/account/entities/account.entity';

@Injectable()
@EntityRepository(Accounts)
export class AccountRepository extends Repository<Accounts> {}

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User>{}

@Injectable()
@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{}

