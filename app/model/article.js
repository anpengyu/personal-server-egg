module.exports = (app) => {
  const { STRING ,TEXT,INTEGER} = app.Sequelize;
  const Article = app.model.define('article',{
    userId:STRING(),
    articleTitle:{type:STRING(),field:'article_title'},
    articleSubTitle:{type:STRING(),field:'article_subtitle'},
    articleContent:{type:TEXT,field:'article_content'},
    articlePraiseCount:{type:INTEGER,field:'article_praise_count'},
    articleDislikeCount:{type:INTEGER,field:'article_dislike_count'},
    articlePageView:{type:INTEGER,field:'article_page_view'},
    articleCommentCount:{type:INTEGER,field:'article_comment_count'},
  });
  return Article;
};
