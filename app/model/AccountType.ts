import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('account_type')
export class AccountType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
}