import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt = require('bcryptjs');
import {Exclude} from 'class-transformer';

@Entity('user')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column({ unique: true })
    username: string;
    @Column()
    phone: string;

    @Column()
    @Exclude()
    password: string;
    @Column({ nullable: true })
    address: string;
    @Column({ default: '' })
    sex: string;
    @Column({ default: '' })
    email: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    async validatPassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}