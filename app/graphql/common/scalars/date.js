const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const moment = require('moment');

module.exports = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    console.log('value...',value)
    return new Date(value);
  },
  serialize(value) {
   const time = moment(new Date(value), 'YYYY-MM-DD HH:mm:ss').locale('zh-cn').fromNow();
    return time;
  },
  parseLiteral(ast) {
    console.log('ast...',ast)
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
});
