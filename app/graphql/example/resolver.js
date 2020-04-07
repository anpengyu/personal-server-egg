'use strict';
// 行为：负责资料的获取操作
module.exports = {
  Query: {
    hello:()=>'Hello graphql',
    example_user(root, params, ctx) {
      console.log('root.',root,params)
      return ctx.connector.example.loadMe(params.id);
    },
  },

  Example_User:{
    friends(root, params, ctx) {
      const { friendIds } = root;
      return ctx.connector.example.loadFriends(friendIds);
    },

    height(root,params,ctx){
      return ctx.connector.example.loadHeight(root,params);
    },
    weight(root,params,ctx){
      return ctx.connector.example.loadweight(root,params);
    }
  }
  
};
