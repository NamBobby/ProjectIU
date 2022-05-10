import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cards } from './card.entity';

@Entity('CardStatuses')
export class CardStatus {
    @PrimaryGeneratedColumn({type:'int', name:'StatusID'})
    StatusID: number;

    @Column({type:'varchar', name:'StatusName'})
    StatusName: string;

    @OneToMany (() => Cards, card => card.CardStatus)
    Card: Cards[];

}