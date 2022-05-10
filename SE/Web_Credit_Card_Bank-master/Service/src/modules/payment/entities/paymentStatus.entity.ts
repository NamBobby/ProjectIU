
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payments } from 'src/modules/payment/entities/payment.entity';
@Entity('PaymentStatuses')
export class PaymentStatus {
    @PrimaryGeneratedColumn({type:'int', name:'PaymentStatus'})
    PaymentStatusID: number;

    @Column({type:'varchar', name:'StatusName'})
    StatusName: string;

    @OneToMany(() => Payments, payment => payment.PaymentStatus)
    Payment:Payments[];
}