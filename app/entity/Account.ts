import { Entity, Column,BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('account')
export default class Account extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    account: string;
    @Column()
    parent_id: string;
    @Column()
    phone: string;
    @Column()
    psw: string;
    @Column()
    username: string;

}