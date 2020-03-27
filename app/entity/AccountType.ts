import { Entity, Column,BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('account_type')
export default class AccountType extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
}