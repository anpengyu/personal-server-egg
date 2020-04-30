import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import BaseModel from '../../core/BaseModel';
// import User from '../../entity/User'

// 文章
@Entity('articles')
export default class Article extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: 'article_content', type: 'text' })
    articleContent;//内容

    @Column({ name: 'user_id' })
    userId: string;//用户id

    @Column({ name: 'article_title' })
    articleTitle: string;//标题

    @Column({ name: 'article_subtitle', default: '' })
    articleSubTitle: string;//副标题

    @Column({ name: 'article_praise_count', default: 0 })
    articlePraiseCount: number;//点赞数

    @Column({ name: 'article_dislike_count', default: 0 })
    articleDisLikeCount: number;//踩数

    @Column({ name: 'article_page_view', default: 0 })
    articlePageView: number;//浏览量

    @Column({ name: 'article_comment_count', default: 0 })
    articleCommentCount: number;//评论数

    @Column({ name: 'course', default: 0 })
    course: string;//分类
    @Column({ name: 'label', default: 0 })
    label: string;//标签
    @Column({ name: 'original', default: 0 })
    original: boolean;//0:原创 1：非原创
    @Column({ name: 'original_url', default: 0 })
    originalUrl: string;//原创url
    @Column({ name: 'privacy', default: 0 })
    privacy: boolean;//0:公开 1:私密
    @Column({ name: 'audit', default: 0 })
    audit: number;//审核 0:未审核 1：已通过 2：未通过 3：草稿箱 4：删除 5：【0，1，2】
    @Column({ name: 'audit_cause',default:'' })
    auditCause: string;//拒绝理由

    // @ManyToOne(() => User, user => user.articles, { eager: true })
    // user: User;
}