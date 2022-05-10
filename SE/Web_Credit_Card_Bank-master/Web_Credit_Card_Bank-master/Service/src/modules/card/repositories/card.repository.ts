import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Cards } from '../entities/card.entity';

@Injectable()
@EntityRepository(Cards)
export class CardRepository extends Repository<Cards>{}

