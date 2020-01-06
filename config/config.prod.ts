import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  const mysql = {
    // 单数据库信息配置
    client: {
      type: "mysql",
      host: "121.36.9.185",
      port: 10086,
      user: "root",
      username: "root",
      password: "anpengyu1",
      database: "tally",
    },
  };
  const modelEntities =  '/app/model/*.js';

  return {
    mysql,
    modelEntities,
    ...config,
  };
};
