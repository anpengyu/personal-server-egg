import { Application } from 'egg';
import authentication from '../middleware/authentication';

module.exports = (app: Application) => {
  const { controller, router } = app;
  const { blog } = controller;
  router.get('/blog/article/loadArticleDetail', blog.article.loadArticleDetail)//文章详情
  router.get('/blog/article/loadNewArticle', blog.article.loadNewArticle)//最新文章
  router.get('/blog/article/loadHotArticle', blog.article.loadHotArticle)//最热文章
  router.get('/blog/article/loadOwnArticle', authentication(app), blog.article.loadOwnArticle)//自己的文章
  router.post('/blog/article/addArticle', authentication(app), blog.article.addArticle)//添加文章
  router.post('/blog/article/deleteArticle', authentication(app), blog.article.deleteArticle)//删除
  // router.resources('deleteArticle', '/blog/article/deleteArticle', blog.article.deleteArticle);
  router.get('/blog/comment/loadComment', authentication(app), blog.comment.loadComment)//获取评论
  router.get('/blog/comment/deleteComment', authentication(app), blog.comment.deleteComment)//删除评论
  router.post('/blog/comment/addComment', authentication(app), blog.comment.addComment)//添加评论
  router.get('/blog/comment/praise', authentication(app), blog.comment.praise)//点赞、取消点赞

  router.get('/blog/collect/collectArticle', authentication(app), blog.collect.collectArticle)//收藏、取消收藏
  router.get('/blog/collect/collectList', authentication(app), blog.collect.collectList)//收藏列表
  router.get('/blog/collect/favorite', authentication(app), blog.collect.favorite)//收藏夹
};