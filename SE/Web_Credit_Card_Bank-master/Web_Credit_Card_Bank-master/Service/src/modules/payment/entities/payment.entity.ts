import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cards } from '../../card/entities/card.entity';
import { PaymentStatus } from './paymentStatus.entity';
import { PaymentType } from "./paymentType.entity";

@Entity('Payments')
export class Payments {

    @PrimaryGeneratedColumn({type:'int', name:'PaymentId'}) 
    PaymentID: number;

    @Column({type: 'int', name:'Amount'})
    Amounts: number;

    @Column({type: 'bigint', name:'CurrentBalance'})
    CurrentBalance: number;

    @Column({type:'varchar', name:'Location'})
    Location: string;

    @Column({type:'time', name: 'Time'})
    Time: Date;

    @Column({type:'date', name:'Date'})
    Date:Date;

    @ManyToOne(() => Cards, card => card.Payment,{eager:true})
    Card:Cards;

    @ManyToOne(() => PaymentType, paymentType => paymentType.Payment,{eager:true})
    PaymentType: PaymentType;

    @ManyToOne(() => PaymentStatus, PaymentStatus => PaymentStatus.Payment,{eager:true})
    PaymentStatus: PaymentStatus;
}
