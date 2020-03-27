import { Entity, Column, ManyToOne } from "typeorm";
import BaseModel from '../../core/BaseModel'
import User from '../User';

// 文章
@Entity('article')
export default class Article extends BaseModel {

    @Column({ name: 'article_content' ,type:'text'})
    articleContent;//内容
    
    @Column({ name: 'article_title' })
    articleTitle: string;//标题

    @Column({ name: 'article_subtitle',default:''})
    articleSubtitle:string;//副标题

    @Column({ name: 'article_praise_count', default: 0 })
    articlePraiseCount: number;//点赞数

    @Column({ name: 'article_dislike_count', default: 0 })
    articledislikeCount: number;//踩数

    @Column({ name: 'article_page_view', default: 0 })
    articlePageView: number;//浏览量

    @Column({ name: 'article_comment_count', default: 0 })
    articleCommentCount: number;//评论数

    @ManyToOne(() => User, user => user.articles, { eager: true })
    user: User;
}