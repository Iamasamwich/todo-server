import {Request} from 'express';

import addUserToDB from './functions/addUserToDB';
import checkIfUserInDB from './functions/checkIfUserInDB';
import validateNewUserReq from './functions/validateNewUserReq';
import logUserIn from './functions/logUserIn';
import Conn from './db';

const addUserModel = (req: Request) => {

  const conn = new Conn();

  return validateNewUserReq(req)
  .then(() => checkIfUserInDB(conn, req.body.email))
  .then((resp : Boolean) => {
    if (resp) {
      throw ({status: 409, message: 'user already exists'})
    };
    return;
  })
  .then(() => addUserToDB(conn, req)) 
  .then(userId => logUserIn(req, userId))
  .then(() => ({status: 201, message: 'user created'}))
  .finally(() => {
    conn.end();
  })
};

export default addUserModel;