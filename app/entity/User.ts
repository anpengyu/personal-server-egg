import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import bcrypt = require('bcryptjs');
import { Exclude } from 'class-transformer';
// import Article from './blog/article';

@Entity('user')
export default class User extends BaseEntity {
    @Exclude()
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

    @Column({ default: '' })
    nickname: string;
    @Column({ default: '' })
    headImg: string;

    // 文章
    // @OneToMany(() => Article, article => article.user)
    // articles: Article[]

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    async validatPassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}