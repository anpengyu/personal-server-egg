import { Entity, Column,BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('project')
export default class Project extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    date: string;
    @Column()
    mark    : string;
    @Column()
    icon: string;
    @Column()
    link: string;
    @Column()
    type: string;
    @Column()
    technology: string;
}