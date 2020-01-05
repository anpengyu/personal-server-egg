import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('project')
export class Project {
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