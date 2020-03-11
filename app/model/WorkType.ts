import { Entity,Column,BaseEntity,PrimaryGeneratedColumn } from "typeorm";

@Entity('work_type')
export default class WorkType extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column() 
    title: string;
}