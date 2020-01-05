import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('work_name')
export class WorkName {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({ name: 'work_type_id' })
    workTypeId: string;
}