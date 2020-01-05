import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('account')
export class Account {
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