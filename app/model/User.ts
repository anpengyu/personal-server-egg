import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt = require('bcryptjs');

@Entity('user')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    username: string;
    @Column()
    phone: string;
    @Column()
    password: string;
    @Column({ nullable: true })

    address: string;
    @Column({ default: '' })
    sex: string;
    @Column({ default: '' })
    email: string;

    hashPassword(){
        this.password = bcrypt.hashSync(this.password,10);
    }
}