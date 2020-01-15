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
    @Column({default:'0'})
    flag: string;
    @Column({name:'type_id',default:''})
    typeId: string;
    @Column({default:''})
    butt_joint: string;
    @Column({name:'test_date',default:''})
    testDate: string;
    @Column({name:'online_date',default:''})
    onlineDate: string;
    @Column({name:'development_date',default:''})
    developmentDate: string;
    @Column({default:''})
    icon: string;
}