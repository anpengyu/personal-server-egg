import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '202003031516_900321';

  config.jwt = {
    enable: true,
    // ignore: [ '/api/v1/test/', '/public/' ], // 哪些请求不需要认证
  }
  //关闭csrf
  // config.security = {
  //   csrf: {
  //     enable: false,
  //     ignoreJSON: true,
  //   },
  // };
  // add your egg config in here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
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
  // const mysql = {
  //   client: {
  //       type: "mysql",
  //       host: "121.36.9.185",
  //       port: 10086,
  //       user: "root",
  //       username: "root",
  //       password: "anpengyu1",
  //       database: "tally",
  //     },
  //   app: true,
  //   agent: false,
  // };
  // const modelEntities = '/app/model/*.ts';
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '121.36.9.185',   // Redis host
      password: 'anpengyu',
      db: 0,
    },
  }
  return {
    // mysql,
    // modelEntities,
    ...config,
    ...bizConfig,
  };
};
