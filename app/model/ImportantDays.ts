import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('important_days')
export default class ImportantDays extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    date: string;
    @Column()
    mark: string;
    @Column()
    icon: string;
    @Column()
    cycle: string;
    @Column()
    type: string;
    @Column()
    bg: string;
    @CreateDateColumn()
    createDate: Date;
    @UpdateDateColumn()
    updateDate: Date;
    @VersionColumn()
    versionColumn: Date;

}