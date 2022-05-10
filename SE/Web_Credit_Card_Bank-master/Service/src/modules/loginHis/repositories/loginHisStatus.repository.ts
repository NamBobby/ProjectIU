import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { LoginHisStatus } from '../entities/loginHisStatus.entity';

@Injectable()
@EntityRepository(LoginHisStatus)
export class LoginHisStatusRepository extends Repository<LoginHisStatus>{}
