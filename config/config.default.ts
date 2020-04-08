import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    sequelize: {
      dialect: 'mysql',
      database: 'tally',
      host: '121.36.9.185',
      port: '10086',
      username: 'root',
      password: 'anpengyu1',
      logging:false
    },
  } as PowerPartial<EggAppConfig>;
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '202003031516_900321';

  config.middleware = ['authentication','graphql'];

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // graphQL 路由前的拦截器
    onPreGraphQL: function* (ctx) {
      console.log('onPreGraphQL...', ctx)
    },
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    onPreGraphiQL: function* (ctx) { console.log('onPreGraphiQL...', ctx) },
  }
 
  config.jwt = {
    enable: true,
    // ignore: [ '/api/v1/test/', '/public/' ], // 哪些请求不需要认证
  }
  // add your egg config in here

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS,FETCH'
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  let errorCode = {
    1062: '唯一值重复'
  }
  config.onerror = {
    all(err, ctx) {
      ctx.status = 400;
      ctx.body = JSON.stringify({
        code: 400,
        data: null,
        message: errorCode[err.errno],
        success: false
      });
    }
  }

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '121.36.9.185',   // Redis host
      password: 'anpengyu',
      db: 0,
    },
  }
  return {
    ...config,
    ...bizConfig,
  };
};
