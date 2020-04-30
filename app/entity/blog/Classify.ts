import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import BaseModel from '../../core/BaseModel';
@Entity('classify')
export default class Classify extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: 'user_id' })
    userId: string;
    @Column({default:''})
    name: string;
    @Column({default:''})
    detail: string;
    @Column({ name: 'detail_count',default:'' })
    detailCount: string;

}