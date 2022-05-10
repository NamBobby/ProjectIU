
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { LoginHistory } from './loginHis.entity';
@Entity('LoginHisStatuses')
export class LoginHisStatus {
    @PrimaryGeneratedColumn({type:'int', name:'StatusID'})
    StatusID: number;

    @Column({type:'varchar', name:'StatusName'})
    StatusName: string;

   @OneToMany(() => LoginHistory, history => history.LoginHisStatus)
   LoginHistory:LoginHistory[];
}