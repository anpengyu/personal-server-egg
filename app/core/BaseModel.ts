import { CreateDateColumn, UpdateDateColumn, VersionColumn,BaseEntity, PrimaryGeneratedColumn } from "typeorm";


export default class Card extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createDate: Date;
    @UpdateDateColumn()
    updateDate: Date;
    @VersionColumn()
    versionColumn: Date;
}