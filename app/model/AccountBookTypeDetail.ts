import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('accountbooktype_detail')
export class AccountBookTypeDetail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name:'parent_id'})
    parentId: string;
    @Column()
    title: string;
}