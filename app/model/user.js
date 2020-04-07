module.exports = (app) => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('user', {
    username: STRING(30),
    password: STRING(32),
    headImg:STRING(),
    sex:STRING()
  });

  return User;
};
