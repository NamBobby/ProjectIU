import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { LoginHistory } from '../entities/loginHis.entity';

@Injectable()
@EntityRepository(LoginHistory)
export class LoginHistoryRepository extends Repository<LoginHistory>{}

