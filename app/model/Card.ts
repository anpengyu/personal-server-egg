import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('card_list')
export class Card {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;
    @Column()
    name: string;
    @Column()
    money    : string;
    @Column()
    address: string;
    @Column()
    username: string;
    @Column()
    mark: string;
    @Column()
    type_name: string;
    @Column()
    time: string;
}