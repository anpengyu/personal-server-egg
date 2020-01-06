import { Entity, Column,BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('work')
export default class Work  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    type: string;
    @Column()
    content: string;
    @Column()
    time: string;
    @Column()
    flag: string;
    @Column({name:'type_id'})
    typeId: string;
    @Column()
    butt_joint: string;
    @Column({name:'test_date'})
    developmentDate: string;
    @Column({name:'test_date'})
    testDate: string;
    @Column({name:'online_date'})
    onlineDate: string;
    @Column()
    icon: string;
}