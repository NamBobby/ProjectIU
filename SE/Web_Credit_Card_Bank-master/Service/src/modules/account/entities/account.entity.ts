
import { ChildEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { Cards } from '../../card/entities/card.entity';
import { LoginHistory } from '../../loginHis/entities/loginHis.entity';
import { role } from '../dto/accountRole.dto';

@Entity('Accounts')
@TableInheritance({
    column: {type:'enum', enum: role, name: 'Role', nullable:false}
})
export class Accounts {
    @PrimaryGeneratedColumn( {name: 'AccountId', type: 'int'})
    AccountId: number;

    @Column({name: 'FirstName', type: 'varchar', length: 20})
    FirstName: string;
    
    @Column({name: 'LastName', type: 'varchar', length: 20})
    LastName: string;

    @Column({type:'varchar', name:'Email'})
    Email:string;

    @Column({type:'varchar', name:'Username'})
    UserName:string;

    @Column({type:'varchar', name:'Password'})
    Password:string;

    @Column({type:'int', name: 'PhoneNumber'})
    PhoneNumber: number;

    @OneToMany(() => LoginHistory, LoginHistory => LoginHistory.Account) 
    LoginHistory: LoginHistory[];
}

@ChildEntity(role.User)
export class User extends Accounts {
    
    @Column({type:'bigint', name:'IdentifyCard'})
    IdentifyCard:number;

    @Column({type:'date', name:'DateOfBirth'}) // format of mysql: yyyy-mm-dd
    DateOfBirth: Date;

    @Column({type:'varchar', name: 'Address'})
    Address: string;

    @OneToMany(() => Cards, card => card.Account)
    Card: Cards[];

}

@ChildEntity(role.Admin)
export class Admin extends Accounts {
}

