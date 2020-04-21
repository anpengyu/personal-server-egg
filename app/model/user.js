module.exports = (app) => {
  const { STRING ,TEXT,INTEGER} = app.Sequelize;

  const User = app.model.define('user', {
    username: STRING(30),
    password: STRING(32),
    headImg: STRING(),
    sex: STRING(),
    likes: TEXT,//点赞列表
    collects: TEXT,//收藏列表
    comments:TEXT,//评论列表
    historys:TEXT,//查看历史
    attention:TEXT,//关注的作者
    articles:TEXT,//发布的文章
  });

  return User;
};
