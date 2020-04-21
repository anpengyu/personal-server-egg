module.exports = (app) => {
  const { STRING, TEXT, INTEGER, BOOLEAN } = app.Sequelize;
  const Classify = app.model.define('classify', {
    userId: STRING(),
    name: { type: STRING(), field: 'name' },
    detail: { type: STRING(), field: 'detail' },
    detailCount: { type: INTEGER, field: 'count' }
  });
  return Classify;
};
