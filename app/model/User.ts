import { Entity, Column, BaseEntity,PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export default class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({default:''})
    address: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    repassword: string;
    @Column({default:''})
    sex: string;
    @Column({default:''})
    email: string;
}