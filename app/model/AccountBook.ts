import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('accountbook')
export default class AccountBook extends BaseEntity {
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
    @Column({ name: 'source_type' })
    sourceType: string;
    @Column()
    money: string;
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
    @Column({ name: 'type_id' })
    typeId: string;
    @Column()
    type: string;
    @Column()
    userid: number;
}