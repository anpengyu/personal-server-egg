import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from './User';

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

    @ManyToOne(() => User, user => user.cards)
    author: User;

    fullName(): number {
        const { type, name } = this;
        console.log('type', type)
        console.log('name', name)
        return Number(type) + Number(name)
    }
}