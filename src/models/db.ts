import mysql from 'mysql';
import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
  host: string | undefined;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
  dateStrings: boolean;
};

class Conn {
  config: Config;
  conn: mysql.Connection;

  constructor() {
    this.config = {
      host: process.env.DBPATH as string,
      user: process.env.DBUSER as string,
      password: process.env.DBPASS as string,
      database: process.env.DBNAME as string,
      dateStrings: true
    };
    this.conn = mysql.createConnection(this.config);
  };

  send (message: string, payload: any) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.conn.query(message, payload, (err: any, res: any) => {
        if (err) {
          // console.log(err);
          // console.log('message: ', message);
          // console.log('payload: ', payload);
          reject({status: 500, message: 'server error'});
        } else {
          resolve(res);
        };
      });
    });
  };

  end () {
    this.conn.end();
  };
};

export default Conn;
