import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CardType } from '../entities/cardType.entity';


@Injectable()
@EntityRepository(CardType)
export class CardTypeRepository extends Repository<CardType>{}

