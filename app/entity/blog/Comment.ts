import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import BaseModel from '../../core/BaseModel';
@Entity('comments')
export default class Comment extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: 'user_id' })
    userId: string;
    @Column()
    content: string;
    @Column({ name: 'root_comment_id' })
    rootCommentId: string;
    @Column({ name: 'article_id' })
    articleId: string;

    @Column({ name: 'reply_toComment_id' })
    replyToCommentId: string;

    @Column({ name: 'liks',default:0 })
    liks: string;
}