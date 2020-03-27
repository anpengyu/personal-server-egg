import "reflect-metadata";
import { createConnection } from "typeorm";
const path = require('path');

export default function (app) {

  app.beforeStart(async () => {
    await app.model.sync();
    // const mysql = {
    //   ...app.config.mysql.client,
    //   entities: [
    //     __dirname + app.config.modelEntities,
    //   ],
    //   synchronize: true,
    //   logging: false
    // };
    // createConnection(mysql).then(() => {//connection
    //   console.log('连接成功');
    //   // let savedPhotos = await connection.manager.find(WorkType);
    //   // console.log("All photos from the db: ", savedPhotos);
    // }).catch(error => console.log(error));
    await createConnection();
    // console.log('connection',connection)
    const directory = path.join(app.config.baseDir, 'app/validate');
    app.loader.loadToApp(directory, 'validate');
  })
  
}