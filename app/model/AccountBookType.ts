import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('accountbooktype')
export class AccountBookType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name:'level_one'})
    levelOne: string;
}