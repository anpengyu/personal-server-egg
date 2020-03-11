import { Entity, Column, BaseEntity,PrimaryGeneratedColumn } from "typeorm";

@Entity('accountbooktype_detail')
export default class AccountBookTypeDetail extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name:'parent_id'})
    parentId: string;
    @Column()
    title: string;
}