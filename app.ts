import "reflect-metadata";
import {createConnection} from "typeorm";


export default function (app) {

  app.beforeStart(async () => {
    const mysql = {
      ...app.config.mysql.client,
      entities: [
        __dirname + app.config.modelEntities,
      ],
      synchronize: true,
      logging: false
    };
    createConnection(mysql).then(() => {//connection
      console.log('连接成功');
    // let savedPhotos = await connection.manager.find(WorkType);
    // console.log("All photos from the db: ", savedPhotos);
  }).catch(error => console.log(error));
  })
}