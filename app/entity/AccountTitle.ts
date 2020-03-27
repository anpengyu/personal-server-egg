import { Entity, Column, BaseEntity,PrimaryGeneratedColumn } from "typeorm";

@Entity('account_title')
export default class AccountTitle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({name:'parent_id'})
    parentId: string;
}