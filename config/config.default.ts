import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577775677616_1422';
  //关闭csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };
  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  const mysql = {
    client: {
        type: "mysql",
        host: "121.36.9.185",
        port: 10086,
        user: "root",
        username: "root",
        password: "anpengyu1",
        database: "tally",
      },
    app: true,
    agent: false,
  };
  const modelEntities = '/app/model/*.ts';

  return {
    mysql,
    modelEntities,
    ...config,
    ...bizConfig,
  };
};
