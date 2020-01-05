import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('account_title')
export class AccountTitle {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({name:'parent_id'})
    parentId: string;
}