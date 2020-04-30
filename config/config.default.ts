import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    // sequelize: {
    //   dialect: 'mysql',
    //   database: 'tally',
    //   host: '121.36.9.185',
    //   port: '10086',
    //   username: 'root',
    //   password: 'anpengyu1',
    //   logging: false
    // },
  } as PowerPartial<EggAppConfig>;
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '202003031516_900321';

  config.middleware = ['auth', 'graphql'];

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
  }

  config.jwt = {
    jwtSecret: 'shared-secret',
    jwtExpire: '14 days',
    // enable: true,
    // ignore: [ '/api/v1/test/', '/public/' ], // 哪些请求不需要认证
  }

  config.security = {
    csrf: {
      ignore: () => true
    }
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
  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb'
  }
  return {
    ...config,
    ...bizConfig,
  };
};
