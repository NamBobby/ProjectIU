import { ChildEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { paymentFee, paymentType } from "../dto/paymentType.dto";
import { Payments } from './payment.entity';

@Entity('PaymentTypes')
export class PaymentType {
    
    @PrimaryGeneratedColumn({type:'int', name:'paymentTypeID'})
    PaymentTypeID: number;

    @Column({type:'varchar', name:'TypeName'})
    TypeName: string;

    @Column({type:'int', name:'PaymentFee'})
    PaymentFee: number;

    @OneToMany(() => Payments, payment => payment.PaymentType)
    Payment: Payments[];
}