import { Entity, Column, ManyToOne } from "typeorm";
import BaseModel from '../../core/BaseModel'
import User from '../User';

// 文章
@Entity('article')
export default class Article extends BaseModel {

    @Column({ name: 'article_content' })
    articleContent: string;//内容

    @Column({ name: 'article_title' })
    articleTitle: string;//标题

    @Column({ name: 'article_praise_count', default: 0 })
    articlePraiseCount: number;//点赞数

    @Column({ name: 'article_dislike_count', default: 0 })
    articledislikeCount: number;//踩数

    @Column({ name: 'article_page_view', default: 0 })
    articlePageView: number;//浏览量

    @Column({ name: 'article_comment_count', default: 0 })
    articleCommentCount: number;//评论数

    //发帖距现在多长时间
    times(date: Date): string {
        //获取js 时间戳
        var time = new Date().getTime();
        //去掉 js 时间戳后三位，与php 时间戳保持一致
        time = parseInt(String((time - date.getTime() * 1000) / 1000));

        //存储转换值 
        var s;
        if (time < 60 * 10) {//十分钟内
            return '刚刚';
        } else if ((time < 60 * 60) && (time >= 60 * 10)) {
            //超过十分钟少于1小时
            s = Math.floor(time / 60);
            return s + "分钟前";
        } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
            //超过1小时少于24小时
            s = Math.floor(time / 60 / 60);
            return s + "小时前";
        } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
            //超过1天少于3天内
            s = Math.floor(time / 60 / 60 / 24);
            return s + "天前";
        } else {
            //超过3天
            var moreDate = new Date(parseInt(moreDate) * 1000);
            return moreDate.getFullYear() + "/" + (moreDate.getMonth() + 1) + "/" + moreDate.getDate();
        }
    }

    @ManyToOne(() => User, user => user.articles, { eager: true })
    user: User;
}