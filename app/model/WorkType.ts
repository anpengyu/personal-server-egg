import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";

@Entity('work_type')
export class WorkType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column() 
    title: string;
}