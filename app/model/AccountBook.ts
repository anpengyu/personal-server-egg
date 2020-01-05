import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('accountbook')
export class AccountBook {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    year: string;
    @Column()
    address: string;
    @Column()
    classify: string;
    @Column({name:'source_type'})
    sourceType: string;
    @Column()
    money    : string;
    @Column()
    time: string;
    @Column()
    month: string;
    @Column()
    day: string;
    @Column()
    directions: string;
    @Column()
    monthWeek: string;
    @Column({name:'type_id'})
    typeId: string;
    @Column()
    type: string;
}