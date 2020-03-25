import { CreateDateColumn, UpdateDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
// let moment =require( 'moment');

export default class BaseModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn({ comment: '创建时间'})
    createDate:string;
    @UpdateDateColumn()
    updateDate:string;
    @VersionColumn()
    versionColumn: number = 1;
}