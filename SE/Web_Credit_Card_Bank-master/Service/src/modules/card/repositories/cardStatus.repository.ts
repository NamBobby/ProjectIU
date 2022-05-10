import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from 'typeorm';
import { CardStatus } from "../entities/cardStatus.entity";


@Injectable()
@EntityRepository(CardStatus)
export class CardStatusRepository extends Repository<CardStatus>{}
