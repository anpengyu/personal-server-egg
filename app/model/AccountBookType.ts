import { Entity, Column,BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('accountbooktype')
export default class AccountBookType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name:'level_one'})
    levelOne: string;
}