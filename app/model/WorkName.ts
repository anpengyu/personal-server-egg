import { Entity, Column,BaseEntity, PrimaryGeneratedColumn, ManyToOne ,RelationId} from "typeorm";
import User from './User';

@Entity('work_name')
export default class WorkName extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({ name: 'work_type_id' })
    workTypeId: string;

    @ManyToOne(() => User, user => user.cards,{eager:true})
    author: User;

    @RelationId((workname:WorkName)=>workname.author)
    userId:number
}