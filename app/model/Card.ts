import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('card_list')
export default class Card extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;
    @Column()
    name: string;
    @Column()
    money: string;
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
    @Column()
    userid: number;


    fullName(): number {
        const { type, name } = this;
        return Number(type) + Number(name)
    }
}