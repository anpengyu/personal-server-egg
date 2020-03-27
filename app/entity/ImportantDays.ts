import { Entity, Column } from "typeorm";
import BaseModel from '../core/BaseModel';
@Entity('important_days')
export default class ImportantDays extends BaseModel {

    @Column({unique:true})
    title: string;
    @Column({unique:true})
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


}